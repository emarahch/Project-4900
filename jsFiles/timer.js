//this file is just for testing, i plan on integrating this with the main file

//timer STUFF

const setHours=document.getElementById("setHours");
const setMinutes=document.getElementById("setMinutes");
const increaseHours= document.getElementById("increaseHours");
const decreaseHours= document.getElementById("decreaseHours");

const increaseMinutes= document.getElementById("increaseMinutes");
const decreaseMinutes= document.getElementById("decreaseMinutes");

increaseHours.addEventListener("click",increaseHFunc);
decreaseHours.addEventListener("click",decreaseHFunc);
increaseMinutes.addEventListener("click",increaseMFunc);
decreaseMinutes.addEventListener("click",decreaseMFunc);

function increaseHFunc(){
  alert("clcikeS");
setHours.innerHTML= "1";
}


function decreaseHFunc(){
    alert("clcikeeeeS");
  setHours.innerHTML= "0";
  }


  function increaseMFunc(){
    alert("clcikeS");
    setMinutes.innerHTML= "1";
  }
  
  
  function decreaseMFunc(){
      alert("clcikeeeeS");
      setMinutes.innerHTML= "0";
    }