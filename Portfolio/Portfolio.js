const table = document.getElementById('thetable');
const priceInput = document.getElementById('priceinput');
const amountInput = document.getElementById('amountinput');
const theform = document.getElementById('newEntry-form');

var numRow = 1;
var averagePrice = 0;
var totalUnit = 0;
var totalAmount = 0;

function addNewRow() {
     var newRow = document.createElement('tr');
     var newCell1 = document.createElement('th');
     newCell1.textContent = numRow + '.';
     newCell1.classList.add('firstData');

     var newCell2 = document.createElement('th');
     newCell2.textContent = priceInput.value;
     newCell2.classList.add('item');

     var newCell4 = document.createElement('th');
     newCell4.textContent = amountInput.value;
     newCell4.classList.add('item');

     var newCell5 = document.createElement('th');
     var unit = amountInput.value / priceInput.value;
     newCell5.textContent = unit.toFixed(3);
     totalUnit = totalUnit + unit;
     newCell5.classList.add('item');

     var newCell6 = document.createElement('th');
     totalAmount = totalAmount + parseFloat(amountInput.value);
     newCell6.textContent = totalAmount;
     newCell6.classList.add('item');

     var newCell3 = document.createElement('th');
     averagePrice = totalAmount / totalUnit;
     newCell3.textContent = averagePrice.toFixed(3);
     newCell3.classList.add('item');

     newRow.appendChild(newCell1);
     newRow.appendChild(newCell2);
     newRow.appendChild(newCell3);
     newRow.appendChild(newCell4);
     newRow.appendChild(newCell5);
     newRow.appendChild(newCell6);

     table.appendChild(newRow);
     numRow++;
     //var newRow = table.insertRow(table.ariaRowSpan.length);
}

theform.addEventListener('submit', function (event) {
     event.preventDefault();
});
