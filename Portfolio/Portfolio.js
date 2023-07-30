const firebaseConfig = {
     apiKey: 'AIzaSyBOEl_rUKbkYLZFcuggbacGjpA6GKRx3TA',
     authDomain: 'tradefinder-d8892.firebaseapp.com',
     databaseURL: 'https://tradefinder-d8892-default-rtdb.asia-southeast1.firebasedatabase.app',
     projectId: 'tradefinder-d8892',
     storageBucket: 'tradefinder-d8892.appspot.com',
     messagingSenderId: '376720258538',
     appId: '1:376720258538:web:d36321540b36e599a2ee93',
     measurementId: 'G-2WSFSLRYQW',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//moving box function in header
function moveBox(event) {
     var box = document.querySelector('.box');
     box.style.display = 'inline-block';
     box.style.left = '0';
     box.style.opacity = 1;

     var link = event.target;
     var linkRect = link.getBoundingClientRect();
     var linkCenterX = linkRect.left + linkRect.width / 2;

     //var boxWidth = box.offsetWidth;

     box.style.width = linkRect.width + 'px';
     //var boxHeight = box.offsetHeight;
     var boxX = linkCenterX - linkRect.width / 2;
     //var boxY = linkRect.bottom;
     //box.style.transform = 'translate(' + boxX + 'px, ' + boxY + 'px)';
     box.style.transform = 'translateX(' + boxX + 'px)';
}

function removeBox() {
     var box = document.querySelector('.box');
     box.style.opacity = 0;
}

function showBox() {
     var box = document.querySelector('.box');
     box.style.opacity = 1;
}

/***MENU FUNCTION */
function openMenu() {
     const sideBar = document.querySelector('.sideBar');
     const sideWall = document.querySelector('.sideWall');
     const blurArea = document.querySelector('.blurArea');
     var screenWidth = window.innerWidth;
     const mainHeader = document.querySelector('.mainHeader');

     if (screenWidth <= 600) {
          sideBar.style.width = '90%';
          sideBar.style.padding = '10px';
     } else if (screenWidth <= 900) {
          sideBar.style.width = '40%';
          sideBar.style.padding = '20px';
     } else {
          sideBar.style.width = '20%';
          sideBar.style.padding = '30px';
     }

     mainHeader.style.zIndex = 0;
     sideWall.style.opacity = 1;
     //sideBar.style.right = '0'

     sideWall.style.zIndex = 1;
     blurArea.style.backdropFilter = 'blur(3px)';
}

function closeMenu() {
     const sideBar = document.querySelector('.sideBar');
     const sideWall = document.querySelector('.sideWall');
     const blurArea = document.querySelector('.blurArea');

     const mainHeader = document.querySelector('.mainHeader');

     mainHeader.style.zIndex = 99;

     sideBar.style.width = '0';
     sideBar.style.padding = '0';

     blurArea.style.backdropFilter = 'blur(0px)';

     sideBar.addEventListener(
          'transitionend',
          function () {
               if (sideBar.style.width === '0px') {
                    sideWall.style.opacity = 0;
                    sideWall.style.zIndex = -1;
               }
          },
          { once: true }
     );
}

function mobileSetting() {
     const midUl = document.querySelector('.midUl');
     var screenWidth = window.innerWidth;

     if (screenWidth >= 900) {
          midUl.style.display = 'flex';
     } else {
          midUl.style.display = 'none';
     }
}

//data
function loadData() {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('Portfolio').child(idFinder);
     loader.style.display = 'flex';
     const numPlanH4 = document.getElementById('numPlanH4');

     thelist.once('value', function (snapshot) {
          //snapshot contain many bundles
          console.log(snapshot.val());
          var count = 1;

          snapshot.forEach(function (data) {
               //console.log('HERE');
               //data is the bundle
               thedata = data.val(); //thedata is the data of the bundle
               var id = data.key; //key is thee key of bundle
               console.log(thedata);
               addItem(thedata.EntrySys, count, thedata.ThrottleSys);
               count++;
          });

          numPlanH4.textContent = 'Current Plan: ' + (count - 1) + '/5';
          //mobileSetting();
          loader.style.display = 'none';
     });
}

function calculateAvgPrice(entrySys, throttleSys) {
     var unit_total = entrySys.ENTRY_MARGIN / entrySys.ENTRY_PRICE;
     var margin_total = entrySys.ENTRY_MARGIN;

     var throttleList_GET = thedata.ThrottleSys.throttleList;
     Object.keys(throttleList_GET).forEach((key) => {
          const value = throttleList_GET[key];
          if (value.isThrottle) {
               var eachUnit = value.throttleMargin / value.throttlePrice;
               unit_total += eachUnit;
               margin_total += value.throttleMargin;
          }
     });
     /*throttleSys.throttlelist.forEach(eachThrottle => {
          if(eachThrottle.isThrottle){
             var eachUnit = eachThrottle.throttleMargin /eachThrottle.throttlePrice
               unit_total += eachUnit  
               margin_total += eachThrottle.throttleMargin  
          }
          
     });*/

     var avgPrice = (margin_total / unit_total).toFixed(2);
     return avgPrice;
}

function addItem(entrySys, count, throttleSys) {
     const gridView = document.querySelector('.gridView');
     var isChecked = '';

     if (entrySys.STATUS == '2') {
          isChecked = 'checked';
     }
     const finalID = "'" + entrySys.IDKEY + "'";

     var averagePrice = calculateAvgPrice(entrySys, throttleSys);
     const profitdiv = document.createElement('div');
     profitdiv.className = 'gridItem';
     profitdiv.innerHTML =
          `<div class="titleDiv">
          <div style="display: flex; flex-direction: row; align-items: center;">
               <h3>Plan ` +
          count +
          `</h3>
               

               <label class="switch">
                    <input type="checkbox" ` +
          isChecked +
          ` id="checkbox" onclick="changeStock()" />
                    <div class="toggle">
                         <div class="star1"></div>
                         <div class="star2"></div>
                    </div>
               </label>
          </div>

          <i class="uil uil-ellipsis-h moreIcon" onclick="showMorediv(event,` +
          finalID +
          `)"></i>
     </div>
     <div class="detailDiv">
          <h4>Pair</h4>
          <h5>` +
          entrySys.SYMBOL +
          `</h5>
     </div>
     <div class="detailDiv">
          <h4>Average Price</h4>
          <h5>` +
          averagePrice +
          `</h5>
     </div>
     <div class="detailDiv apiDiv">
          <h4>Price Now</h4>
          <h5>--</h5>
     </div>
     <h4>Memo:</h4>
     <textarea name="" class="memoTextarea" cols="30" rows="3">` +
          entrySys.MEMO +
          `</textarea>`;
     const apiText = profitdiv.querySelector('.apiDiv h5');
     getPrice_API(apiText, entrySys.API);
     gridView.appendChild(profitdiv);
}

function getTextBetweenSingleQuotes(str) {
     const regex = /'([^']*)'/;
     const match = str.match(regex);
     return match ? match[1] : null;
}

function saveData() {
     const gridItem = document.querySelectorAll('.gridItem');
     const dbref = firebase.database().ref();
     const thelist = dbref.child('Portfolio').child(idFinder);

     gridItem.forEach((eachGridItem) => {
          const checkbox = eachGridItem.querySelector('.switch input');
          const memoTextarea = eachGridItem.querySelector('.memoTextarea');
          const moreIcon = eachGridItem.querySelector('.moreIcon');
          const onclickAttributeValue = moreIcon.getAttribute('onclick');
          const textBetweenSingleQuotes = getTextBetweenSingleQuotes(onclickAttributeValue);

          var isChecked = '1';
          if (checkbox.checked) {
               isChecked = '2';
          }

          entrySys = {
               STATUS: isChecked,
               MEMO: memoTextarea.value || '-',
          };

          thelist
               .child(textBetweenSingleQuotes)
               .child('EntrySys')
               .update(entrySys)
               .then(() => {
                    showToast('success', 'Save data successfully');
               })
               .catch((error) => {
                    showToast('error', 'Failed to add data');
                    console.error(error);
               });
     });
}

function deleteItem() {
     const idText = document.querySelector('.moreDiv .idText');
     const dbref = firebase.database().ref();
     const thelist = dbref.child('Portfolio').child(idFinder).child(idText.textContent);

     // Call the remove() method on the reference to delete the node
     thelist
          .remove()
          .then(() => {
               const gridView = document.querySelector('.gridView');
               gridView.innerHTML = '';
               loadData();
               showToast('success', 'Delete successfully');
          })
          .catch((error) => {
               console.error('Error deleting node:', error);
               showToast('error', 'Failed to delete');
          });
}

//moreDiv

function showMorediv(event, theID) {
     const moreDiv = document.querySelector('.moreDiv');
     const idText = document.querySelector('.moreDiv .idText');
     const clickedDiv = event.currentTarget;
     var topPosition = clickedDiv.offsetTop;
     var rightPosition = clickedDiv.getBoundingClientRect().left;
     // var topPosition = this.parentElement.getBoundingClientRect().top;

     moreDiv.style.top = topPosition + 30 + 'px';
     moreDiv.style.left = rightPosition - 140 + 'px';
     //moreDiv.style.display = 'flex'

     if (moreDiv.style.display == 'none' || moreDiv.style.display == '') {
          moreDiv.style.display = 'flex';
     } else {
          moreDiv.style.display = 'none';
     }

     //set ID
     idText.textContent = theID;
}

function goEdit() {
     const idText = document.querySelector('.moreDiv .idText');
     //localStorage.setItem('systemID', JSON.stringify(idText.textContent));
     window.open('../System/System.html?planID=' + idText.textContent);
}

//API

function getPrice_API(theelement, URL_GET) {
     console.log(URL_GET);
     var ourRequest = new XMLHttpRequest();

     ourRequest.open('GET', URL_GET, true);
     ourRequest.onload = function () {
          if (ourRequest.status >= 200 && ourRequest.status < 300) {
               var responseJSON = JSON.parse(ourRequest.responseText);
               console.log(ourRequest.responseText);

               var priceGet = responseJSON.price;
               if (parseFloat(priceGet) >= 1) {
                    theelement.textContent = parseFloat(priceGet).toFixed(2);
               } else {
                    theelement.textContent = priceGet;
               }
          } else {
               // First request failed, send the second request
               //crypto api
               sendSecondRequest(theelement, URL_GET);

               theelement.textContent = '-';
          }
     };
     ourRequest.onerror = function () {
          // First request failed, send the second request
          sendSecondRequest(theelement, URL_GET);
          theelement.textContent = 'Failed';
     };
     ourRequest.send();
}

function sendSecondRequest(theelement, URL_GET) {
     const xhr = new XMLHttpRequest();
     xhr.addEventListener('readystatechange', function () {
          if (this.readyState === XMLHttpRequest.DONE) {
               if (this.status >= 200 && this.status < 300) {
                    var responseJSON = JSON.parse(this.responseText);
                    //console.log(responseJSON.price);
                    var priceGet = responseJSON.price;
                    if (parseFloat(priceGet) >= 1) {
                         theelement.textContent = parseFloat(priceGet).toFixed(2);
                    } else {
                         theelement.textContent = priceGet;
                    }
               } else {
                    // Second request also failed
                    console.error('Both requests failed');
                    theelement.textContent = 'Failed';
                    //isLoop_API = true;
               }
          }
     });
     xhr.onerror = function () {
          // First request failed, send the second request
          theelement.textContent = 'Failed';
     };
     xhr.open('GET', URL_GET);
     xhr.setRequestHeader('X-RapidAPI-Key', 'b700c0ed85mshcba7325dba0217bp1fe50ejsn769d68549977');
     xhr.setRequestHeader('X-RapidAPI-Host', 'twelve-data1.p.rapidapi.com');
     xhr.send();
}

// TOAST FUNCTION
const toastUl = document.getElementById('toastUl');
const toastDetails = {
     success: {
          icon: 'uim uim-check-circle',
          text: 'Action successful',
     },
     error: {
          icon: 'uim uim-exclamation-triangle',
          text: 'Error occurred',
     },
};

function removeToast(toast) {
     toast.classList.add('hide');
     if (toast.timeoutId) clearTimeout(toast.timeoutId);
     setTimeout(() => toast.remove(), 500);
}
function showToast(whichtoast, thetext) {
     const { icon, text } = toastDetails[whichtoast];
     const toast = document.createElement('li');
     toast.className = `toast ${whichtoast}`;
     toast.innerHTML = `<div class="column">
                              <i class="${icon}"></i>
                              <h3>${thetext}</h3>
                         </div>
                         <i class="uil uil-times" onclick="removeToast(this.parentElement)"></i>`;

     toastUl.appendChild(toast);

     toast.timeoutId = setTimeout(() => removeToast(toast), 4000);
}

//main
var idFinder_get = localStorage.getItem('Finder');
let idFinder = idFinder_get.replace(/"/g, '');
const loader = document.querySelector('.loaderContainer');
loadData();
mobileSetting();
