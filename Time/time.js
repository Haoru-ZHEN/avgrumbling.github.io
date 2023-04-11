const priceText = document.getElementById('price');
const wrapper = document.getElementById('wrapper');

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
/*
function getCandleData() {
     var ourRequest = new XMLHttpRequest();

     ourRequest.open('GET', url, true);
     ourRequest.onload = function () {
          var responseJSON = JSON.parse(ourRequest.responseText);
          //prevData = parseFloat(responseJSON.price)
          console.log(ourRequest.responseText);
     };
     ourRequest.send();
}*/

function showWrapper() {
     if (!isShow) {
          wrapper.classList.add('active-popup');
          isShow = true;
     } else {
          wrapper.classList.remove('active-popup');
          isShow = false;
     }
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
}

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

function getsnr() {
     //var thesnr = snr();
     //console.log(thesnr.support);
     snr2();
}

function snr2() {
     var thefile = 'candle3.csv';
     //var thefile="https://static.anychart.com/git-storage/word-press/data/candlestick-chart-tutorial/EUR_USDHistoricalData2year.csv";
     let supportLevels = [];
     let resistanceLevels = [];
     let allLevels = [];
     anychart.data.loadCsvFile(thefile, function (data) {
          //var csvData = "candle.csv";
          const candles = Papa.parse(data, { header: true }).data;

          var ave = 0;
          for (let i = 0; i < candles.length - 1; i++) {
               ave = ave + (parseFloat(candles[i].High) - parseFloat(candles[i].Low));
          }
          //var ave = ave + (parseFloat(candles[i].High) - parseFloat(candles[i].Low));
          var aver = ave / candles.length;
          console.log('aver' + aver);

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
                    //supportLevels.push((i, candles[i].Low));
                    console.log('support');
               } else if (isResistance(candles, i)) {
                    if (is_far_from_level((i, candles[i].High), allLevels, candles)) {
                         allLevels.push((i, candles[i].High));
                         resistanceLevels.push((i, candles[i].High));
                    }
                    //resistanceLevels.push((i, candles[i].High));
                    console.log('resistance');
               }
          }
          console.log(allLevels);
          console.log(supportLevels);
          console.log(resistanceLevels);
          checkDLtrend(candles);
          //return { support: supportLevels, resistance: resistanceLevels };
     });
}*/
/*
function is_far_from_level(value, levels, df) {
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
     console.log('EMA' + (ema - 60));
     return ema - 60;
}

function checkDLtrend(candles) {
     var ema10 = calEMA(candles, 10);
     var ema20 = calEMA(candles, 20);

     if (
          parseFloat(candles[candles.length - 2].Close) > ema10 &&
          parseFloat(candles[candles.length - 2].Close) > ema20
     ) {
          alert('uptrend');
     } else {
          alert('downtrend');
     }
}*/

getData();
setInterval(getData, 3000);
