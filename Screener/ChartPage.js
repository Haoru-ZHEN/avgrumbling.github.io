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

const infoDiv = document.getElementById('infoDiv');
const wrapper = document.getElementById('wrapper'); /*
const wrapper2 = document.getElementById('wrapper2');
const yearInput = document.getElementById('yearInput');
const monthInput = document.getElementById('monthInput');
const dayInput = document.getElementById('dayInput');
const timestampLabel = document.getElementById('timestampLabel');
const theform = document.getElementById('theform');
const fromInput = document.getElementById('fromInput');
const toInput = document.getElementById('toInput');*/
//=A655/86400000 + DATE(1970,1,1) //60*24*60*1000
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

//var isShow = false;
//last close price of candle
var lastPrice = 0;
var isShow = false;
/*
function getCandleData() {
     var query_candledata =
          '/api/v3/klines?symbol=BTCUSDT&interval=1d&startTime=' +
          fromInput.value +
          '&endTime=' +
          toInput.value;

     //combination
     var url = burl + query_candledata;

     var ourRequest = new XMLHttpRequest();

     ourRequest.open('GET', url, true);
     ourRequest.onload = function () {
          var responseJSON = JSON.parse(ourRequest.responseText);
          console.log(ourRequest.responseText);
     };
     ourRequest.send();
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
     timestampLabel.textContent = 'Timestamp: ' + timestamp;
}*/
/*
theform.addEventListener('submit', function (event) {
     event.preventDefault();
});*/

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

     //console.log("Average:"+ave);
     ave = ave / df.length;
     //console.log("Average2:"+ave);

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

function getSNR(thefile, chart) {
     //var thefile = 'candle3.csv';
     //var thefile="https://static.anychart.com/git-storage/word-press/data/candlestick-chart-tutorial/EUR_USDHistoricalData2year.csv";
     let supportLevels = [];
     let resistanceLevels = [];
     let allLevels = [];
     const getfile = thefile.replace(/"/g, '');

     anychart.data.loadCsvFile(getfile, function (data) {
          const candles = Papa.parse(data, { header: true }).data;
          //console.log(candles);
          lastPrice = candles[candles.length - 2].Close;

          // loop through candles and identify potential support and resistance levels
          for (let i = 2; i < candles.length - 2; i += 1) {
               //const prevCandle = candles[i - 1];
               //const currCandle = candles[i];
               //const nextCandle = candles[i + 1];
               if (isSupport(candles, i)) {
                    if (is_far_from_level((i, candles[i].Low), allLevels, candles)) {
                         console.log('SUPPORT');
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
          console.log(supportLevels);
          console.log(resistanceLevels);
          //checkNearSNR(15000, allLevels);
          //checkDLtrend(15000, candles);
          drawLine(allLevels, chart);

          showInfoSNR(allLevels.sort((a, b) => a - b).reverse());

          return allLevels;
     });
}

function showInfoSNR(levels) {
     const ul_SNR = document.getElementById('ul_SNR');
     for (var i = 0; i < levels.length; i++) {
          var newLine = document.createElement('li');
          newLine.textContent = parseFloat(levels[i]).toFixed(2);
          ul_SNR.appendChild(newLine);
     }
}

anychart.onDocumentReady(function () {
     const pairName = localStorage.getItem('pairName');
     var pageTitle = pairName.replace(/"/g, '');
     document.title = pageTitle + ' - Rumbling';
     const chartURL = localStorage.getItem('chartURL');
     const getfile2 = chartURL.replace(/"/g, '');

     // load data
     var getfile =
          'https://firebasestorage.googleapis.com/v0/b/welogin-ef928.appspot.com/o/csv%2F1680699753116-candle3.csv?alt=media&token=68b8df04-037e-4517-8ab3-acd6fa7a6697';

     anychart.data.loadCsvFile(getfile2, function (data) {
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
          series.name(pageTitle + ' Trade Data');

          // set the chart title
          chart.title(pageTitle + ' Trade Data');

          // set the container id
          chart.container('wrapper');

          //set color
          // set the rising fill color to green
          //chart.risingFill("#00FF00");

          // set the falling fill color to red
          //chart.fallingFill("#FF0000");

          // draw the chart
          /*
               var level = new Array("19252.81", "19328.75", "21254.67", "20834.39",
               "18790.61", "19056.8", "19060", "19069.39", "19041.92", "20151.84",
               "16329.85", "15781.29", "16212.91", "17085.05", "16542.4", "20677.47", "21773.97", "20150.69");*/
          //var level = new Array(18626, 20706.5, 15588, 16871.85, 22722, 19549.09, 21888, 24668, 20576.25, 22799, 18387.95, 16972.83, 26386.87);
          //var level = new Array('28805', '32699', '37332.7', '43927.7', '46250', '39600', '57820', '55600', '41725.95', '20111.62', '15588', '22722','36600', '34678.43', '42599', '49632.27', '44350', '62933', '67000', '69000', '60029.76', '51936.33', '39265.2', '32399', '21888', '24668', '20180', '18387.95', '26386.87');

          //get SNR
          getSNR(getfile2, chart);
          //console.log(level);
          /*
          
          var level = new Array(
               '28805',
               '36600',
               '32699',
               '34678.43',
               '42599',
               '46250',
               '49632.27',
               '39600',
               '44350',
               '62933',
               '67000',
               '57820',
               '69000',
               '55600',
               '60029.76',
               '51936.33',
               '20111.62',
               '21888',
               '24668',
               '15588',
               '18387.95',
               '26386.87'
          );*/

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
     console.log(levels);

     // create a Horizontal Line annotation
     for (let i = 0; i < levels.length; i++) {
          if (
               (parseFloat(levels[i]) < lastPrice * 1.3) &
               (parseFloat(levels[i]) > lastPrice * 0.7)
          ) {
               var theline = controller.horizontalLine({
                    valueAnchor: parseFloat(levels[i]),
                    hovered: { stroke: '2 #8B5CF6' },
               });
          }

          //theline.hovered().label("dwd");
          //chart.line().value(parseFloat(levels[i])).stroke('#FF0000');
     }
}

function showInfo(levels) {
     if (isShow) {
          isShow = false;
          infoDiv.classList.remove('infoShow');
          wrapper.style.left = '22%';
     } else {
          isShow = true;
          infoDiv.classList.add('infoShow');
          wrapper.style.left = '13%';
     }
}
