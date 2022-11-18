Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  "rspognStfNV37CQa4LHoJxZReWuNU1iXKgPyOVv2", // This is your Application ID
  "ARHVg2q79aHYce2i4rov3RDm6Z4LMvPckfwggh6T" // This is your Javascript key
);



// REMOVE COMMENT WHEN TESTING
// If having trouble with parse, check if there is an update

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  loader()
});

//Tutorial tooltip
tippy("#tutorialbutton", {
  content:
    'Hello, Welcome to <span style="color:pink;">HabitBipity</span>!<img src="../images/test2.png" style="width:60px;height:50px;"> <br> I am your helping guide "name, it is really nice to meet you. <br> This is a super easy productivy website to use, let me walk you through it ! <br> ~Create a new todo then add a priotiy and category labels <br> ~Create a new note <br>~Set a timer to give yourself a time frame to work in <br> ~Earn points for your efforts!/> ',
  placement: "right",
  arrow: true,
  trigger: "click",
});

//multislect
new SlimSelect({
  select: '#categoryNumber'
})
//prority label
new SlimSelect({
select: '#priorityNumber'
})

//Progress Bar
var bar1 = new ldBar(".ldBar");
var bar2 = document.getElementById('bar').ldBar;
bar1.set(80);




//For buttons
function mainProfilePage() {
  location.href = "../html/profile-page.html";
}

function startPage() {
  location.href = "../index.html";
}

//Theme changer
const themeChangeButton = document.getElementById("themeChangeButton");
themeChangeButton.addEventListener("click", themeChangerFunc);

function themeChangerFunc() {
  document.body.classList.toggle("darkMode");
}
//Getting the current date - MOVE TO LOADER FUNCTION
var date = new Date().toString().split(" ").splice(0, 4).join(" ");
document.getElementById("currentDate").innerHTML = date;

//Creating an account
function preCreate() {
  var charry = "";
  var charaName = document.getElementsByName("chara");
  for (var i = 0, length = charaName.length; i < length; i++) {
    if (charaName[i].checked) {
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
  user.set("score", 0);
  user.set("level", 1);
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
logoutButton.addEventListener("click", startPage);



//This is so i can get the SCORE back in real time....should i do asyn on other functions???
//Maybe I can do this in a dif place... this file is getting large lol

function upScoreRealTime(){
  Parse.User.enableUnsafeCurrentUser();
  const currentUser = Parse.User.current();
  (async () => {
    const query = new Parse.Query("User");
    try {
      const object = await query.get(currentUser.id);
      try {
        var userScore = object.get("score");
        var userLevel= object.get("level");

      } catch (error) {
        console.error("Error while hehe ParseObject", error);
      }
    } catch (error) {
      console.error("Error while retrieving ParseObject", error);
    }
    document.getElementById("scoreEle").innerHTML = userScore; 
    document.getElementById("levelEle").innerHTML = userLevel; 
    //works for getting coreect
    
    bar1.set(scoringMath(userScore));
  })();
  
}

//Showing and hiding the form for adding a todo
const createTodoShowBtn = document.getElementById("createTodoShowBtn");

createTodoShowBtn.addEventListener("click", () => {
  const divform = document.getElementById("divToCreateForm");

  if (divform.style.display === "block") {
    // HIDES the form
    divform.style.display = "none";
  } else {
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
      ob = newTodo2.id;
      addTodo(ob);
      console.log("ToDo created", result);
    } catch (error) {
      Toastify({
        text: "Error : Besite you need to add a title ",
        duration: 2500,
        style: {
          background: "linear-gradient(to right, #FF69B4, purple)",
        },
      }).showToast();
      console.error("Error while creating ToDo: ", error);
    }

   
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
  // I call current user a lot...maybe I can fix this?
  
  Parse.User.enableUnsafeCurrentUser();
  const currentUser = Parse.User.current();
  var userScore=currentUser.get("score");
  var userLevel=currentUser.get("level");
  (async () => {
    const query = new Parse.Query("ToDo");
    try {
      // here you put the objectId that you want to update
      const object = await query.get(idd);
      //this is so the user can toggle multiple times for the same task
      meow = object.get("isCompleted");
      if (meow == false) {
        object.set("isCompleted", true);
        userScore+=5; //chnage just for testing
        currentUser.set("score",userScore);
        //changes the score real time for the user to see
        bar1.set(scoringMath(userScore));

        //Updates level real time
        if(scoringMath(userScore)===0){
        currentUser.set("level",levelMath(userLevel,userScore));
        document.getElementById("levelEle").innerHTML =levelMath(userLevel,userScore);
        }
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
  })()
 
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
    alert("You are in Edit mode: Not functional yet!");
    // completedStore(todo.getAttribute("id"));
  }
}



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

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "delete";
  cancelButton.classList.add("cancel-btn");
  notesDiv.appendChild(cancelButton);

  //add to list
  notesList.appendChild(notesDiv);


  notesInput.value = "";
  notesTitle.value = "";
}

function storeNote(event) {
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
      ob2 = newNote.id;
      addNote(ob2);
    } catch (error) {
      Toastify({
        text: "Error : Besite you need to add a title and body",
        duration: 2500,
        style: {
          background: "linear-gradient(to right, #FF69B4, purple)",
        },
      }).showToast();
      console.error("Error while creating note: ", error);
    }
   
  })();
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
    deleteNoteStore(note.getAttribute("id"));
  }
}

//Delete account section
//This deletes the user, but does not delete their items....should I do pointers or relations?
const deleteAccountButton = document.querySelector(".deleteAccountButton");
deleteAccountButton.addEventListener("click", areYouSureDelete);

function areYouSureDelete() {
  var result = confirm(
    "Are you sure you want to delete? All of your information will be lost :("
  );
  if (result) {
    alert("deleted");
    deleteAccountStore();
  }
}

//Can I combine these async calls?? This is MESSY
function deleteAccountStore() {

  (async () => {
    const currentUser = Parse.User.current();
  
    var query = new Parse.Query("ToDo");
    query.include("User");
    query.equalTo("User", currentUser);
    try {
      const results = await query.find();
      for (const object of results) {
        await object.destroy();
      }
    } catch (error) {
      console.error('Error while fetching ToDo', error);
    }
  
    })();

    (async () => {
      const currentUser = Parse.User.current();
    
      var query = new Parse.Query("Notes");
      query.include("User");
      query.equalTo("User", currentUser);
      try {
        const results = await query.find();
        for (const object of results) {
          await object.destroy();
        }
      } catch (error) {
        console.error('Error while fetching note', error);
      }
    
      })();


  (async () => {
    const currentUser = Parse.User.current();
    const User = new Parse.User();
    const query = new Parse.Query(User);

    try {
      // Finds the user by its ID
      let user = await query.get(currentUser.id);
      try {
        // Invokes the "destroy" method to delete the user
        let response = await user.destroy();
        console.log("Deleted user", response);
      } catch (error) {
        console.error("Error while deleting user", error);
      }
    } catch (error) {
      console.error("Error while retrieving user", error);
    }

    startPage();
  })();
}

//Timer Section
var session = 25;
const sessionMax = 60;
const sessionMin = 5;

const timerMinutes = document.getElementById("timerMinutes");
const timerSeconds = document.getElementById("timerSeconds");
const increaseMinutes = document.getElementById("increaseMinutes");
const decreaseMinutes = document.getElementById("decreaseMinutes");

const timerStartButton = document.getElementById("timerStartButton");
const timerPauseButton = document.getElementById("timerPauseButton");
const timerClearButton = document.getElementById("timerClearButton");

increaseMinutes.addEventListener("click", increaseMFunc);
decreaseMinutes.addEventListener("click", decreaseMFunc);

timerStartButton.addEventListener("click", getTotalTimeS);
timerPauseButton.addEventListener("click", pauseTimer);
timerClearButton.addEventListener("click", clearTimer);

function increaseMFunc() {
  if (session + 5 <= sessionMax) {
    session = session += 5;
    timerMinutes.innerHTML = session;
  }
}

function decreaseMFunc() {
  if (session - 5 >= sessionMin) {
    session = session -= 5;
    timerMinutes.innerHTML = session;
  }
}

let intervalState;
var minutes;
var totalTimeS; //Total time..
isPaused = false;

function getTotalTimeS() {
  if (isPaused === false) {
    minutes = parseInt(session);
    totalTimeS = Math.floor(minutes * 60);
    startTimer();
  } else {
    isPaused === false;
    totalTimeS = totalTimeS;
    startTimer();
  }
}

function startTimer() {
  if (!intervalState) {
    intervalState = setInterval(timerIncrements, 1000);
    increaseMinutes.disabled = true;
    decreaseMinutes.disabled = true;
    timerStartButton.disabled = true;
  }
}

function timerIncrements() {
  if (totalTimeS === 0) {
    clearInterval(intervalState);
    intervalState = null;
    timerMinutes.innerHTML = "25";
    timerSeconds.innerHTML = "00";
    session = 5;
    // alert("Done");
    Toastify({
      text: "Your timer is Done!",
      duration: 2500,
      style: {
        background: "linear-gradient(to right, #FF69B4, purple)",
      },
    }).showToast();

    increaseMinutes.disabled = false;
  decreaseMinutes.disabled = false;
  timerStartButton.disabled = false;
  } else {
    timerMinutes.innerHTML = Math.floor(totalTimeS / 60);
    if (Math.floor(totalTimeS % 60) < 10) {
      timerSeconds.innerHTML = "0" + Math.floor(totalTimeS % 60);
    } else {
      timerSeconds.innerHTML = Math.floor(totalTimeS % 60);
    }
    totalTimeS -= 1;
  }
}

function pauseTimer() {
  totalTimeS = totalTimeS;
  isPaused = true;
  clearInterval(intervalState);
  intervalState = null;
  timerStartButton.disabled = false;
}

function clearTimer() {
  clearInterval(intervalState);
  intervalState = null;
  isPaused = false;

  timerMinutes.innerHTML = "25";
  timerSeconds.innerHTML = "00";
  session = 25;

  increaseMinutes.disabled = false;
  decreaseMinutes.disabled = false;
  timerStartButton.disabled = false;
}






//Body will call this upon loading the page
function loader() {
  Parse.User.enableUnsafeCurrentUser();
  const currentUser = Parse.User.current();
  const refUse = currentUser.get("username");
  const userI = currentUser.get("chara");
  document.getElementById("welcome").innerHTML = "Hey! " + refUse;
  document.getElementById("userPlay").src = userI;
  upScoreRealTime();
  retrieveTodos();
  retrieveNotes();
}







//Getting old stuff, called by loader
//this works!!!!
//for loops makes things slower thouf=gh...
function retrieveTodos() {
  (async () => {
  Parse.User.enableUnsafeCurrentUser();
  const currentUser = Parse.User.current();

  var query = new Parse.Query("ToDo");
  query.include("User");
  query.equalTo("User", currentUser);
  try {
    const results = await query.find();
    for (const object of results) {
      const objectId=object.id;
      const title = object.get('title');
      const isCompleted =  object.get("isCompleted");
      const priority=object.get("priority");
      const category=object.get("category");

      addOldToDo(objectId,title,isCompleted,priority,category);
    
    }
  } catch (error) {
    console.error('Error while fetching ToDo', error);
  }

  })();
}


function addOldToDo(objectId,title,isCompleted,priority,category) {

  const toDoDiv = document.createElement("div");
  toDoDiv.setAttribute("class", "IndToDo");
  toDoDiv.setAttribute("id", objectId);
  // toDoDiv.setAttribute("value", "OFF"); //what does this do agaib?
  toDoDiv.classList.add("todo");

  //adding the title, priority, and catergory to the todo on screen
  const newToDo = document.createElement("li");
  newToDo.innerText = title;
  newToDo.classList.add("todo-item");
  toDoDiv.appendChild(newToDo);

  const newToDoP = document.createElement("li");
  newToDoP.innerText = priority;
  newToDoP.classList.add("todo-item");
  toDoDiv.appendChild(newToDoP);

  const newToDoC = document.createElement("li");
  newToDoC.innerText = category;
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

  if(isCompleted==true){
    toDoDiv.classList.toggle("completed");
  }
  //add to list
  todoList.appendChild(toDoDiv);


  
}


function retrieveNotes() {
  (async () => {
  Parse.User.enableUnsafeCurrentUser();
  const currentUser = Parse.User.current();

  var query = new Parse.Query("Notes");
  query.include("User");
  query.equalTo("User", currentUser);
  try {
    const results = await query.find();
    for (const object of results) {
      const objectId=object.id;
      const title = object.get('title');
      const NoteBody =  object.get("NoteBody");
      addOldNote(objectId,title,NoteBody);
    
    }
  } catch (error) {
    console.error('Error while fetching ToDo', error);
  }

  })();
}


function addOldNote(objectId,title,NoteBody) {
  // preventDefault();
  const notesDiv = document.createElement("div");
  notesDiv.setAttribute("id", objectId);
  // toDoDiv.setAttribute("value", "OFF")
  notesDiv.classList.add("note");

  const noteTitle = document.createElement("li");
  noteTitle.innerText = title;
  noteTitle.classList.add("titleOut");
  notesDiv.appendChild(noteTitle);

  const newNote = document.createElement("li");
  newNote.innerText = NoteBody;
  newNote.classList.add("note-item");
  notesDiv.appendChild(newNote);

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "delete";
  cancelButton.classList.add("cancel-btn");
  notesDiv.appendChild(cancelButton);

  //add to list
  notesList.appendChild(notesDiv);

}

//LEVEL AND SCORING functions
function scoringMath(userScore){
  var lastDigits=Math.floor(userScore% 100);
  if(lastDigits==0){
  bar1.set(0);
   }  else{
    bar1.set(lastDigits);
   }
return lastDigits;
}

function levelMath(userLevel,userScore){
  var gettingFirstNumb=Math.floor(userScore/100);
  if((gettingFirstNumb)>=1){//do i need this if statement?
  for(let i=0; i<gettingFirstNumb;i++){ ///this might cause a problem honestly
    userLevel+=1;
   }
  }
  return userLevel;
}
