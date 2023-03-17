const price = document.getElementById('price');
const amount = document.getElementById("amount");
const calunit = document.getElementById("calunit");

const tprice = document.getElementById('tprice');
const tamount = document.getElementById("tamount");
const avgLabel = document.getElementById("avgLabel");

const avgform = document.getElementById("avgform");

var punit;

function rumble(){
    var i = amount.value
    var j = price.value
    var x = i/j
    punit = x
    calunit.textContent = "Unit: "+x.toFixed(5);
}

function calPrice(){
    var i = tamount.value
    var j = tprice.value
    var x = i/j

    var totalAmount = parseInt(i) + parseInt(amount.value)
    var totalUnit = x + punit

    console.log(totalUnit)
    console.log(totalAmount)

    var avg = totalAmount / totalUnit
    avgLabel.textContent = "Average Price: "+avg.toFixed(2);

}

avgform.addEventListener("submit",function(event){
    event.preventDefault();
})