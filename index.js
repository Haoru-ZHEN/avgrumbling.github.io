const firebaseConfig = {
     apiKey: "AIzaSyCvKsl6dpisURv3Yu7OMV37YyqBd2SWRok",
     authDomain: "welogin-ef928.firebaseapp.com",
     databaseURL: "https://welogin-ef928-default-rtdb.firebaseio.com",
     projectId: "welogin-ef928",
     storageBucket: "welogin-ef928.appspot.com",
     messagingSenderId: "882804397149",
     appId: "1:882804397149:web:6561bcc09af5130ae429b4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//get element
const wrapper = document.getElementById("wrapper");
const idInput = document.getElementById("idInput");
const pwdInput = document.getElementById("pwdInput");
const loginBut = document.getElementById("loginBut");
const theform = document.getElementById("theform");

//function
function popLogin(){
     wrapper.classList.add('active-popup');
    
}

function closeLogin(){
     wrapper.classList.remove('active-popup');
}

function login(){
     authenticate(idInput.value,pwdInput.value);
}

function authenticate(idget,phraseget){
     const dbref = firebase.database().ref();
     const thelist = dbref.child("steins;gate");
     //console.log(encryptPwd("始祖の巨人"));

     thelist.once("value",function(snapshot){
          thedata = snapshot.val();
          var id = snapshot.key;

          if(idget == id && phraseget == decryptPwd(thedata,idget)){
               //window.location.href = "/katawaredoki/time.html"
               window.open("katawaredoki/time.html");
          }
     })
}
/*
function encryptPwd(cipher){
     var pass12 = CryptoJS.AES.encrypt(cipher,"steins;gate"); //(text, key)
     return pass12.toString();
}*/

function decryptPwd(passphrase, thekey){
     var pass12 = CryptoJS.AES.decrypt(passphrase,thekey);
     return pass12.toString(CryptoJS.enc.Utf8);
}

theform.addEventListener("submit",function(event){
     event.preventDefault();
 })