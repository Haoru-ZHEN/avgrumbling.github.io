const priceText = document.getElementById("price");
const wrapper = document.getElementById("wrapper");
const wrapper2 = document.getElementById("wrapper2");
const yearInput = document.getElementById("yearInput");
const monthInput = document.getElementById("monthInput");
const dayInput = document.getElementById("dayInput");
const timestampLabel = document.getElementById("timestampLabel");
const theform = document.getElementById("theform");
const fromInput = document.getElementById("fromInput");
const toInput = document.getElementById("toInput");

//base point url
var burl = "https://api.binance.com";
var future_burl = "https://fapi.binance.com";

//query with parameters
var query="/api/v3/ping";
var query_future = "/fapi/v1/ticker/price?symbol=BTCUSDT";
var query_future2= "/fapi/v1/fundingRate?symbol=BTCUSDT";
var query_candledata = "/api/v3/klines?symbol=BTCUSDT&interval=1d&startTime=1655222400000&endTime=1679760000000";

//combination
var url = burl + query_candledata;
var url_future = future_burl + query_future;

//send request
var prevData = 0;
var isShow = false;



function getCandleData(){
     var query_candledata = "/api/v3/klines?symbol=BTCUSDT&interval=1d&startTime="+fromInput.value+"&endTime="+toInput.value;

     //combination
     var url = burl + query_candledata;

     var ourRequest = new XMLHttpRequest();
     
     ourRequest.open('GET',url,true);
     ourRequest.onload = function(){
          
     
          var responseJSON = JSON.parse(ourRequest.responseText);  
          console.log(ourRequest.responseText);
          
     }
     ourRequest.send();
}

function showWrapper(){
     if(!isShow){
          wrapper.classList.add('active-popup');
          wrapper2.style.top = "700px"
          isShow = true;
     }else{
          wrapper.classList.remove('active-popup');
          wrapper2.style.top = "100px"
          isShow = false;
     }
     
}

function convertTimestamp(){
     const str = yearInput.value+'-'+monthInput.value+'-'+dayInput.value;
     
     const date = new Date(str);

     const timestamp = date.getTime();
     timestampLabel.textContent = "Timestamp: "+timestamp;
}

theform.addEventListener("submit",function(event){
     event.preventDefault();
 })



anychart.onDocumentReady(function () {

     // load data
     anychart.data.loadCsvFile("candle2.csv", function (data) {

       // create a data table
       var dataTable = anychart.data.table(0, 'MMM d yyyy');
       dataTable.addData(data);

       // map data
       var mapping = dataTable.mapAs({ 'open': 1, 'high': 2, 'low': 3, 'close': 4 });
       //var mapping = dataTable.mapAs({ 'open': 2, 'high': 3, 'low': 4, 'close': 1 });

       // set the chart type
       var chart = anychart.stock();

       // set the series
       var series = chart.plot(0).candlestick(mapping);
       series.name("BTCUSDT Spot Trade Data");

       // set the chart title
       chart.title("BTCUSDT Spot Trade Data");

       // set the container id
       chart.container('wrapper');

       //set color
       // set the rising fill color to green
       //chart.risingFill("#00FF00");

       // set the falling fill color to red
       //chart.fallingFill("#FF0000");

       // draw the chart
       chart.draw();

     });

});

