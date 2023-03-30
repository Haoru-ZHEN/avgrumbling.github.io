const priceText = document.getElementById("price");
const wrapper = document.getElementById("wrapper");

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

function getData(){
     var ourRequest = new XMLHttpRequest();
     
     ourRequest.open('GET',url_future,true);
     ourRequest.onload = function(){
          
          console.log("dwd");
          console.log(ourRequest.responseText);
     
          var responseJSON = JSON.parse(ourRequest.responseText);  
             
          if(parseFloat(responseJSON.price) >= prevData){
               priceText.style.color = "green";
               priceText.textContent = "$"+responseJSON.price;
          }else{
               priceText.style.color = "red";
               priceText.textContent = "$"+responseJSON.price;
          }
          prevData = parseFloat(responseJSON.price)   
          
     }
     ourRequest.send();
}

function getCandleData(){
     var ourRequest = new XMLHttpRequest();
     
     ourRequest.open('GET',url,true);
     ourRequest.onload = function(){
          
     
          var responseJSON = JSON.parse(ourRequest.responseText);  
          //prevData = parseFloat(responseJSON.price)   
          console.log(ourRequest.responseText);
          
     }
     ourRequest.send();
}

function showWrapper(){
     if(!isShow){
          wrapper.classList.add('active-popup');
          isShow = true;
     }else{
          wrapper.classList.remove('active-popup');
          isShow = false;
     }
     
}

//getCandleData();
getData();
setInterval(getData, 3000);

