const firebaseConfig = {
     apiKey: 'AIzaSyCvKsl6dpisURv3Yu7OMV37YyqBd2SWRok',
     authDomain: 'welogin-ef928.firebaseapp.com',
     databaseURL: 'https://welogin-ef928-default-rtdb.firebaseio.com',
     projectId: 'welogin-ef928',
     storageBucket: 'welogin-ef928.appspot.com',
     messagingSenderId: '882804397149',
     appId: '1:882804397149:web:6561bcc09af5130ae429b4',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const table = document.getElementById('thetable');
const nameInput = document.getElementById('nameInput');
const fileInput = document.getElementById('fileInput');
const priceText = document.getElementById('price');
const theform = document.getElementById('newEntry-form');
var loadingBar = document.getElementById('loader');

//base point url
var burl = 'https://api.binance.com';
var future_burl = 'https://fapi.binance.com';

//query with parameters
var query = '/api/v3/ping';
var query_future = '/fapi/v1/ticker/price?symbol=BTCUSDT';
var query_future2 = '/fapi/v1/fundingRate?symbol=BTCUSDT';
var query_candledata =
     '/api/v3/klines?symbol=BTCUSDT&interval=1d&startTime=1655222400000&endTime=1679760000000';

//combination
var url = burl + query_candledata;
var url_future = future_burl + query_future;

//send request
var prevData = 0;
var numRow = 1;
var selectRow = null;
var isShow = false;

function getData() {
     var ourRequest = new XMLHttpRequest();

     ourRequest.open('GET', url_future, true);
     ourRequest.onload = function () {
          console.log('dwd');
          console.log(ourRequest.responseText);

          var responseJSON = JSON.parse(ourRequest.responseText);

          if (parseFloat(responseJSON.price) >= prevData) {
               priceText.style.color = 'green';
               priceText.textContent = '$' + responseJSON.price;
          } else {
               priceText.style.color = 'red';
               priceText.textContent = '$' + responseJSON.price;
          }
          prevData = parseFloat(responseJSON.price);
     };
     ourRequest.send();
}

function getCandleData() {
     var ourRequest = new XMLHttpRequest();

     ourRequest.open('GET', url, true);
     ourRequest.onload = function () {
          var responseJSON = JSON.parse(ourRequest.responseText);
          //prevData = parseFloat(responseJSON.price)
          console.log(ourRequest.responseText);
     };
     ourRequest.send();
}
/*
function snr() {
     var thefile = 'candle2.csv'; //https://static.anychart.com/git-storage/word-press/data/candlestick-chart-tutorial/EUR_USDHistoricalData2year.csv
     let supportLevels = [];
     let resistanceLevels = [];
     anychart.data.loadCsvFile('candle2.csv', function (data) {
          //var csvData = "candle.csv";
          const candles = Papa.parse(data, { header: true }).data;

          // loop through candles and identify potential support and resistance levels
          for (let i = 1; i < candles.length - 1; i++) {
               const prevCandle = candles[i - 1];
               const currCandle = candles[i];
               const nextCandle = candles[i + 1];

               // check for potential support level
               if (prevCandle.Low > currCandle.Low && currCandle.Low < nextCandle.Low) {
                    supportLevels.push(currCandle.Low);
               }

               // check for potential resistance level
               if (prevCandle.High < currCandle.High && currCandle.High > nextCandle.High) {
                    resistanceLevels.push(currCandle.High);
               }
          }
          //console.log(supportLevels);
          return { support: supportLevels, resistance: resistanceLevels };
     });
     return { support: supportLevels, resistance: resistanceLevels };
}*/

function isSupport(df, i) {
     //var support =(df[i].Low < df[i-1].Low) && (df[i].Low < df[i+1].Low) && (df[i+1].Low < df[i+2].Low) && (df[i-1].Low < df[i-2].Low);

     if (
          df[i].Low < df[i - 1].Low &&
          df[i].Low < df[i + 1].Low &&
          df[i + 1].Low < df[i + 2].Low &&
          df[i - 1].Low < df[i - 2].Low
     ) {
          return true;
     } else {
          return false;
     }
     return support;
}

function isResistance(df, i) {
     var resistance =
          df[i].High > df[i - 1].High &&
          df[i].High > df[i + 1].High &&
          df[i + 1].High > df[i + 2].High &&
          df[i - 1].High > df[i - 2].High;

     return resistance;
}

function getSNR(thefile, index) {
     //var thefile = 'candle3.csv';
     //var thefile="https://static.anychart.com/git-storage/word-press/data/candlestick-chart-tutorial/EUR_USDHistoricalData2year.csv";
     let supportLevels = [];
     let resistanceLevels = [];
     let allLevels = [];
     const getfile = thefile.replace(/"/g, '');
     anychart.data.loadCsvFile(getfile, function (data) {
          const candles = Papa.parse(data, { header: true }).data;
          //console.log(candles);
          var lastClosePrice = candles[candles.length - 2].Close;
          var lastLowPrice = candles[candles.length - 2].Low;
          var lastHighPrice = candles[candles.length - 2].High;

          // loop through candles and identify potential support and resistance levels
          for (let i = 2; i < candles.length - 2; i += 1) {
               //const prevCandle = candles[i - 1];
               //const currCandle = candles[i];
               //const nextCandle = candles[i + 1];
               if (isSupport(candles, i)) {
                    if (is_far_from_level((i, candles[i].Low), allLevels, candles)) {
                         allLevels.push((i, candles[i].Low));
                         supportLevels.push((i, candles[i].Low));
                    }
               } else if (isResistance(candles, i)) {
                    if (is_far_from_level((i, candles[i].High), allLevels, candles)) {
                         allLevels.push((i, candles[i].High));
                         resistanceLevels.push((i, candles[i].High));
                    }
               }
          }
          console.log(allLevels);
          //console.log(supportLevels);
          //console.log(resistanceLevels);
          var CHECKSNR = checkNearSNR(
               parseFloat(lastLowPrice),
               parseFloat(lastHighPrice),
               allLevels
          );
          var CHECKDL = checkDLtrend(parseFloat(lastClosePrice), candles);

          var tablee = document.getElementById('thetable');
          tablee.rows[index].cells[3].textContent = lastClosePrice;
          tablee.rows[index].cells[4].textContent = CHECKSNR;
          tablee.rows[index].cells[5].textContent = CHECKSNR;
          tablee.rows[index].cells[6].textContent = CHECKDL;

          //addnewRow(numRow, PAIRNAME, URL, CHECKSNR, CHECKDL, lastClosePrice);
          return allLevels;
     });
}

function is_far_from_level(value, levels, df) {
     /*   
     ave =  np.mean(df['High'] - df['Low'])    
     return np.sum([abs(value-level)<ave for _,level in levels])==0;*/
     var ave = 0;
     for (let i = 0; i < df.length - 1; i++) {
          ave = ave + (parseFloat(df[i].High) - parseFloat(df[i].Low));
          //console.log("HIGH:"+parseFloat(df[i].High));
          //console.log("HEHE"+(parseFloat(df[i].High) - parseFloat(df[i].Low)));
     }

     ave = ave / df.length;

     let count = 0;
     for (let i = 0; i < levels.length; i++) {
          //console.log("Abs:"+(Math.abs(value - levels[i])));
          if (Math.abs(value - levels[i]) < ave) {
               count += 1;
          }
     }

     if (count == 0) {
          return true;
     } else {
          return false;
     }
     //return count == 0;
}

function getCurrentPrice() {
     var ourRequest = new XMLHttpRequest();

     ourRequest.open('GET', url_future, true);
     ourRequest.onload = function () {
          console.log('dwd');
          console.log(ourRequest.responseText);

          var responseJSON = JSON.parse(ourRequest.responseText);

          if (parseFloat(responseJSON.price) >= prevData) {
               priceText.style.color = 'green';
               priceText.textContent = '$' + responseJSON.price;
          } else {
               priceText.style.color = 'red';
               priceText.textContent = '$' + responseJSON.price;
          }
          prevData = parseFloat(responseJSON.price);
     };
     ourRequest.send();
}

function checkNearSNR(LowPrice, HighPrice, levels) {
     var nearlist = [];

     for (var i = 0; i < levels.length; i++) {
          if (
               (parseFloat(levels[i]) < LowPrice * 1.02) &
                    (parseFloat(levels[i]) > LowPrice * 0.98) ||
               (parseFloat(levels[i]) < HighPrice * 1.02) &
                    (parseFloat(levels[i]) > HighPrice * 0.98)
          ) {
               console.log('NEAR');
               var percentLow = Math.abs((LowPrice - parseFloat(levels[i])) / 100);
               var percentHigh = Math.abs((HighPrice - parseFloat(levels[i])) / 100);

               if (percentLow <= percentHigh) {
                    nearlist.push({
                         price: parseFloat(levels[i]),
                         percent: percentLow,
                         which: 'Low',
                    });
               } else {
                    nearlist.push({
                         price: parseFloat(levels[i]),
                         percent: percentHigh,
                         which: 'High',
                    });
               }
          } /*else if (
               
          ) {
               console.log('NEAR');
               var percent = Math.abs((HighPrice - parseFloat(levels[i])) / 100);
               nearlist.push({ price: parseFloat(levels[i]), percent: percent, which: 'High' });
          }*/ else {
               console.log('NOPE');
          }
     }
     console.log('NEARLIST');

     if (nearlist.length == 0) {
          return 'False';
     }

     for (var i = 0; i < nearlist.length; i++) {
          var closest = nearlist[0].percent;
          var closestPrice = nearlist[0].price;
          var closestIndex = 0;
          if (nearlist[closestIndex].percent <= nearlist[i].percent) {
               //closest = closest;
               //closestPrice = closestPrice;
               closestIndex = closestIndex;
          } else {
               //closest = nearlist[i].percent;
               //closestPrice = nearlist[i].price;
               closestIndex = i;
          }
     }
     //return 'Near - ' + levels[i];
     return 'Near - ' + nearlist[closestIndex].which + ' - ' + nearlist[closestIndex].price;
}

function calEMA(candles, n) {
     let closingPrices = [];

     for (let i = 2; i < n + 2; i++) {
          closingPrices.push(parseFloat(candles[candles.length - i].Close));
     }
     console.log(closingPrices);

     // Calculate the simple moving average (SMA
     let sma = 0;
     for (let i = 0; i < n; i++) {
          sma += closingPrices[i];
     }
     sma /= n;

     // Calculate the weighting multiplier
     const multiplier = 2 / (n + 1);

     // Calculate the EMA for each subsequent period
     let ema = sma;
     for (let i = n; i < closingPrices.length; i++) {
          console.log(closingPrices[i]);
          ema = (closingPrices[i] - ema) * multiplier + ema;
     }
     console.log('EMA' + ema);
     return ema;
}

function checkDLtrend(price, candles) {
     var ema10 = calEMA(candles, 10);
     var ema20 = calEMA(candles, 20);

     if (price > ema10 && price > ema20) {
          return 'Up Trend';
          //alert('uptrend');
     } else {
          return 'Down Trend';
          //alert('downtrend');
     }
}

function addnewRow(ROW, PAIRNAME, URL) {
     var newRow = document.createElement('tr');
     var newCell1 = document.createElement('th');
     newCell1.textContent = ROW;
     newCell1.classList.add('firstData');

     var newCell2 = document.createElement('th');
     newCell2.textContent = PAIRNAME;
     newCell2.classList.add('item');

     var newCell2_5 = document.createElement('th');
     newCell2_5.textContent = URL;
     newCell2_5.classList.add('urlData');

     var newCell3 = document.createElement('th');
     newCell3.textContent = '-';
     newCell3.classList.add('item');

     var newCell4 = document.createElement('th');
     newCell4.textContent = '-';
     newCell4.classList.add('item');

     var newCell5 = document.createElement('th');
     newCell5.textContent = '-';
     newCell5.classList.add('item');

     var newCell6 = document.createElement('th');
     newCell6.textContent = '-';
     newCell6.classList.add('item');

     var newCell7 = document.createElement('th');
     var icon = document.createElement('i');
     icon.setAttribute('class', 'fa-solid fa-trash');
     icon.setAttribute('id', 'trashIcon');
     newCell7.classList.add('item');
     newCell7.classList.add('iconTable');
     newCell7.appendChild(icon);

     var newCell8 = document.createElement('th');
     var icon2 = document.createElement('i');
     icon2.setAttribute('class', 'fa-solid fa-square-poll-vertical');
     icon2.setAttribute('id', 'chartIcon');
     newCell8.classList.add('item');
     newCell8.classList.add('iconTable');
     newCell8.appendChild(icon2);

     newRow.appendChild(newCell1);
     newRow.appendChild(newCell2);
     newRow.appendChild(newCell2_5);
     newRow.appendChild(newCell3);
     newRow.appendChild(newCell4);
     newRow.appendChild(newCell5);
     newRow.appendChild(newCell6);
     newRow.appendChild(newCell7);
     newRow.appendChild(newCell8);

     table.appendChild(newRow);
     numRow++;
}

function giveFunction() {
     //add function to the trash icon cell for every row
     var index,
          tablee = document.getElementById('thetable');

     for (var i = 1; i < tablee.rows.length; i++) {
          tablee.rows[i].cells[7].onclick = function () {
               var c = confirm('Delete this row?');

               if (c === true) {
                    loadingBar.style.display = 'inline';
                    index = this.parentElement.rowIndex;
                    console.log('delete index' + index);
                    var thispair = tablee.rows[index].cells[1].textContent;

                    //tablee.deleteRow(index);
                    while (table.rows.length > 1) {
                         table.deleteRow(table.rows.length - 1);
                    }
                    numRow = table.rows.length;
                    deleteFirebase(thispair);
               }
          };
     }

     //add function to the chart icon cell for every row
     for (var i = 1; i < tablee.rows.length; i++) {
          tablee.rows[i].cells[8].onclick = function () {
               index = this.parentElement.rowIndex;
               //console.log('open chart:' + tablee.rows[index].cells[1].textContent);
               localStorage.setItem(
                    'chartURL',
                    JSON.stringify(tablee.rows[index].cells[2].textContent)
               );
               localStorage.setItem(
                    'pairName',
                    JSON.stringify(tablee.rows[index].cells[1].textContent)
               );
               selectRow = tablee.rows[index].cells[2].textContent;

               window.open('ChartPage.html');
          };
          getSNR(tablee.rows[i].cells[2].textContent, i);
     }
}

function deleteFirebase(PAIRNAME_GET) {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('ScreenerList');

     thelist.once('value', function (snapshot) {
          //snapshot contain many bundles
          snapshot.forEach(function (data) {
               //data is the bundle
               thedata = data.val(); //thedata is the data of the bundle
               var id = data.key; //key is thee key of bundle
               var PAIRNAME = thedata['PAIRNAME']; //retrieve using parameter
               var URL = thedata['URL'];

               if (PAIRNAME_GET == PAIRNAME) {
                    var nodeRef = thelist.child(id);

                    // Call the remove() method on the reference to delete the node
                    nodeRef
                         .remove()
                         .then(() => {
                              console.log('Node deleted successfully.');
                              retrievedData();
                         })
                         .catch((error) => {
                              console.error('Error deleting node:', error);
                         });
               }
          });
     });
}

function insertData(PAIRNAME_GET, URL_GET) {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('ScreenerList');

     thelist.push({
          PAIRNAME: PAIRNAME_GET,
          URL: URL_GET,
     });

     alert('Upload successfully');
}

function addPair() {
     if (!fileValidation() || !pairValidation()) {
          alert('Empty value');
     } else {
          uploadFile();
     }
}

function retrievedData() {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('ScreenerList');

     thelist.once('value', function (snapshot) {
          //snapshot contain many bundles
          snapshot.forEach(function (data) {
               //data is the bundle
               thedata = data.val(); //thedata is the data of the bundle
               var id = data.key; //key is thee key of bundle
               var PAIRNAME = thedata['PAIRNAME']; //retrieve using parameter
               var URL = thedata['URL'];
               //console.log('PAIRNAME: ' + PAIRNAME + ' __URL: ' + URL);
               //getSNR(URL, PAIRNAME, URL);
               addnewRow(numRow, PAIRNAME, URL);
          });
          giveFunction();
          loadingBar.style.display = 'none';
          //loadingBar.classList.add('fade-out');
     });
}

function uploadFile() {
     var storage = firebase.storage();

     var file = fileInput.files[0];
     var timestamp = Date.now();

     // Create a storage reference
     var storageRef = storage.ref('csv/' + timestamp + '-' + file.name);

     // Upload the file
     var uploadTask = storageRef.put(file);

     // Monitor upload progress
     var snapie = null;
     uploadTask.on(
          'state_changed',
          function (snapshot) {
               // Get the progress percentage
               var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               //console.log(snapshot.ref.getDownloadURL());
               // Update the progress bar
               console.log('Upload is ' + progress + '% done');
               snapie = snapshot.ref.getDownloadURL();
          },
          function (error) {
               // Handle upload error
               console.error(error);
          },
          function () {
               // Handle successful upload

               console.log('File uploaded successfully');
               snapie.then(function (url) {
                    //console.log(url);
                    addnewRow(numRow, nameInput.value, url);
                    giveFunction();
                    insertData(nameInput.value, url);
               });
          }
     );
}

function fileValidation() {
     if (fileInput.files.length > 0) {
          return true;
     } else {
          return false;
     }
}

function pairValidation() {
     if (nameInput.value == '') {
          return false;
     } else {
          return true;
     }
}

function goTodaytrade() {
     window.open('../TodayTrade/TodayTrade.html');
}
/*
function getStockData() {
     const data = null;

     const xhr = new XMLHttpRequest();
     //xhr.withCredentials = true;

     xhr.addEventListener('readystatechange', function () {
          if (this.readyState === this.DONE) {
               console.log(this.responseText);
          }
     });

     var stockurl =
          'https://twelve-data1.p.rapidapi.com/time_series?symbol=AMZN&interval=1day&outputsize=360&format=json';
     xhr.open('GET', stockurl);
     xhr.setRequestHeader('X-RapidAPI-Key', 'b700c0ed85mshcba7325dba0217bp1fe50ejsn769d68549977');
     xhr.setRequestHeader('X-RapidAPI-Host', 'twelve-data1.p.rapidapi.com');

     xhr.send(data);
}*/

theform.addEventListener('submit', function (event) {
     event.preventDefault();
});

retrievedData();
