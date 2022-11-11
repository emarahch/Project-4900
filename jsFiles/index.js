
// Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// // Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
// Parse.initialize(
//   "rspognStfNV37CQa4LHoJxZReWuNU1iXKgPyOVv2", // This is your Application ID
//   "ARHVg2q79aHYce2i4rov3RDm6Z4LMvPckfwggh6T" // This is your Javascript key
// );


//REMOVE COMMENT WHEN TESTING
//If having trouble with parse, check if there is an update


//Tutorial tooltip
tippy('#tutorialbutton', {
  content: 'Hello, Welcome to <span style="color:pink;">HabitBipity</span>!<img src="../images/test2.png" style="width:60px;height:50px;"> <br> I am your helping guide "name, it is really nice to meet you. <br> This is a super easy productivy website to use, let me walk you through it ! <br> ~Create a new todo then add a priotiy and category labels <br> ~Create a new note <br>~Set a timer to give yourself a time frame to work in <br> ~Earn points for your efforts!/> ',
  placement: 'right',
  arrow: true,
  trigger:"click"
})

//For buttons
function mainProfilePage() {
  location.href = "../htmlFiles/ProfilePage.html";
}

function startPage() {
  location.href = "../htmlFiles/startPage.html";
}

//Theme changer
const themeChangeButton = document.getElementById("themeChangeButton");
themeChangeButton.addEventListener("click", themeChangerFunc);


function themeChangerFunc() {
  document.body.classList.toggle("darkMode");
}
//Getting the current date - MOVE TO LOADER FUNCTION
var date = (new Date()).toString().split(' ').splice(0,4).join(' ');
document.getElementById("currentDate").innerHTML = date;

//Creating an account
function preCreate() {
  var charry = "";
  var charaName = document.getElementsByName("chara");
  for (var i = 0, length = charaName.length; i < length; i++) {
    if (charaName[i].checked) {
      alert(charaName[i].value);
      charry = charaName[i].value;
      break;
    }
  }
  create(charry);
}

function create(charry) {
  var user = new Parse.User();
  user.set("username", document.getElementById("userName_field").value);
  user.set("email", document.getElementById("email_field").value);
  user.set("password", document.getElementById("password_field").value);
  user.set("chara", charry);

  // Call the save method, which returns the saved object if successful
  user
    .signUp()
    .then(function (user) {
      mainProfilePage();
    })
    .catch(function (error) {
      window.alert("Error: " + error.code + " " + error.message);
    });
}


//logging into account
function login() {
  var user = Parse.User.logIn(
    document.getElementById("email_field").value,
    document.getElementById("password_field").value
  )
    .then(function (user) {
      mainProfilePage();
    })
    .catch(function (error) {
      window.alert("Error: " + error.code + " " + error.message);
    });
}

//logging out of account
const logoutButton = document.querySelector(".logoutButton");
logoutButton.addEventListener("click",startPage);

//Body will call this upon loading the page
function loader() {
  Parse.User.enableUnsafeCurrentUser();
  const currentUser = Parse.User.current();
  const refUse = currentUser.get("username");
  const userI = currentUser.get("chara");
  const userScore = currentUser.get("score");
  document.getElementById("welcome").innerHTML = "Hey! " + refUse;
  document.getElementById("userPlay").src = userI;
  document.getElementById("scoreEle").innerHTML = userScore; // working on, bc it returns undefined
}

//Showing and hiding the form for adding a todo
const createTodoShowBtn = document.getElementById("createTodoShowBtn");

createTodoShowBtn.addEventListener("click", () => {
  const divform = document.getElementById("divToCreateForm");

  if (divform.style.display === "block") {
    // HIDES the form
    divform.style.display = "none";
  } else {
    //  SHOWS the form
    divform.style.display = "block";
  }
});



// //Showing and hiding the form for adding a note
const createNoteShowBtn = document.getElementById("createNoteShowBtn");

createNoteShowBtn.addEventListener("click", () => {
  const divform = document.getElementById("divToCreateNote");

  if (divform.style.display === "block") {
    //  HIDES the form
    divform.style.display = "none";
  } else {
    //  SHOWS the form
    divform.style.display = "block";
  }
});



//Adding New Todo's to the DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todoButton.addEventListener("click", storeTODO);
todoList.addEventListener("click", deleteCheck);

function addTodo(idd) {
  var categoryNumberUser = document.getElementById("categoryNumber");
  var prNumberUser = document.getElementById("priorityNumber");
  var textPr = prNumberUser.options[prNumberUser.selectedIndex].value;
  var textCa = Array.from(categoryNumberUser.selectedOptions).map(
    (x) => x.value ?? x.text
  );
  // preventDefault();
  alert(textPr);
  const toDoDiv = document.createElement("div");
  toDoDiv.setAttribute("class", "IndToDo");
  toDoDiv.setAttribute("id", idd);
  toDoDiv.setAttribute("value", "OFF"); //what does this do agaib?
  toDoDiv.classList.add("todo");

  //adding the title, priority, and catergory to the todo on screen
  const newToDo = document.createElement("li");
  newToDo.innerText = todoInput.value;
  newToDo.classList.add("todo-item");
  toDoDiv.appendChild(newToDo);

  const newToDoP = document.createElement("li");
  newToDoP.innerText = textPr;
  newToDoP.classList.add("todo-item");
  toDoDiv.appendChild(newToDoP);

  const newToDoC = document.createElement("li");
  newToDoC.innerText = textCa;
  newToDoC.classList.add("todo-item");
  toDoDiv.appendChild(newToDoC);

  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.classList.add("edit-btn");
  toDoDiv.appendChild(editButton);

  const completedButton = document.createElement("button");
  completedButton.innerText = "done";
  completedButton.classList.add("complete-btn");
  toDoDiv.appendChild(completedButton);

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "trash";
  cancelButton.classList.add("cancel-btn");
  toDoDiv.appendChild(cancelButton);

  //add to list
  todoList.appendChild(toDoDiv);


  todoInput.value = "";
}

//this stores new Todo to parse
function storeTODO(event) {
  //This is for getting the priority level and the categories
  var prNumberUser = document.getElementById("priorityNumber");
  var categoryNumberUser = document.getElementById("categoryNumber");
  var textPr = prNumberUser.options[prNumberUser.selectedIndex].value;
  var textCa = Array.from(categoryNumberUser.selectedOptions).map(
    (x) => x.value ?? x.text
  );
  //this is where storing actuallu happens
  event.preventDefault();
  (async () => {
    const newTodo2 = new Parse.Object("ToDo");
    newTodo2.set("User", Parse.User.current());
    newTodo2.set("title", document.querySelector(".todo-input").value);
    newTodo2.set("isCompleted", false);
    newTodo2.set("priority", textPr);
    newTodo2.set("category", textCa);

    try {
      const result = await newTodo2.save();
      console.log("ToDo created", result);
    } catch (error) {
      console.error("Error while creating ToDo: ", error);
    }

    ob = newTodo2.id;
    // window.alert(ob);// works
    addTodo(ob);
  })();
}
//this updates parse for task deletion
function deleteToDoStore(idd) {
  (async () => {
    const query = new Parse.Query("ToDo");
    try {
      // here you put the objectId that you want to delete
      const object = await query.get(idd);
      try {
        const response = await object.destroy();
        console.log("Deleted ParseObject", response);
      } catch (error) {
        console.error("Error while deleting ParseObject", error);
      }
    } catch (error) {
      console.error("Error while retrieving ParseObject", error);
    }
  })();
}

//this updates parse for task completion
function completedStore(idd) {
  (async () => {
    const query = new Parse.Query("ToDo");
    try {
      // here you put the objectId that you want to update
      const object = await query.get(idd);
      //this is so the user can toggle multiple times for the same task
      meow = object.get("isCompleted");
      if (meow == false) {
        object.set("isCompleted", true);
      }
      if (meow == true) {
        object.set("isCompleted", false);
      }
      try {
        const response = await object.save();
      } catch (error) {
        console.error("Error while updating ", error);
      }
    } catch (error) {
      console.error("Error while retrieving object ", error);
    }
  })();
}

function deleteCheck(event) {
  const item = event.target;
  if (item.classList[0] === "cancel-btn") {
    const todo = item.parentElement;
    todo.remove();
    deleteToDoStore(todo.getAttribute("id"));
  }

  //I have it whhere the user can click button multuple times, bc people make mistakes 
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    completedStore(todo.getAttribute("id"));
  }

  if (item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    alert("You are in Edit mode: Not functional yes!");
    completedStore(todo.getAttribute("id"));
  }
}

// //Testing trying to get old stuff...
// const getterButton = document.querySelector(".random");
// getterButton.addEventListener("click", retrieveTodos);

// //needs aync bc of await
// async function retrieveTodos() {
//   Parse.User.enableUnsafeCurrentUser();
//   const currentUser = Parse.User.current();

//   const GameScore = Parse.Object.extend("ToDo");
//   var query = new Parse.Query(GameScore);
//   query.include("User");
//   query.equalTo("User", currentUser);

//   query.find({
//     //Having trouble making this fully work
//     success: function (results) {
//       window.alert("Successfully retrieved " + results.length + " scores."); //this does nothiung?
//       console.log("??");
//     },

//     error: function (error) {
//       // error is an instance of Parse.Error.
//       window.alert("problem" + error);
//     },
//   });
//   // window.alert("hello");
// }

// function pasteToDo(results) {
//   for (let i = 0; i < results.length; i++) {
//     const object = results[i];
//     alert(object.id + " - " + object.get("User"));
//   }
// }

//left on minute 48 for filter to do!

//NOTES SECTION//

const saveButtonNotes = document.querySelector(".btn-save");
const clearButtonNotes = document.querySelector(".btn-clear");
const notesList = document.querySelector(".notes-list");
const notesInput = document.querySelector(".body-field");
const notesTitle = document.querySelector(".title-field");

saveButtonNotes.addEventListener("click", storeNote);
clearButtonNotes.addEventListener("click", clearNote);
notesList.addEventListener("click", deleteNote);

function addNote(ob2) {
  // preventDefault();
  const notesDiv = document.createElement("div");
  notesDiv.setAttribute("id", ob2);
  // toDoDiv.setAttribute("value", "OFF")
  notesDiv.classList.add("note");

  const noteTitle = document.createElement("li");
  noteTitle.innerText = notesTitle.value;
  noteTitle.classList.add("titleOut");
  notesDiv.appendChild(noteTitle);

  const newNote = document.createElement("li");
  newNote.innerText = notesInput.value;
  newNote.classList.add("note-item");
  notesDiv.appendChild(newNote);

  // const timeCreated = document.createElement("li");
  // timeCreated.innerText = formatTime();
  // timeCreated.classList.add("timeCreatedOutput");
  // notesDiv.appendChild(timeCreated);

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "delete";
  cancelButton.classList.add("cancel-btn");
  notesDiv.appendChild(cancelButton);

  //add to list
  notesList.appendChild(notesDiv);

  // window.alert(toDoDiv.getAttribute("id"))// workdeleteNote
  //clear inout value

  notesInput.value = "";
  notesTitle.value = "";
}

function storeNote(event) {
  window.alert("works");
  //this is where storing actuallu happens
  event.preventDefault();
  (async () => {
    const newNote = new Parse.Object("Notes");
    newNote.set("User", Parse.User.current());
    newNote.set("title", document.querySelector(".title-field").value);
    newNote.set("NoteBody", document.querySelector(".body-field").value);
    try {
      const result = await newNote.save();
      console.log("Note created", result);
    } catch (error) {
      console.error("Error while creating note: ", error);
    }
    ob2 = newNote.id;
    // window.alert(ob2); // works
    addNote(ob2);
  })();
  //   window.alert("works");
}


function deleteNoteStore(noteId) {
  (async () => {
    const query = new Parse.Query("Notes");
    try {
      // here you put the objectId that you want to delete
      const object = await query.get(noteId);
      try {
        const response = await object.destroy();
        console.log("Deleted ParseObject", response);
      } catch (error) {
        console.error("Error while deleting ParseObject", error);
      }
    } catch (error) {
      console.error("Error while retrieving ParseObject", error);
    }
  })();
}

function clearNote(event) {
  notesInput.value = "";
  notesTitle.value = "";
}

function deleteNote(event) {
  const item = event.target;
  if (item.classList[0] === "cancel-btn") {
    const note = item.parentElement;
    note.remove();
    deleteNoteStore(note.getAttribute("id"))
  }
}


//Delete account section
//This deletes the user, but does not delete their items....should I do pointers or relations?
const deleteAccountButton= document.querySelector(".deleteAccountButton");
deleteAccountButton.addEventListener("click",areYouSureDelete);

function areYouSureDelete(){
  var result = confirm("Are you sure you want to delete? All of your information will be lost :(");
    if(result){
      alert("deleted");
      deleteAccountStore();
    }
}


//need to have it so all their info is deleted too
function deleteAccountStore(){
  (async () => {
    const currentUser = Parse.User.current();
    const User = new Parse.User();
    const query = new Parse.Query(User);
    alert(currentUser.id);
  
    try {
      // Finds the user by its ID
      let user = await query.get(currentUser.id);
      try {
        // Invokes the "destroy" method to delete the user
        alert("destroyyed");
        let response = await user.destroy();
        console.log('Deleted user', response);
      } catch (error) {
        console.error('Error while deleting user', error);
      }
    } catch (error) {
      console.error('Error while retrieving user', error);
    }

    startPage(); 
  })();

}




//Timer Section
var session=25;
const sessionMax = 60;
const sessionMin=5;

const timerMinutes=document.getElementById("timerMinutes");
const timerSeconds=document.getElementById("timerSeconds")
const increaseMinutes= document.getElementById("increaseMinutes");
const decreaseMinutes= document.getElementById("decreaseMinutes");



const  timerStartButton= document.getElementById("timerStartButton");
const timerPauseButton= document.getElementById("timerPauseButton");
const timerClearButton= document.getElementById("timerClearButton");


increaseMinutes.addEventListener("click",increaseMFunc);
decreaseMinutes.addEventListener("click",decreaseMFunc);



timerStartButton.addEventListener("click",getTotalTimeS);
timerPauseButton.addEventListener("click",pauseTimer);
timerClearButton.addEventListener("click",clearTimer);






function increaseMFunc(){
  if (session+5<=sessionMax){
session=session+=5;
timerMinutes.innerHTML= session;
  }
}


function decreaseMFunc(){
    if (session-5>=sessionMin){
      session=session-=5;
      timerMinutes.innerHTML= session;
    }
  }

 
  let intervalState;
  var minutes;
  var totalTimeS;//Total time..
  isPaused=false;

 function getTotalTimeS(){
  if(isPaused===false){
  minutes=parseInt(session);
  totalTimeS=Math.floor(minutes*60);
  startTimer();
  }else{
  isPaused===false;
  totalTimeS=totalTimeS;
  startTimer();
  }
}

function startTimer(){
  if(!intervalState){
    intervalState=setInterval(timerIncrements,1000)
    increaseMinutes.disabled = true;
    decreaseMinutes.disabled = true;
    timerStartButton.disabled = true;
  }
}

function timerIncrements(){
  if(totalTimeS===0){
    clearInterval(intervalState);
    intervalState = null
    timerMinutes.innerHTML="25";
    timerSeconds.innerHTML="00";
    session=5;
    alert("Done");
    }else{
   timerMinutes.innerHTML=Math.floor(totalTimeS/60);
if(Math.floor(totalTimeS%60)<10){
  timerSeconds.innerHTML="0"+ Math.floor(totalTimeS%60);
}else{ timerSeconds.innerHTML=(Math.floor(totalTimeS%60));}
   totalTimeS-=1;
    }


}

function pauseTimer(){ 
  totalTimeS=totalTimeS;
  isPaused=true;
  clearInterval(intervalState);
  intervalState = null;
  timerStartButton.disabled = false;
}

function clearTimer(){
  clearInterval(intervalState);
  intervalState = null;
  isPaused=false;

  timerMinutes.innerHTML="25";
  timerSeconds.innerHTML="00";
  session=25;

  increaseMinutes.disabled = false;
  decreaseMinutes.disabled = false;
  timerStartButton.disabled = false;
}









