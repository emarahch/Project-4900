Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  "rspognStfNV37CQa4LHoJxZReWuNU1iXKgPyOVv2", // This is your Application ID
  "ARHVg2q79aHYce2i4rov3RDm6Z4LMvPckfwggh6T" // This is your Javascript key
);

// REMOVE COMMENT WHEN TESTING
// If having trouble with parse, check if there is an update

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  loader();
});

//Tutorial tooltip
const tutuWords = document.getElementById("insideTutorial");
tippy("#tutorialbutton", {
  content: tutuWords.innerHTML,
  placement: "right",
  arrow: true,
  allowHTML: true,
  trigger: "click",
});

// const sortButtonTippy = document.getElementById('sortButtonTippy');
// tippy("#SortButtonsAll", {
//   content: sortButtonTippy.innerHTML,
//   interactive: true,
//   trigger: 'click',
//   allowHTML: true,
// });

//multislect
new SlimSelect({
  select: "#categoryNumber",
});

//filter notes
new SlimSelect({
  select: "#filterNotes",
});

//prority label
new SlimSelect({
  select: "#priorityNumber",
});

//filtertodo
new SlimSelect({
  select: "#filterTodo",
});

//multi for note cat
new SlimSelect({
  select: "#categoryNumberNotes",
});

//Progress Bar
var bar1 = new ldBar(".ldBar");
var bar2 = document.getElementById("bar").ldBar;
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

function upScoreRealTime() {
  Parse.User.enableUnsafeCurrentUser();
  const currentUser = Parse.User.current();
  (async () => {
    const query = new Parse.Query("User");
    try {
      const object = await query.get(currentUser.id);
      try {
        var userScore = object.get("score");
        var userLevel = object.get("level");
      } catch (error) {
        console.error("Error while hehe ParseObject", error);
      }
    } catch (error) {
      console.error("Error while retrieving ParseObject", error);
    }
    document.getElementById("levelEle").innerHTML = userLevel;
    //works for getting coreect

    bar1.set(scoringMath(userScore));
  })();
}

//showing and hiding sort by priority etc buttosn
const SortButtonsAll = document.getElementById("SortButtonsAll");
const sortButtonsDiv = document.getElementById("sortButtonsDiv");

SortButtonsAll.addEventListener("click", () => {
  if (sortButtonsDiv.style.display === "block") {
    // HIDES the form
    sortButtonsDiv.style.display = "none";
  } else {
    sortButtonsDiv.style.display = "block";
  }
});

//Showing and hiding nav bar
const showSideBar = document.getElementById("showSideBar");

showSideBar.addEventListener("click", () => {
  const divSideform = document.querySelector(".testNav");

  if (divSideform.style.display === "block") {
    // HIDES the form
    divSideform.style.display = "none";
  } else {
    divSideform.style.display = "block";
  }
});

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
  const toDoDivTextOnly = document.createElement("div");
  toDoDivTextOnly.setAttribute("class", "IndToDoTextOnly");

  toDoDiv.setAttribute("class", "IndToDo");
  toDoDiv.setAttribute("id", idd);
  toDoDiv.setAttribute("value", "OFF"); //what does this do agaib?
  toDoDiv.classList.add("todo");

  const completedButton = document.createElement("button");
  // completedButton.innerText = "✓";
  completedButton.classList.add("complete-btn");
  toDoDiv.appendChild(completedButton);

  //adding the title, priority, and catergory to the todo on screen
  const newToDo = document.createElement("li");
  newToDo.setAttribute("class", "IndTitle");
  newToDo.innerText = todoInput.value;
  newToDo.classList.add("todo-item");
  toDoDiv.appendChild(newToDo);

  const EditTitleButton = document.createElement("button");
  EditTitleButton.setAttribute("value", "Off");
  // EditTitleButton.innerText = "EditTitle";
  EditTitleButton.classList.add("EditTitle-btn");
  toDoDiv.appendChild(EditTitleButton);

  const newToDoP = document.createElement("li");
  newToDoP.setAttribute("class", "IndPriority");
  newToDoP.innerText = textPr;
  newToDoP.classList.add("todo-item");
  toDoDiv.appendChild(newToDoP);

  const newToDoC = document.createElement("li");
  newToDoC.setAttribute("class", "IndCategories");
  newToDoC.innerText = textCa;
  newToDoC.classList.add("todo-item");
  toDoDiv.appendChild(newToDoC);

  const cancelButton = document.createElement("button");
  // cancelButton.innerText = "trash";
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
  var userScore = currentUser.get("score");
  var userLevel = currentUser.get("level");
  (async () => {
    const query = new Parse.Query("ToDo");
    try {
      // here you put the objectId that you want to update
      const object = await query.get(idd);
      //this is so the user can toggle multiple times for the same task
      meow = object.get("isCompleted");
      if (meow == false) {
        object.set("isCompleted", true);
        userScore += 5; //chnage just for testing
        currentUser.set("score", userScore);
        //changes the score real time for the user to see
        bar1.set(scoringMath(userScore));

        //Updates level real time
        if (scoringMath(userScore) === 0) {
          currentUser.set("level", levelMath(userLevel, userScore));
          document.getElementById("levelEle").innerHTML = levelMath(
            userLevel,
            userScore
          );
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
  })();
}

//MOVE?
function editTextFunc(id) {
  // const paragraph = document.getElementById(id);
  const p = document.getElementById(id);
  paragraph = p.querySelector(".IndTitle");
  paragraph.contentEditable = true;
  paragraph.style.backgroundColor = "#dddbdb";
}

//need to fix the lay out fo this, maybe two try statements???
function stopEditText(id) {
  const p = document.getElementById(id);
  paragraph = p.querySelector(".IndTitle");
  paragraph.contentEditable = false;
  paragraph.style.backgroundColor = "#FFFFFF";
  editStoreTodo(id, paragraph.innerHTML);
}

function editStoreTodo(id, todoText) {
  (async () => {
    const query = new Parse.Query("ToDo");
    // try {
    // const object = await query.get(id);
    // object.set("title", todoText);

    try {
      const object = await query.get(id);
      object.set("title", todoText);
      const result = await object.save();
      // ob = newTodo2.id;
      // addTodo(ob);
      console.log("EDIT MADE", result);
    } catch (error) {
      // Toastify({
      //   text: "Error : Besite you need to add a title ",
      //   duration: 2500,
      //   style: {
      //     background: "linear-gradient(to right, #FF69B4, purple)",
      //   },
      // }).showToast();
      console.error("Error while creating ToDo: ", error);
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


  if (item.classList[0] === "EditTitle-btn") {
    const todo = item.parentElement;
    ObjectIdText = todo.getAttribute("id"); //Works

    if (item.getAttribute("value") == "Off") {
      item.classList.toggle("editingModeCancelIcon");
      editTextFunc(ObjectIdText);
      item.setAttribute("value", "On");
    } else if (item.getAttribute("value") == "On") {
      item.classList.toggle("editingModeNormalIcon");
      stopEditText(ObjectIdText);
      item.setAttribute("value", "Off");
    }

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
  var categoryNumberUser = document.getElementById("categoryNumberNotes");
  var textCa = Array.from(categoryNumberUser.selectedOptions).map(
    (x) => x.value ?? x.text
  );
  // preventDefault();
  const notesDiv = document.createElement("div");
  notesDiv.setAttribute("id", ob2);
  // toDoDiv.setAttribute("value", "OFF")
  notesDiv.classList.add("note");

  const ExpandButton = document.createElement("button");
  // ExpandButton.innerText = "expand";
  ExpandButton.classList.add("Expand-btn");
  notesDiv.appendChild(ExpandButton);

  const noteTitle = document.createElement("li");
  noteTitle.innerText = notesTitle.value;
  noteTitle.classList.add("titleOut");
  notesDiv.appendChild(noteTitle);

  const newNote = document.createElement("li");
  newNote.setAttribute("class", "bodyOut");
  newNote.innerText = notesInput.value;
  newNote.classList.add("note-item");
  notesDiv.appendChild(newNote);

  const noteCategory = document.createElement("li");
  noteCategory.setAttribute("class", "IndCategories");
  noteCategory.innerText = textCa;
  noteCategory.classList.add("category");
  notesDiv.appendChild(noteCategory);

 

  const cancelButton = document.createElement("button");
  // cancelButton.innerText = "delete";
  cancelButton.classList.add("cancel-btn");
  notesDiv.appendChild(cancelButton);

  //add to list
  notesList.appendChild(notesDiv);

  notesInput.value = "";
  notesTitle.value = "";
}

function storeNote(event) {
  var categoryNumberUser = document.getElementById("categoryNumberNotes");
  var textCa = Array.from(categoryNumberUser.selectedOptions).map(
    (x) => x.value ?? x.text
  );

  event.preventDefault();
  (async () => {
    const newNote = new Parse.Object("Notes");
    newNote.set("User", Parse.User.current());
    newNote.set("title", document.querySelector(".title-field").value);
    newNote.set("NoteBody", document.querySelector(".body-field").value);
    newNote.set("category", textCa);

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


  if (item.classList[0] === "Expand-btn") {
    const note = item.parentElement;
    note.classList.toggle("noteExpand");
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
      console.error("Error while fetching ToDo", error);
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
      console.error("Error while fetching note", error);
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
        const objectId = object.id;
        const title = object.get("title");
        const isCompleted = object.get("isCompleted");
        const priority = object.get("priority");
        const category = object.get("category");

        addOldToDo(objectId, title, isCompleted, priority, category);
      }
    } catch (error) {
      console.error("Error while fetching ToDo", error);
    }
  })();
}

function addOldToDo(objectId, title, isCompleted, priority, category) {
  const toDoDiv = document.createElement("div");
  toDoDiv.setAttribute("class", "IndToDo");
  toDoDiv.setAttribute("id", objectId);
  // toDoDiv.setAttribute("value", "OFF"); //what does this do agaib?
  toDoDiv.classList.add("todo");

  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn");
  toDoDiv.appendChild(completedButton);

  //adding the title, priority, and catergory to the todo on screen
  const newToDo = document.createElement("li");
  newToDo.setAttribute("class", "IndTitle");
  newToDo.innerText = title;
  newToDo.classList.add("todo-item");
  toDoDiv.appendChild(newToDo);

  const EditTitleButton = document.createElement("button");
  EditTitleButton.setAttribute("value", "Off");
  // EditTitleButton.innerText = "EditTitle";
  EditTitleButton.classList.add("EditTitle-btn");
  toDoDiv.appendChild(EditTitleButton);

  const newToDoP = document.createElement("li");
  newToDoP.setAttribute("class", "IndPriority");
  newToDoP.innerText = priority;
  newToDoP.classList.add("todo-item");
  toDoDiv.appendChild(newToDoP);

  const newToDoC = document.createElement("li");
  newToDoC.setAttribute("class", "IndCategories");
  newToDoC.innerText = category;
  newToDoC.classList.add("todo-item");
  toDoDiv.appendChild(newToDoC);

  const cancelButton = document.createElement("button");
  // cancelButton.innerText = "trash";
  cancelButton.classList.add("cancel-btn");
  toDoDiv.appendChild(cancelButton);

  if (isCompleted == true) {
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
        const objectId = object.id;
        const title = object.get("title");
        const NoteBody = object.get("NoteBody");
        const category = object.get("category");
        addOldNote(objectId, title, NoteBody, category);
      }
    } catch (error) {
      console.error("Error while fetching ToDo", error);
    }
  })();
}

function addOldNote(objectId, title, NoteBody, category) {
  // preventDefault();
  const notesDiv = document.createElement("div");
  notesDiv.setAttribute("id", objectId);
  // toDoDiv.setAttribute("value", "OFF")
  notesDiv.classList.add("note");


  const ExpandButton = document.createElement("button");
  // ExpandButton.innerText = "expand";
  ExpandButton.classList.add("Expand-btn");
  notesDiv.appendChild(ExpandButton);

  const noteTitle = document.createElement("li");
  noteTitle.innerText = title;
  noteTitle.classList.add("titleOut");
  notesDiv.appendChild(noteTitle);

  const newNote = document.createElement("li");
  newNote.setAttribute("class", "bodyOut");
  newNote.innerText = NoteBody;
  newNote.classList.add("note-item");
  notesDiv.appendChild(newNote);

  const noteCategory = document.createElement("li");
  noteCategory.setAttribute("class", "IndCategories");
  noteCategory.innerText = category;
  noteCategory.classList.add("note-item");
  notesDiv.appendChild(noteCategory);


  const cancelButton = document.createElement("button");
  // cancelButton.innerText = "delete";
  cancelButton.classList.add("cancel-btn");
  notesDiv.appendChild(cancelButton);

  //add to list
  notesList.appendChild(notesDiv);
}

//LEVEL AND SCORING functions
function scoringMath(userScore) {
  var lastDigits = Math.floor(userScore % 100);
  if (lastDigits == 0) {
    bar1.set(0);
  } else {
    bar1.set(lastDigits);
  }
  return lastDigits;
}

function levelMath(userLevel, userScore) {
  var gettingFirstNumb = Math.floor(userScore / 100);
  if (gettingFirstNumb >= 1) {
    //do i need this if statement?
    for (let i = 0; i < gettingFirstNumb; i++) {
      ///this might cause a problem honestly
      userLevel += 1;
    }
  }
  return userLevel;
}

// // ///edit mode button that shows trash button and makes tect editabkle...
//is there a way to improve how this looks??
const editButtonTrash = document.getElementById("editButton");
editButtonTrash.addEventListener("click", () => {
  var trashList = document.querySelectorAll(".cancel-btn");
  for (let i = 0; i < trashList.length; i++) {
    if (trashList[i].style.display === "block") {
      // HIDES the form
      trashList[i].style.display = "none";
    } else {
      trashList[i].style.display = "block";
    }
  }

  var editTitleList = document.querySelectorAll(".EditTitle-btn");
  for (let i = 0; i < editTitleList.length; i++) {
    if (editTitleList[i].style.display === "block") {
      // HIDES the form
      editTitleList[i].style.display = "none";
    } else {
      editTitleList[i].style.display = "block";
    }
  }
});

//Sorting todos based on priority
//this works!
const sortButton = document.getElementById("sortButton");
sortButton.addEventListener("click", () => {
  var numbersToSort = document.querySelector(".todo-list").children;
  numbersToSort = Array.prototype.slice.call(numbersToSort, 0);

  if (sortButton.innerHTML == "sortPriorityInc") {
    numbersToSort.sort(function (a, b) {
      ab = a.querySelector(".todo-item.IndPriority");
      ba = b.querySelector(".todo-item.IndPriority");
      return ab.innerHTML > ba.innerHTML;
    });
    var parent = document.querySelector(".todo-list");
    parent.innerHTML = "";

    for (var i = 0, l = numbersToSort.length; i < l; i++) {
      parent.appendChild(numbersToSort[i]);
    }
    sortButton.innerHTML = "sortPriorityDec";
  } else if (sortButton.innerHTML == "sortPriorityDec") {
    numbersToSort.sort(function (a, b) {
      ab = a.querySelector(".todo-item.IndPriority");
      ba = b.querySelector(".todo-item.IndPriority");
      return ba.innerHTML > ab.innerHTML;
    });
    var parent = document.querySelector(".todo-list");
    parent.innerHTML = "";

    for (var i = 0, l = numbersToSort.length; i < l; i++) {
      parent.appendChild(numbersToSort[i]);
    }
    sortButton.innerHTML = "sortPriorityInc";
  }
});

//filtering todo section
const sortCategoryButtonTodo = document.getElementById(
  "sortCategoryButtonTodo"
);
sortCategoryButtonTodo.addEventListener("click", () => {
  const divToSelectFilterFormToDo = document.getElementById(
    "divToSelectFilterFormToDo"
  );

  if (divToSelectFilterFormToDo.style.display === "block") {
    // HIDES the form
    divToSelectFilterFormToDo.style.display = "none";
  } else {
    divToSelectFilterFormToDo.style.display = "block";
  }
});

//filtering notes section
const sortButtonNotes = document.getElementById("sortButtonNotes");
sortButtonNotes.addEventListener("click", () => {
  const divSelectFilterform = document.getElementById("divToSelectFilterForm");

  if (divSelectFilterform.style.display === "block") {
    // HIDES the form
    divSelectFilterform.style.display = "none";
  } else {
    divSelectFilterform.style.display = "block";
  }
});

const submitFilterChoiceTodo = document.getElementById(
  "submitFilterChoiceTodo"
);

submitFilterChoiceTodo.addEventListener("click", () => {
  var filterTodo = document.getElementById("filterTodo");
  var filterSelection = filterTodo.options[filterTodo.selectedIndex].value;

  var numby = document.querySelector(".todo-list").children;
  numby = Array.prototype.slice.call(numby, 0);

  var numbyFalse = document.querySelector(".todo-list").children;
  numbyFalse = Array.prototype.slice.call(numbyFalse, 0);
  console.log(filterSelection);

  numby = numby.filter(function (number) {
    var ab = number.querySelector(".IndCategories.todo-item");
    //in order to find if any of the words match
    var first = ab.innerHTML.indexOf(filterSelection) > -1;
    return first;
  });

  numby2 = numbyFalse.filter(function (number) {
    var ab = number.querySelector(".IndCategories.todo-item");
    //in order to find if any of the words match
    var first = ab.innerHTML.indexOf(filterSelection) > -1;
    var second = !first;
    return second;
  });

  var parent = document.querySelector(".todo-list");
  parent.innerHTML = "";

  if (numby.length === 0) {
    Toastify({
      text: "You dont have anything in this category ",
      duration: 2500,
      style: {
        background: "linear-gradient(to right, #FF69B4, purple)",
      },
    }).showToast();

    for (var i = 0, l = numby2.length; i < l; i++) {
      parent.appendChild(numby2[i]);
    }
  } else {
    for (var i = 0, l = numby.length; i < l; i++) {
      parent.appendChild(numby[i]);
    }

    for (var i = 0, l = numby2.length; i < l; i++) {
      parent.appendChild(numby2[i]);
    }
  }
});

//Not perfect...need to have it so that if there is nothing in that selection, then you dont show anything???or at least show a message
const submitFilterChoice = document.getElementById("submitFilterChoice");

submitFilterChoice.addEventListener("click", () => {
  var filterNotes = document.getElementById("filterNotes");
  var filterSelection = filterNotes.options[filterNotes.selectedIndex].value;

  var numby = document.querySelector(".notes-list").children;
  numby = Array.prototype.slice.call(numby, 0);

  var numbyFalse = document.querySelector(".notes-list").children;
  numbyFalse = Array.prototype.slice.call(numbyFalse, 0);
  console.log(filterSelection);

  numby = numby.filter(function (number) {
    var ab = number.querySelector(".IndCategories.note-item");
    //in order to find if any of the words match
    var first = ab.innerHTML.indexOf(filterSelection) > -1;
    return first;
  });

  numby2 = numbyFalse.filter(function (number) {
    var ab = number.querySelector(".IndCategories.note-item");
    //in order to find if any of the words match
    var first = ab.innerHTML.indexOf(filterSelection) > -1;
    var second = !first;
    return second;
  });

  var parent = document.querySelector(".notes-list");
  parent.innerHTML = "";

  if (numby.length === 0) {
    Toastify({
      text: "You dont have anything in this category ",
      duration: 2500,
      style: {
        background: "linear-gradient(to right, #FF69B4, purple)",
      },
    }).showToast();

    for (var i = 0, l = numby2.length; i < l; i++) {
      parent.appendChild(numby2[i]);
    }
  } else {
    for (var i = 0, l = numby.length; i < l; i++) {
      parent.appendChild(numby[i]);
    }

    for (var i = 0, l = numby2.length; i < l; i++) {
      parent.appendChild(numby2[i]);
    }
  }
});

//EVERYTHING HABIT TRACKER

//Adding New  Habit

const createNewHabitBtn =document.getElementById("createNewHabitBtn");
createNewHabitBtn.addEventListener("click", () => {
  const divzform = document.getElementById("divToCreateHabitForm");

  if (divzform.style.display === "block") {
    // HIDES the form
    divzform.style.display = "none";
  } else {
    divzform.style.display = "block";
  }
});


const submitNewHabitBtn =document.getElementById("submitNewHabit");
const habitList=document.querySelector(".habit-list");

habitList.addEventListener("click", deleteCheckHabit);

submitNewHabitBtn.addEventListener("click", addHabit);
function addHabit(){
  // alert(habitList.childNodes.length);
  if (habitList.childNodes.length<3){
  const habitDiv = document.createElement("div");
  habitDiv.setAttribute("class", "IndHabit");
  habitDiv.classList.add("Habit");


  const ExpandButton = document.createElement("button");
  // ExpandButton.innerText = "expand";
  ExpandButton.classList.add("Expand-btn");
  habitDiv.appendChild(ExpandButton);

  const habitDivTitle = document.createElement("li");
  habitDivTitle.setAttribute("class", "IndHabitTitle");
  habitDivTitle.innerText = document.getElementById("habit-input").value;
  habitDivTitle.classList.add("habitTitle");
  habitDiv.appendChild( habitDivTitle);


  const cancelButton = document.createElement("button");
  // cancelButton.innerText = "trash";
  cancelButton.classList.add("cancel-btn");
  habitDiv.appendChild(cancelButton);

  habitList.appendChild(habitDiv);
  }
  else{
    Toastify({
      text: "At the moment you can only track 3 habits ",
      duration: 2500,
      style: {
        background: "linear-gradient(to right, #FF69B4, purple)",
      },
    }).showToast();
    console.error("Error while creating ToDo: ", error);

  }



 
}


function deleteCheckHabit(event) {
  const item = event.target;
  if (item.classList[0] === "cancel-btn") {
    const habit= item.parentElement;
    habit.remove();
    // deleteNoteStore(note.getAttribute("id"));
  }


  if (item.classList[0] === "Expand-btn") {
    const habit = item.parentElement;
    habit.classList.toggle("HabitExpand");
  }
}





  


