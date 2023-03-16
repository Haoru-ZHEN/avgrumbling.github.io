const tradebut = document.getElementById("tradebut");
const fomoBox = document.getElementById("fomo");
const boxBox = document.getElementById("box");
const numBox = document.getElementById("num");
const wrapper = document.getElementById("wrapper");
/*
tradebut.onclick = function(){
     if(fomoBox.checked && boxBox.checked && numBox.checked){
          tradebut.classList.remove("disable"); 
     }else{
          tradebut.classList.add("disable"); 
     }
     
}*/

function checking(){
     if(fomoBox.checked && boxBox.checked && numBox.checked){
          tradebut.classList.remove("disable"); 
          tradebut.textContent = "Continue";
     }else{
          tradebut.classList.add("disable"); 
     }
}




function popBox(){
     if(tradebut.className !='disable'){
          wrapper.classList.add('active-popup');
     }
     
    
}

function closeBox(){
     wrapper.classList.remove('active-popup');
}
