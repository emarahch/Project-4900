//this file is just for testing, i plan on integrating this with the main file

//timer STUFF

const setHours=document.getElementById("setHours");
const setMinutes=document.getElementById("setMinutes");
const increaseHours= document.getElementById("increaseHours");
const decreaseHours= document.getElementById("decreaseHours");


increaseHours.addEventListener("click",increaseHFunc);
decreaseHours.addEventListener("click",decreaseHFunc);

var session=30;
const sessionMax = 60;
const sessionMin=0;

function increaseHFunc(){
  if (session!=sessionMax){
session=session+=1;
setHours.innerHTML= session;
  }
}


function decreaseHFunc(){
    if (session!=sessionMin){
      session=session-=1;
      setHours.innerHTML= session;
    }
  
  }
