const priceText = document.getElementById('price');
const wrapper = document.getElementById('wrapper');
const wrapper2 = document.getElementById('wrapper2');
const yearInput = document.getElementById('yearInput');
const monthInput = document.getElementById('monthInput');
const dayInput = document.getElementById('dayInput');
const timestampLabel = document.getElementById('timestampLabel');
//const theform = document.getElementById('theform');
const fromInput = document.getElementById('fromInput');
const toInput = document.getElementById('toInput');
const intervalInput = document.getElementById('intervalBox');
const urlInput = document.getElementById('urlInput');
const symbolInput = document.getElementById('symbolInput');
const exportBut = document.getElementById('exportBut');
const responseTextarea = document.getElementById('responseTextarea');
const fileNameInput = document.getElementById('fileNameInput');
const switchLabel = document.getElementById('switchLabel');
//const switchBox = document.getElementById('switchBox');
const urlInputLabel = document.getElementById('urlInputLabel');
const symbolInputLabel = document.getElementById('symbolInputLabel');
const switchBox = document.getElementById('checkbox');
const toggle = document.querySelector('.toggle');

//edit date in CSV
//=A655/86400000 + DATE(1970,1,1)
//=TEXT(N2,"MMM d yyyy")
//paste value

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
var isShow = false;
var switchMode = 'crypto';
var stockResponse = null;

function getCryptoData() {
     /*
     var query_candledata =
          '/api/v3/klines?' +
          urlInput.value +
          'symbol=' +
          symbolInput.value +
          '&interval=' +
          intervalInput.value +
          '&startTime=' +
          fromInput.value +
          '&endTime=' +
          toInput.value;

     //combination
     var url = burl + query_candledata;*/

     var url2 =
          urlInput.value +
          'symbol=' +
          symbolInput.value.toUpperCase() +
          '&interval=' +
          intervalInput.value +
          '&startTime=' +
          convertDatePicker(fromInput.value) +
          '&endTime=' +
          convertDatePicker(toInput.value);

     var ourRequest = new XMLHttpRequest();

     ourRequest.open('GET', url2, true);
     ourRequest.onload = function () {
          var responseJSON = JSON.parse(ourRequest.responseText);
          //console.log(ourRequest.responseText);
          responseTextarea.value = ourRequest.responseText;
     };
     ourRequest.send();
}

function getCandleData() {
     if (!validateInput()) {
          alert('Empty value');
          return;
     }

     if (switchMode === 'crypto') {
          getCryptoData();
     } else {
          getStockData();
     }
}

function countWeekdays(startDate) {
     const today = new Date();
     const todayTime = today.getTime();

     const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
     let count = 0;
     let current = new Date(startDate);
     const end = new Date(todayTime);

     while (current <= end) {
          const dayOfWeek = current.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
               count++;
          }
          current = new Date(current.getTime() + oneDay);
     }

     return count;
}

function getStockData() {
     const data = null;

     const xhr = new XMLHttpRequest();

     xhr.addEventListener('readystatechange', function () {
          if (this.readyState === this.DONE) {
               console.log(this.responseText);
               var responseJSON = JSON.parse(this.responseText);
               var reversedResponse = responseJSON.values.reverse();
               //console.log(responseJSON.values);
               //stockResponse = responseJSON.values;

               responseTextarea.value = JSON.stringify(reversedResponse);
               stockResponse = reversedResponse;
               //const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

               //console.log(reversedResponse);
               stockResponse = reversedResponse;
          }
     });

     //days between from and to (timestamp)

     //var x = parseInt(todayTime) - parseInt(convertDatePicker(fromInput.value));
     var outputDay = countWeekdays(parseInt(convertDatePicker(fromInput.value)));

     //console.log(parseInt(convertDatePicker(fromInput.value)));
     //convert the timestamp to days
     //var outputDay = x / 60 / 24 / 60 / 1000 + 1;

     //output size +1
     console.log(outputDay);

     //var stockurl ='https://twelve-data1.p.rapidapi.com/time_series?'+urlInput.value+'symbol=AMZN&interval=1day&outputsize=360&format=json';

     var stockURL2 =
          urlInput.value +
          'symbol=' +
          symbolInput.value.toUpperCase() +
          '&interval=' +
          intervalInput.value +
          '&outputsize=' +
          Math.round(outputDay) +
          '&format=json';
     xhr.open('GET', stockURL2);
     xhr.setRequestHeader('X-RapidAPI-Key', 'b700c0ed85mshcba7325dba0217bp1fe50ejsn769d68549977');
     xhr.setRequestHeader('X-RapidAPI-Host', 'twelve-data1.p.rapidapi.com');

     xhr.send(data);
}

function showWrapper() {
     if (!isShow) {
          wrapper.classList.add('active-popup');
          wrapper2.style.top = '700px';
          isShow = true;
     } else {
          wrapper.classList.remove('active-popup');
          wrapper2.style.top = '100px';
          isShow = false;
     }
}

function convertTimestamp() {
     const str = yearInput.value + '-' + monthInput.value + '-' + dayInput.value;

     const date = new Date(str);

     const timestamp = date.getTime();
     timestampLabel.value = timestamp;
}

function convertDate() {
     var timestamp = timestampLabel.value; // Unix timestamp in seconds
     const date = new Date(parseInt(timestamp));
     console.log(date);

     yearInput.value = date.getFullYear();
     monthInput.value = date.getMonth() + 1;
     dayInput.value = date.getDate();
}

function exportToCsv() {
     if (validationExport()) {
          if (switchMode === 'crypto') {
               var csvData = jsonToCsv(responseTextarea.value);
          } else {
               var csvData = jsonToCsv_stock(stockResponse);
          }

          const blob = new Blob([csvData], { type: 'text/csv' });
          const urlObject = URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.setAttribute('href', urlObject);
          link.setAttribute('download', fileNameInput.value);

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
     }
}

function jsonToCsv(jsonText) {
     //https://twelve-data1.p.rapidapi.com/time_series?
     const data = JSON.parse(jsonText);
     //const header = Object.keys(data[0]).join(',');
     //console.log(header);
     var header2 = 'Date,Open,High,Low,Close,Volume,Closetime,7,8,9,10,11';
     const rows = data.map((obj) => {
          return Object.values(obj)
               .map((value) => {
                    if (typeof value === 'string') {
                         return `"${value.replace(/"/g, '""')}"`;
                    } else {
                         return value;
                    }
               })
               .join(',');
     });
     console.log(rows);
     return `${header2}\n${rows.join('\n')}`;
}

function jsonToCsv_stock(jsonText) {
     const data = JSON.stringify(jsonText);
     var data2 = JSON.parse(data);
     var header2 = 'Date,Open,High,Low,Close,Volume';
     /*
     const doubleArr = data2.map((obj) => {
          return [obj.datetime, obj.open, obj.high, obj.low, obj.close, obj.volume];
     });*/

     const rows = data2.map((obj) => {
          return Object.values(obj)
               .map((value) => {
                    if (typeof value === 'string') {
                         return `"${value.replace(/"/g, '""')}"`;
                    } else {
                         return value;
                    }
               })
               .join(',');
     });
     return `${header2}\n${rows.join('\n')}`;
}
/*
function csvToDate(timestamp_GET) {
     const date = new Date(parseInt(timestamp_GET));
     console.log(date);

     var month = date.toLocaleString('en-us', { month: 'short' });

     return month + ' ' + date.getDate() + ' ' + date.getFullYear();
}*/

function getLatest() {
     const today = new Date();
     const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000 * 2);

     // Get the timestamp of yesterday
     const yesterdayTimestamp = yesterday.getTime();
     timestampLabel.value = yesterdayTimestamp;
}

function validationExport() {
     if (fileNameInput.value.trim() == '' || responseTextarea.value.trim() == '') {
          alert('Empty value');
          return false;
     } else {
          return true;
     }
}

function validateInput() {
     if (
          urlInput.value.trim() == '' ||
          symbolInput.value.trim() == '' ||
          toInput.value === '' ||
          toInput.value === 'yyyy-mm-dd' ||
          fromInput.value === '' ||
          fromInput.value === 'yyyy-mm-dd'
     ) {
          return false;
     } else {
          return true;
     }
}

function changeStock() {
     intervalInput.innerHTML = '';

     if (switchBox.checked) {
          const min = 0;
          const max = 1;
          const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

          if (randomNumber == 0) {
               toggle.style.backgroundImage = 'url("tsla.jpg")';
          } else {
               toggle.style.backgroundImage = 'url("aapl.jpg")';
          }

          urlInput.setAttribute('list', 'urlOptions_stock');

          //change mode
          switchMode = 'stock';

          //change switch label
          switchLabel.textContent = 'Stock';
          var intervalOptions = ['1h', '2h', '4h', '1day', '1week'];

          //change interval options
          for (var i = 0; i < intervalOptions.length; i++) {
               var option1 = document.createElement('option');
               option1.value = intervalOptions[i];
               option1.text = intervalOptions[i];
               intervalInput.add(option1);
          }

          //change url placeholder
          urlInputLabel.textContent = 'URL (https://twelve-data1.p.rapidapi.com/time_series?)';
          symbolInputLabel.textContent = 'Symbol (TSLA)';

          //change toinput to today date
          const today = new Date();
          const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

          const year = yesterday.getFullYear();
          const month = ('0' + (yesterday.getMonth() + 1)).slice(-2);
          const day = ('0' + yesterday.getDate()).slice(-2);
          const formattedDate = `${year}-${month}-${day}`;

          toInput.value = formattedDate;
          toInput.readOnly = true;
     } else {
          //change image
          toggle.style.backgroundImage = 'url("bit2.jpg")';
          urlInput.setAttribute('list', 'urlOptions_crypto');

          //change mode
          switchMode = 'crypto';
          //change switch label
          switchLabel.textContent = 'Cryptocurrency';
          var intervalOptions = ['1h', '4h', '8h', '12h', '1d', '3d', '1w'];

          //change interval options
          for (var i = 0; i < intervalOptions.length; i++) {
               var option1 = document.createElement('option');
               option1.value = intervalOptions[i];
               option1.text = intervalOptions[i];
               intervalInput.add(option1);
          }

          //change url placeholder
          urlInputLabel.textContent = 'URL (https://api.binance.com/api/v3/klines?)';
          symbolInputLabel.textContent = 'Symbol (BTCUSDT)';

          toInput.readOnly = false;
     }
}

function convertDatePicker(theValue) {
     var timestamp = Math.floor(Date.parse(theValue));
     console.log(timestamp);
     return timestamp.toString();
}

/*
theform.addEventListener('submit', function (event) {
     event.preventDefault();
});*/
/*
anychart.onDocumentReady(function () {
     // load data
     anychart.data.loadCsvFile('candle3.csv', function (data) {
          // create a data table
          var dataTable = anychart.data.table(0, 'MMM d yyyy');
          dataTable.addData(data);

          // map data
          var mapping = dataTable.mapAs({ open: 1, high: 2, low: 3, close: 4 });
          //var mapping = dataTable.mapAs({ 'open': 2, 'high': 3, 'low': 4, 'close': 1 });

          // set the chart type
          var chart = anychart.stock();

          // set the series
          var series = chart.plot(0).candlestick(mapping);
          series.name('BTCUSDT Spot Trade Data');

          // set the chart title
          chart.title('BTCUSDT Spot Trade Data');

          // set the container id
          chart.container('wrapper');

          //set color
          // set the rising fill color to green
          //chart.risingFill("#00FF00");

          // set the falling fill color to red
          //chart.fallingFill("#FF0000");

          // draw the chart
          
         
          drawLine(level, chart);

          var plot = chart.plot(0);
          var ema10 = plot.ema(mapping, 10).series();
          //ema10.stroke('#bf360c');
          var ema20 = plot.sma(mapping, 20).series();
          //ema20.stroke('#ff6d00');
          chart.draw();
     });
});

function drawLine(levels, chart) {
     // create a plot on the chart
     var plot = chart.plot(0);

     // access the annotations() object of the plot to work with annotations
     var controller = plot.annotations();

     // create a Horizontal Line annotation
     for (let i = 0; i < levels.length; i++) {
          var theline = controller.horizontalLine({
               valueAnchor: parseFloat(levels[i]),
               hovered: { stroke: '2 #8B5CF6' },
          });

          //theline.hovered().label("dwd");
          //chart.line().value(parseFloat(levels[i])).stroke('#FF0000');
     }
}*/
