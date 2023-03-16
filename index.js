const wrapper = document.getElementById("wrapper");

/*
const loginPopBut = document.getElementById("loginPopBut");

loginPopBut.addEventListener('click',()=>{
     wrapper.classList.add('active-popup');
})*/

function popLogin(){
     wrapper.classList.add('active-popup');
    
}

function closeLogin(){
     wrapper.classList.remove('active-popup');
}