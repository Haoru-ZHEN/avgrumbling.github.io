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

function systemClick(event, option) {
     const optionUl = document.querySelector('.optionUl');
     const optionBox = document.querySelector('.optionBox');
     var link = event.target;
     const clickedLi = event.currentTarget;
     var linkRect = link.getBoundingClientRect();

     var optionLi = optionUl.querySelectorAll('li');
     const entrySys = document.querySelector('.entrySys');
     const throttleSys = document.querySelector('.throttleSys');
     const cutSys = document.querySelector('.cutSys');
     const profitSys = document.querySelector('.profitSys');
     const damageCostSys = document.querySelector('.damageCostSys');

     /*   
     optionBox.style.width = linkRect.width + 'px';
     optionBox.style.height = linkRect.height + 'px';
     var linkCenterX = linkRect.left + linkRect.width / 2;
     var boxX = linkCenterX - linkRect.width / 2;

     optionBox.style.transform = 'translateX(' + (linkRect.left - 203) + 'px)';*/

     switch (option) {
          case 0:
               entrySys.style.display = 'flex';
               throttleSys.style.display = 'none';
               cutSys.style.display = 'none';
               profitSys.style.display = 'none';
               damageCostSys.style.display = 'none';

               break;
          case 1:
               entrySys.style.display = 'none';
               throttleSys.style.display = 'flex';
               cutSys.style.display = 'none';
               profitSys.style.display = 'none';
               damageCostSys.style.display = 'none';

               break;
          case 2:
               entrySys.style.display = 'none';
               throttleSys.style.display = 'none';
               cutSys.style.display = 'flex';
               profitSys.style.display = 'none';
               damageCostSys.style.display = 'none';

               break;
          case 3:
               entrySys.style.display = 'none';
               throttleSys.style.display = 'none';
               cutSys.style.display = 'none';
               profitSys.style.display = 'flex';
               damageCostSys.style.display = 'none';

               break;
          case 4:
               entrySys.style.display = 'none';
               throttleSys.style.display = 'none';
               cutSys.style.display = 'none';
               profitSys.style.display = 'none';
               damageCostSys.style.display = 'flex';
               break;
     }
     /*
     optionLi.forEach((li) => {
          li.style.opacity = 0.5; // Set the desired opacity value
          li.style.borderBottom = '1px solid #38d39f';
     });

     const clickedLi = event.currentTarget;
     clickedLi.style.opacity = 1;
     clickedLi.style.borderBottom = '3px solid #38d39f';*/
     /*
     optionLi.forEach((li) => {
          li.style.color = '#5c5e62';
     });

     clickedLi.style.color = '#171a20';*/

     optionLi.forEach((li) => {
          li.classList.remove('activeOption');
     });

     clickedLi.classList.add('activeOption');
}

var longorshort = 'long';
function longshortClick(event, option) {
     const longshortUl = document.querySelector('.longshortUl');
     const longshortLi = longshortUl.querySelectorAll('li');
     const lsBox = document.querySelector('.lsBox');
     var link = event.target;
     var linkRect = link.getBoundingClientRect();

     lsBox.style.width = linkRect.width + 'px';
     lsBox.style.height = linkRect.height + 'px';
     //var linkCenterX = linkRect.left + linkRect.width / 2;
     //var boxX = linkCenterX - linkRect.width / 2;

     longshortLi.forEach((li) => {
          li.style.color = '#5c5e62';
     });

     lsBox.style.transform = 'translateX(' + (linkRect.left - 203) + 'px)';

     switch (option) {
          case 0:
               longorshort = 'long';
               lsBox.style.backgroundColor = 'rgb(84, 202, 175)';
               link.style.color = '#fff';
               break;
          case 1:
               longorshort = 'short';
               link.style.color = '#fff';
               lsBox.style.backgroundColor = 'rgb(255, 110, 102)';
               break;
     }
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

var resultCondition = '0,0,0,0';
function checkStrength() {
     var form = document.querySelector('.conditionForm');
     var formgroup = form.querySelectorAll('div');
     const spanTitle = form.querySelector('.spanTitle');
     const spanFront = form.querySelector('.spanFront');
     const strengthDiv = form.querySelector('.strengthDiv');

     var checkboxes = form.querySelectorAll('input[type="checkbox"]');

     // Count the number of checked checkboxes
     var con1 = '0';
     var con2 = '0';
     var con3 = '0';
     var con4 = '0';

     var checkedCount = 0;
     for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
               checkedCount++;

               switch (i) {
                    case 0:
                         con1 = '1';
                         break;
                    case 1:
                         con2 = '1';
                         break;
                    case 2:
                         con3 = '1';
                         break;
                    case 3:
                         con4 = '1';
                         break;
               }
          }
     }

     resultCondition = con1 + ',' + con2 + ',' + con3 + ',' + con4;

     spanFront.style.borderTopRightRadius = '0px';
     spanFront.style.borderBottomRightRadius = '0px';
     spanTitle.style.color = '#000';
     strengthDiv.style.boxShadow = 'none';

     switch (checkedCount) {
          case 0:
               spanFront.style.width = '0%';
               spanTitle.textContent = '0%';
               spanTitle.style.color = '#f6465d';

               break;
          case 1:
               spanFront.style.width = '25%';
               spanTitle.textContent = '25%';
               spanFront.style.backgroundColor = '#f6465d';
               break;
          case 2:
               spanFront.style.width = '50%';
               spanTitle.textContent = '50%';
               spanFront.style.backgroundColor = '#ecd04c';

               break;
          case 3:
               spanFront.style.width = '75%';
               spanTitle.textContent = '75%';
               spanFront.style.backgroundColor = '#2ebd85';

               break;
          case 4:
               spanFront.style.width = '100%';
               spanTitle.textContent = '100%';
               spanFront.style.backgroundColor = '#8b5cf6';
               //spanFront.style.background = 'linear-gradient(to right, #ec4899, #8b5cf6)';
               strengthDiv.style.boxShadow = '0 0 5px 2px rgba(139,92,246, 0.5)';
               //strengthDiv.style.boxShadow = "0 0 5px 2px rgba(236,72,153, 0.5)";

               spanFront.style.borderTopRightRadius = '50px';
               spanFront.style.borderBottomRightRadius = '50px';
               break;
     }
}

//calculate algo
function calculateEntry() {
     const initialInput = document.getElementById('initialInput');
     const damageInput = document.getElementById('damageInput');
     const marginInput = document.getElementById('marginInput');
     const leverageInput = document.getElementById('leverageInput');
     const amountInput = document.getElementById('amountInput');

     var margin = parseFloat(initialInput.value) * (parseFloat(damageInput.value) / 100);
     marginInput.value = margin.toFixed(2);

     var amount = margin * leverageInput.value;
     amountInput.value = amount.toFixed(2);

     calculateCutloss();
}

function twoFunction(event) {
     connectEntryPrice(event);
     calculateEntry();
}

function twoFunction2(event) {
     connectEntryPrice(event);
     calculateCutloss();
}

function twoFunction_percent(event) {
     connectEntryPercent(event);
     calculateEntry();
}

function connectEntryPrice(event) {
     const entryInput_cutloss = document.getElementById('entryInput_cutloss');
     const entryInput_entry = document.getElementById('entrypriceInput');
     const clickedLi = event.currentTarget;

     if (clickedLi.id == 'entrypriceInput') {
          entryInput_cutloss.value = entryInput_entry.value;
     } else {
          entryInput_entry.value = entryInput_cutloss.value;
     }
}

function connectEntryPercent(event) {
     const damageInput_entry = document.getElementById('damageInput');
     const entryPercentInput_throttle = document.getElementById('entryPInput_throttle');
     entryPercentInput_throttle.value = damageInput_entry.value;
}

function calculateCutloss() {
     const entryInput_cutloss = document.getElementById('entryInput_cutloss');
     const cutpriceInput_cutloss = document.getElementById('cutpriceInput_cutloss');
     const cutpercentInput_cutloss = document.getElementById('cutpercentInput_cutloss');
     const damagepercentInput_cutloss = document.getElementById('damagepercentInput_cutloss');
     const damageamountInput_cutloss = document.getElementById('damageamountInput_cutloss');

     const initialInput = document.getElementById('initialInput');
     const amountInput = document.getElementById('amountInput');

     var cutlossPercent = 0;
     if (longorshort == 'long') {
          cutlossPercent =
               ((parseFloat(entryInput_cutloss.value) - parseFloat(cutpriceInput_cutloss.value)) /
                    parseFloat(entryInput_cutloss.value)) *
               100;
     } else {
          cutlossPercent =
               ((parseFloat(cutpriceInput_cutloss.value) - parseFloat(entryInput_cutloss.value)) /
                    parseFloat(entryInput_cutloss.value)) *
               100;
     }

     cutpercentInput_cutloss.value = cutlossPercent.toFixed(2);

     var damageAmount = (cutlossPercent / 100) * parseFloat(amountInput.value);
     var damagePercent = (damageAmount / parseFloat(initialInput.value)) * 100;

     damageamountInput_cutloss.value = damageAmount.toFixed(2);
     damagepercentInput_cutloss.value = damagePercent.toFixed(2);
}

function calculateThrottle() {
     const throttleContainer = document.querySelector('.throttleContainer');
     const all_throttleDiv = throttleContainer.querySelectorAll('.throttlediv');
     //const clicked_throttleDiv = event.currentTarget.parentNode.parentNode;
     //console.log(clickedLi)
     //entry
     const amountInput = document.getElementById('amountInput'); //amount / price = unit
     const entrypriceInput = document.getElementById('entrypriceInput');
     const initialInput = document.getElementById('initialInput');
     const leverageInput = document.getElementById('leverageInput');

     var existUnit = parseFloat(amountInput.value) / parseFloat(entrypriceInput.value);

     //throttle
     var total_unit = 0 + existUnit;
     var total_amount = 0 + parseFloat(amountInput.value);

     var count = 1;
     all_throttleDiv.forEach((eachDiv) => {
          const percentInput_throttle = eachDiv.querySelector('.percentInput_throttle');
          const amountLabel_throttle = eachDiv.querySelector('.amountLabel_throttle');
          const amountInput_throttle = eachDiv.querySelector('.amountInput_throttle');
          const priceInput_throttle = eachDiv.querySelector('.priceInput_throttle');
          const avgInput_throttle = eachDiv.querySelector('.avgInput_throttle');

          //add up unit and amount
          var throttleUnit =
               (parseFloat(amountInput_throttle.value) * parseFloat(leverageInput.value)) /
               parseFloat(priceInput_throttle.value);

          var throttleAmount =
               parseFloat(amountInput_throttle.value) * parseFloat(leverageInput.value); //leverage include

          total_unit += throttleUnit;
          total_amount += throttleAmount;
          amountLabel_throttle.textContent =
               'Throttle Margin ($' +
               (total_amount / parseFloat(leverageInput.value)).toFixed(0) +
               ')';

          //calculate average price
          var average_now = total_amount / total_unit;
          avgInput_throttle.value = average_now.toFixed(2);

          //calculate percent damage cost
          percentInput_throttle.value =
               ((amountInput_throttle.value / parseFloat(initialInput.value)) * 100).toFixed(2) +
               '%';
     });
}

function calculateProfit() {
     const profitContainer = document.querySelector('.profitContainer');
     const all_profitDiv = profitContainer.querySelectorAll('.profitdiv');
     //const clicked_throttleDiv = event.currentTarget.parentNode.parentNode;
     //console.log(clickedLi)
     //entry
     const amountInput = document.getElementById('amountInput'); //amount / price = unit
     const entrypriceInput = document.getElementById('entrypriceInput');
     const initialInput = document.getElementById('initialInput');
     const leverageInput = document.getElementById('leverageInput');

     var existUnit = parseFloat(amountInput.value) / parseFloat(entrypriceInput.value);

     //throttle
     /*const percentInput1_throttle = clicked_throttleDiv.getElementById('percentInput1_throttle');
     const amountInput1_throttle = clicked_throttleDiv.getElementById('amountInput1_throttle');
     const priceInput1_throttle = clicked_throttleDiv.getElementById('priceInput1_throttle');
     const avgInput1_throttle = clicked_throttleDiv.getElementById('avgInput1_throttle');*/
     //const h3_titleDiv = clicked_throttleDiv.querySelector('.titleDiv h3');
     //var queueNum = h3_titleDiv.textContent[0]; //2
     var total_unit = 0 + existUnit;
     var total_amount = 0 + parseFloat(amountInput.value);

     var count = 1;
     all_profitDiv.forEach((eachDiv) => {
          const percentInput_profit = eachDiv.querySelector('.percentInput_profit');
          const amountLabel_profit = eachDiv.querySelector('.amountLabel_profit');
          const amountInput_profit = eachDiv.querySelector('.amountInput_profit');
          const priceInput_profit = eachDiv.querySelector('.priceInput_profit');
          const avgInput_profit = eachDiv.querySelector('.avgInput_profit');

          //add up unit and amount
          var profitUnit =
               (parseFloat(amountInput_profit.value) * parseFloat(leverageInput.value)) /
               parseFloat(priceInput_profit.value);

          var profitAmount = parseFloat(amountInput_profit.value) * parseFloat(leverageInput.value); //leverage include

          total_unit += profitUnit;
          total_amount += profitAmount;
          amountLabel_profit.textContent =
               'profit Margin ($' +
               (total_amount / parseFloat(leverageInput.value)).toFixed(0) +
               ')';

          //calculate average price
          var average_now = total_amount / total_unit;
          avgInput_profit.value = average_now.toFixed(2);

          //calculate percent damage cost
          percentInput_profit.value =
               ((amountInput_profit.value / parseFloat(initialInput.value)) * 100).toFixed(2) + '%';
     });
}

function calculateDamageCost() {
     const cutlossInput_damage = document.getElementById('cutlossInput_damage');
     const maxlossInput_damage = document.getElementById('maxlossInput_damage');
     const leverageInput_damage = document.getElementById('leverageInput_damage');
     const damageCostPInput_damage = document.getElementById('damageCostPInput_damage');
     const damageCostAInput_damage = document.getElementById('damageCostAInput_damage');
     const initialInput = document.getElementById('initialInput');

     if (initialInput.value == '') {
          showToast('error', 'Initial Input is empty');
     }

     var damageCOST_Calculated =
          parseFloat(maxlossInput_damage.value) /
          parseFloat(leverageInput_damage.value) /
          (parseFloat(cutlossInput_damage.value) / 100);
     damageCostAInput_damage.value = damageCOST_Calculated.toFixed(1);
     damageCostPInput_damage.value = (
          (parseFloat(damageCostAInput_damage.value) / parseFloat(initialInput.value)) *
          100
     ).toFixed(2);
}

//load data
function loadData() {
     if (planID == null || planID == '') {
          return;
     } else {
          const addBut = document.getElementById('addBut');
          addBut.textContent = 'Save portfolio';

          console.log(parseFloat(entrypriceInput));

          //database retrieve
          const dbref = firebase.database().ref();
          const thelist = dbref.child('Portfolio').child(idFinder).child(planID);
          //loader.style.display = 'flex';

          thelist.once('value', function (snapshot) {
               thedata = snapshot.val();

               console.log(thedata);
               //set entrySys data
               pairInput.value = thedata.EntrySys.SYMBOL;
               entrypriceInput.value = thedata.EntrySys.ENTRY_PRICE;
               initialInput.value = thedata.EntrySys.INITIAL;
               apiInput.value = thedata.EntrySys.API;
               damageInput.value = thedata.EntrySys.DAMAGE_COST;
               leverageInput.value = thedata.EntrySys.LEVERAGE;

               refreshCondition(thedata.EntrySys.ENTRY_CONDITION);
               refreshLongshort(thedata.EntrySys.LONGSHORT);

               //set throttleSys data
               totalPositionInput_throttle.value = thedata.ThrottleSys.target_position;
               entryPInput_throttle.value = thedata.EntrySys.DAMAGE_COST;

               const throttleContainer = document.querySelector('.throttleContainer');
               throttleContainer.innerHTML = '';
               var throttleList_GET = thedata.ThrottleSys.throttleList;
               Object.keys(throttleList_GET).forEach((key) => {
                    const value = throttleList_GET[key];
                    if(value.isThrottle){
                         addThrottleDiv('value=' + value.throttleMargin, 'value=' + value.throttlePrice, 'checked');
                    }else{
                         addThrottleDiv('value=' + value.throttleMargin, 'value=' + value.throttlePrice);
                    }
               });

               //set cutlossSys data
               entryInput_cutloss.value = thedata.EntrySys.ENTRY_PRICE;
               cutpriceInput_cutloss.value = thedata.CutlossSys.CUTLOSS_PRICE;

               //set profitSys data
               const profitContainer = document.querySelector('.profitContainer');
               profitContainer.innerHTML = '';
               var profitList_GET = thedata.ProfitSys.profitList;
               Object.keys(profitList_GET).forEach((key) => {
                    const value = profitList_GET[key];
                    addProfitDiv(
                         'value=' + value.profitPercent,
                         'value=' + value.profitPrice,
                         value.profitCondition
                    );
                    //console.log(key, value);
               });

               //call calculate function
               calculateCutloss()
               calculateEntry()
               calculateThrottle()
               calculateProfit()
          });
     }
}

function refreshCondition(condition_Get) {
     var condition_Split = condition_Get.split(',');
     var form = document.querySelector('.conditionForm');
     var checkboxes = form.querySelectorAll('input[type="checkbox"]');

     for (var i = 0; i < checkboxes.length; i++) {
          console.log(condition_Split[i]);
          if (condition_Split[i] == '1') {
               checkboxes[i].checked = true;
          }
     }
     console.log(resultCondition);
     resultCondition = condition_Get;

     checkStrength();
}

function refreshLongshort(option) {
     const longshortLi = document.querySelectorAll('.longshortUl li');
     const lsBox = document.querySelector('.lsBox');
     const longSwitch = document.getElementById('longSwitch');
     const shortSwitch = document.getElementById('shortSwitch');

     longshortLi.forEach((li) => {
          li.style.color = '#5c5e62';
     });

     switch (option) {
          case 'long':
               longorshort = 'long';
               lsBox.style.backgroundColor = 'rgb(84, 202, 175)';
               longSwitch.style.color = '#fff';

               var linkRect = longSwitch.getBoundingClientRect();

               lsBox.style.width = linkRect.width + 'px';
               lsBox.style.height = linkRect.height + 'px';
               lsBox.style.transform = 'translateX(' + (linkRect.left - 203) + 'px)';
               break;
          case 'short':
               longorshort = 'short';
               shortSwitch.style.color = '#fff';
               lsBox.style.backgroundColor = 'rgb(255, 110, 102)';

               var linkRect = shortSwitch.getBoundingClientRect();

               lsBox.style.width = linkRect.width + 'px';
               lsBox.style.height = linkRect.height + 'px';
               lsBox.style.transform = 'translateX(' + (linkRect.left - 203) + 'px)';
               break;
     }
}

/****add data to portfolio */
function saveData() {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('Portfolio').child(idFinder).child(planID);

     const apiInput = document.getElementById('apiInput');

     const entrySys = {
          SYMBOL: pairInput.value || '-',
          LONGSHORT: longorshort,
          ENTRY_PRICE: parseFloat(entrypriceInput.value) || 0,
          ENTRY_MARGIN: parseFloat(marginInput.value) || 0,
          DAMAGE_COST: parseFloat(damageInput.value) || 0,
          INITIAL: parseFloat(initialInput.value) || 0,
          LEVERAGE: parseFloat(leverageInput.value) || 1,
          ENTRY_AMOUNT: parseFloat(amountInput.value) || 0,
          ENTRY_CONDITION: resultCondition,
          API: apiInput.value || '-',
          STATUS: '1',
     };

     const throttleSys = {
          target_position: totalPositionInput_throttle.value || 0,
     };

     const all_throttleDiv = document.querySelectorAll('.throttlediv');
     const throttleSysArray = {}; // Create an empty array to store throttleList objects

     all_throttleDiv.forEach((eachDiv) => {
          const isThrottlecheckbox = eachDiv.querySelector('.isThrottlecheckbox');

          var tempList = dbref
               .child('Portfolio')
               .child(idFinder)
               .child(planID)
               .child('ThrottleSys');
          var tempKey = tempList.push().key;

          var throttleList = {
               throttleMargin:
                    parseFloat(eachDiv.querySelector('.amountInput_throttle').value) || 0,
               throttlePrice: parseFloat(eachDiv.querySelector('.priceInput_throttle').value) || 0,
               throttleId: tempKey,
               isThrottle:isThrottlecheckbox.checked
          };

          //throttleSysArray.push(throttleList);
          throttleSysArray[tempKey] = throttleList; // Add the throttleList object to the array
     });

     // Assign the array of throttleList objects to throttleSys
     throttleSys.throttleList = throttleSysArray;
     console.log(throttleSys);

     const cutlossSys = {
          CUTLOSS_PRICE: parseFloat(cutpriceInput_cutloss.value) || 0,
     };

     const profitSys = {};

     const all_profitDiv = document.querySelectorAll('.profitdiv');
     const profitSysArray = {}; // Create an empty array to store throttleList objects

     all_profitDiv.forEach((eachDiv) => {
          var tempList = dbref.child('Portfolio').child(idFinder).child(planID).child('ProfitSys');
          var tempKey = tempList.push().key;
          console.log( eachDiv.querySelector('.conditionInput_profit').value)

          var profitList = {
               profitPercent: parseFloat(eachDiv.querySelector('.percentInput_profit').value) || 0,
               profitPrice: parseFloat(eachDiv.querySelector('.priceInput_profit').value) || 0,
               profitCondition: eachDiv.querySelector('.conditionInput_profit').value || '-',
               profitId: tempKey,
          };

          //throttleSysArray.push(throttleList);
          profitSysArray[tempKey] = profitList; // Add the throttleList object to the array
     });

     // Assign the array of throttleList objects to throttleSys
     profitSys.profitList = profitSysArray;
     console.log(profitSys);

     var newData2 = {
          EntrySys: {
               ...entrySys,
          },
          ThrottleSys: {
               ...throttleSys,
          },
          CutlossSys: {
               ...cutlossSys,
          },
          ProfitSys: {
               ...profitSys,
          },
     };

     thelist
          .child('EntrySys')
          .update(entrySys)
          .then(() => {})
          .catch((error) => {
               showToast('error', 'Failed to add data');
               console.error(error);
          });
     thelist
          .child('CutlossSys')
          .update(cutlossSys)
          .then(() => {})
          .catch((error) => {
               showToast('error', 'Failed to add data');
               console.error(error);
          });

     thelist
          .child('ThrottleSys')
          .set(throttleSys)
          .then(() => {})
          .catch((error) => {
               showToast('error', 'Failed to add data');
               console.error(error);
          });

     thelist
          .child('ProfitSys')
          .child('profitList')
          .set(profitSys.profitList)
          .then(() => {})
          .catch((error) => {
               showToast('error', 'Failed to add data');
               console.error(error);
          });
     showToast('success', 'Save successfully');
}
function addData() {
     const dbref = firebase.database().ref();
     const thelist = dbref.child('Portfolio').child(idFinder);
     var newKey = thelist.push().key;
     //console.log(newKey);
     const timestamp = Date.now(); // Returns the current timestamp in milliseconds
     const apiInput = document.getElementById('apiInput');
     

     const entrySys = {
          SYMBOL: pairInput.value || '-',
          LONGSHORT: longorshort,
          ENTRY_PRICE: parseFloat(entrypriceInput.value) || 0,
          IDKEY: newKey,
          ENTRY_MARGIN: parseFloat(marginInput.value) || 0,
          DAMAGE_COST: parseFloat(damageInput.value) || 0,
          INITIAL: parseFloat(initialInput.value) || 0,
          LEVERAGE: parseFloat(leverageInput.value) || 1,
          ENTRY_AMOUNT: parseFloat(amountInput.value) || 0,
          ENTRY_CONDITION: resultCondition,
          API: apiInput.value || '-',
          planTime: timestamp,
          entryTime: '0',
          MEMO: '-',
          STATUS: '1',
     };

     const throttleSys = {
          target_position: totalPositionInput_throttle.value || 0,
          /*ENTRY_MARGIN: parseFloat(percentInput1_throttle.value),
          DAMAGE_COST: parseFloat(amountInput1_throttle.value),
          LEVERAGE: parseFloat(priceInput1_throttle.value),
          ENTRY_AMOUNT: parseFloat(avgInput1_throttle.value),*/
     };

     const all_throttleDiv = document.querySelectorAll('.throttlediv');
     const throttleSysArray = {}; // Create an empty array to store throttleList objects

     all_throttleDiv.forEach((eachDiv) => {
          const isThrottlecheckbox = eachDiv.querySelector('.isThrottlecheckbox');
          var tempList = dbref
               .child('Portfolio')
               .child(idFinder)
               .child(newKey)
               .child('ThrottleSys');
          var tempKey = tempList.push().key;

          var throttleList = {
               throttleMargin:
                    parseFloat(eachDiv.querySelector('.amountInput_throttle').value) || 0,
               throttlePrice: parseFloat(eachDiv.querySelector('.priceInput_throttle').value) || 0,
               throttleId: tempKey,
               isThrottle:isThrottlecheckbox.checked,
          };

          //throttleSysArray.push(throttleList);
          throttleSysArray[tempKey] = throttleList; // Add the throttleList object to the array
     });

     // Assign the array of throttleList objects to throttleSys
     throttleSys.throttleList = throttleSysArray;
     console.log(throttleSys);

     const cutlossSys = {
          //target_position: entryInput_cutloss.value,
          CUTLOSS_PRICE: parseFloat(cutpriceInput_cutloss.value) || 0,
          //DAMAGE_COST: parseFloat(cutpercentInput_cutloss.value),
          //LEVERAGE: parseFloat(damagepercentInput_cutloss.value),
          //ENTRY_AMOUNT: parseFloat(damageamountInput_cutloss.value)
     };

     const profitSys = {
          //target_position: entryInput_cutloss.value,
          //CUTLOSS_PRICE: parseFloat(cutpriceInput_cutloss.value)|| '-',
          //DAMAGE_COST: parseFloat(cutpercentInput_cutloss.value),
          //LEVERAGE: parseFloat(damagepercentInput_cutloss.value),
          //ENTRY_AMOUNT: parseFloat(damageamountInput_cutloss.value)
     };

     const all_profitDiv = document.querySelectorAll('.profitdiv');
     const profitSysArray = {}; // Create an empty array to store throttleList objects

     all_profitDiv.forEach((eachDiv) => {
          var tempList = dbref.child('Portfolio').child(idFinder).child(newKey).child('ProfitSys');
          var tempKey = tempList.push().key;

          var profitList = {
               profitPercent: parseFloat(eachDiv.querySelector('.percentInput_profit').value) || 0,
               profitPrice: parseFloat(eachDiv.querySelector('.priceInput_profit').value) || 0,
               profitCondition: eachDiv.querySelector('.conditionInput_profit').value || '-',
               profitId: tempKey,
          };

          //throttleSysArray.push(throttleList);
          profitSysArray[tempKey] = profitList; // Add the throttleList object to the array
     });

     // Assign the array of throttleList objects to throttleSys
     profitSys.profitList = profitSysArray;
     console.log(profitSys);

     var newData2 = {
          EntrySys: {
               ...entrySys,
          },
          ThrottleSys: {
               ...throttleSys,
          },
          CutlossSys: {
               ...cutlossSys,
          },
          ProfitSys: {
               ...profitSys,
          },
     };

     //newData2.EntrySys = entrySys;
     thelist
          .child(newKey)
          .set(newData2)
          .then(() => {
               showToast('success', 'Add successful');
          })
          .catch((error) => {
               showToast('error', 'Failed to add data');
               console.error(error);
          });
}

function addPair() {
     if (validate()) {
          if (planID == null || planID == '') {
               addData();
               pairInput.value = '';
               entrypriceInput.value = '';
          } else {
               console.log('save');
               saveData();
          }
     }
}

function validate() {
     let withoutSpaces = pairInput.value.replace(/\s/g, '');
     if (withoutSpaces == '' || entrypriceInput == '') {
          //alert("Pair name shouldn't be empty");
          showToast('error', "Symbol and entry price shouldn't be empty");
          return false;
     } else {
          return true;
     }
}

function addPortfolio() {
     addData();
}

//add & delete new div
function addThrottleDiv(marginValue = '', priceValue = '', throttleIsCheck='') {
     var count = document.querySelectorAll('.throttlediv').length;
     console.log(count);

     if (count < 5) {
          const throttleContainer = document.querySelector('.throttleContainer');
          //const throttleH3 = document.createElement('h3');
          //throttleH3.textContent = '2. Throttle';

          const throttleDiv = document.createElement('div');
          throttleDiv.className = 'throttlediv';
          throttleDiv.innerHTML =
               `<div class="titleDiv">
          
               <div style="display: flex; flex-direction: row; align-items: center;">
               <h3>` +
               (count + 1) +
               `. Throttle</h3>
                                        <label class="switch">
                                             <input type="checkbox" `+throttleIsCheck+` class="isThrottlecheckbox" id="checkbox" />
                                             <div class="toggle">
                                                  <div class="star1"></div>
                                                  <div class="star2"></div>
                                             </div>
                                        </label>
                                   </div>
          <i class="uil uil-times-circle" onclick="deleteThrottleDiv(event)"></i>
     </div>
     
     
     <div class="input-box ">
                                   <label for="amountInput1_throttle" class="amountLabel_throttle">Throttle Margin</label>
                                   <input id="amountInput1_throttle" class="amountInput_throttle" ` +
               marginValue +
               ` autocomplete="off" oninput="calculateThrottle()"/>
                              </div>
                              <div class="input-box">
                                   <label for="priceInput1_throttle">Throttle Price</label>
                                   <input id="priceInput1_throttle" class="priceInput_throttle" ` +
               priceValue +
               ` autocomplete="off" oninput="calculateThrottle()"/>
                              </div>
                              <div class="input-box disableInput">
                                   <label for="percentInput1_throttle">Throttle (%)</label>
                                   <input id="percentInput1_throttle" class="percentInput_throttle" required autocomplete="off" disabled/>
                              </div>
                              <div class="input-box disableInput">
                                   <label for="avgInput1_throttle">Average Price</label>
                                   <input id="avgInput1_throttle" class="avgInput_throttle" autocomplete="off" disabled/>
                              </div>`;
          //throttleContainer.appendChild(throttleH3);
          throttleContainer.appendChild(throttleDiv);
     } else {
          showToast('error', 'Throttle should me less than 5 times');
     }
}

function deleteThrottleDiv(event) {
     const clicked_throttleDiv = event.currentTarget.parentNode.parentNode;
     const throttleContainer = document.querySelector('.throttleContainer');

     clicked_throttleDiv.remove();
     const all_throttleDiv = throttleContainer.querySelectorAll('.throttlediv');
     var count = 1;
     all_throttleDiv.forEach((eachDiv) => {
          const h3_titleDiv = eachDiv.querySelector('.titleDiv h3');
          h3_titleDiv.textContent = count + '. Throttle';
          count++;
          console.log('here');
     });
     console.log('heer');
     calculateThrottle();
}

function addProfitDiv(percentValue = '', priceValue = '', conditionValue = '') {
     var count = document.querySelectorAll('.profitdiv').length;

     if (count < 5) {
          const profitContainer = document.querySelector('.profitContainer');
          //const throttleH3 = document.createElement('h3');
          //throttleH3.textContent = '2. Throttle';

          const profitdiv = document.createElement('div');
          profitdiv.className = 'profitdiv';
          profitdiv.innerHTML =
               `<div class="titleDiv">
          <h3>` +
               (count + 1) +
               `. Take Profit</h3>
          <i class="uil uil-times-circle" onclick="deleteProfitDiv(event)"></i>
          </div>
          
          <div class="input-box">
               <label for="takePInput1_profit">Take Profit (%)</label>
               <input id="takePInput1_profit" ` +
               percentValue +
               ` class="percentInput_profit" type="text" autocomplete="off" />
          </div>
          <div class="input-box">
               <label for="priceInput1_profit">Profit Price</label>
               <input id=priceInput1_profit" ` +
               priceValue +
               ` class="priceInput_profit" type="text" autocomplete="off" />
          </div>
          <div class="input-box">
               <label for="conditionInput1_profit">Profit Condition</label>
               <input id="conditionInput1_profit" class="conditionInput_profit" type="text" autocomplete="off"/>
          </div>
          <div class="input-box disableInput">
               <label for="amountInput1_profit">Profit Amount</label>
               <input id="amountInput1_profit" class="amountInput_profit" type="text" autocomplete="off" disabled/>
          </div>`;

          const conditionInput_profit = profitdiv.querySelector('.conditionInput_profit');
          conditionInput_profit.value = conditionValue;
          profitContainer.appendChild(profitdiv);
     } else {
          showToast('error', 'Throttle should me less than 5 times');
     }
}

function deleteProfitDiv(event) {
     const clicked_profitDiv = event.currentTarget.parentNode.parentNode;
     const profitContainer = document.querySelector('.profitContainer');

     clicked_profitDiv.remove();
     const all_profitDiv = profitContainer.querySelectorAll('.profitdiv');
     var count = 1;
     all_profitDiv.forEach((eachDiv) => {
          const h3_titleDiv = eachDiv.querySelector('.titleDiv h3');
          h3_titleDiv.textContent = count + '. Take Profit';
          count++;
     });
     //calculateThrottle();
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
//var idsystem_get = localStorage.getItem('systemID');
//let idSystem = idsystem_get.replace(/"/g, '');
//console.log(idSystem)

const urlParams = new URLSearchParams(window.location.search);
const planID = urlParams.get('planID');
console.log(planID);
mobileSetting();
loadData();
