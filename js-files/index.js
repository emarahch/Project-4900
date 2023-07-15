Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  "rspognStfNV37CQa4LHoJxZReWuNU1iXKgPyOVv2", // This is your Application ID
  "ARHVg2q79aHYce2i4rov3RDm6Z4LMvPckfwggh6T" // This is your Javascript key
);

// If having trouble with parse, check if there is an update
const loaderContainer = document.querySelector(".loader-container");

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  // loaderContainer.style.display = 'none';
  //referenced https://stackabuse.com/loading-animation-in-vanilla-javascript/
  loaderContainer.parentElement.removeChild(loaderContainer);
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

const config = {
  name: "Event from ProDo",
  description: "",
  startDate: "today",
  options: ["Apple", "Google", "Yahoo", "iCal"],
  trigger: "click",
  inline: true,
  checkmark: false,
  listStyle: "overlay",
  mindScrolling: true,
  iCalFileName: "Reminder-Event",
};
const ShowAddToCalendar = document.getElementById("ShowAddToCalendar");
ShowAddToCalendar.addEventListener("click", () =>
  atcb_action(config, ShowAddToCalendar)
);

//For date later on
//This specific format function is from stack overflow
function formatDate() {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

var taskDueToday = 0;
const ThingsDue = document.getElementById("ThingsDue");

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
var TodayDate = new Date().toString().split(" ").splice(0, 4).join(" ");
document.getElementById("currentDate").innerHTML = TodayDate;

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
      login();
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

    bar1.set(scoringMath(userScore));
  })();
}

//showing and hiding sort by priority etc buttosn

function generalDisplayBlockCall(Div) {
  if (Div.style.display === "block") {
    // HIDES the form
    Div.style.display = "none";
  } else {
    Div.style.display = "block";
  }
}
const SortButtonsAll = document.getElementById("SortButtonsAll");
const sortButtonsDiv = document.getElementById("sortButtonsDiv");

SortButtonsAll.addEventListener("click", () => {
  generalDisplayBlockCall(sortButtonsDiv);
});

//Showing and hiding nav bar
const showSideBar = document.getElementById("showSideBar");
const divSideform = document.querySelector(".testNav");
showSideBar.addEventListener("click", () => {
  generalDisplayBlockCall(divSideform);
});

//Showing and hiding habit tracker
const  ShowHabitTrackerButton= document.getElementById("ShowHabitTrackerButton");
const habitsSection = document.querySelector(".habitsSection");
ShowHabitTrackerButton.addEventListener("click", () => {
  generalDisplayBlockCall(habitsSection);
});

//Showing and hiding the form for adding a todo
const createTodoShowBtn = document.getElementById("createTodoShowBtn");
const divToCreateForm = document.getElementById("divToCreateForm");

createTodoShowBtn.addEventListener("click", () => {
  generalDisplayBlockCall(divToCreateForm);
});


// //Showing and hiding the form for adding a note
const createNoteShowBtn = document.getElementById("createNoteShowBtn");
const divToCreateNote = document.getElementById("divToCreateNote");

createNoteShowBtn.addEventListener("click", () => {
  generalDisplayBlockCall(divToCreateNote);
});


//Showing and hiding the form for adding a habit
const createHabitShowBtn = document.getElementById("createHabitShowBtn");
const divToCreateHabitForm = document.getElementById("divToCreateHabitForm");

createHabitShowBtn.addEventListener("click", () => {
  generalDisplayBlockCall(divToCreateHabitForm);
});



//Showing and hiding the form for chnaging date in habit
const changeDateHabitBtn = document.getElementById("changeDateHabitBtn");
const divToChnageDateHabitForm = document.getElementById("divToChangeDateHabitForm");

changeDateHabitBtn.addEventListener("click", () => {
  generalDisplayBlockCall(divToChnageDateHabitForm);
});


//showing hiding music
const showMusic = document.getElementById("TriggerMusicButton");
const divMusic= document.getElementById("music");
showMusic.addEventListener("click", () => {
  generalDisplayBlockCall(divMusic);
});

//Switching between archive view and normal view
const viewArchiveButton = document.getElementById("viewArchiveButton");
const CompletedTodoList = document.querySelector(".CompletedTodo-list");
const divArchiveform = document.querySelector(".CompletedTodo-list");
viewArchiveButton.addEventListener("click", () => {
  const divpform = document.querySelector(".todo-list");
  // const divArchiveform = document.querySelector(".CompletedTodo-list");
  if (divpform.style.display === "block") {
    //  HIDES the form
    divpform.style.display = "none";
    divArchiveform.style.display = "block";
    viewArchiveButton.innerHTML = "Show To Do";
  } else {
    divpform.style.display = "block";
    divArchiveform.style.display = "none";
    viewArchiveButton.innerHTML = "Show Archive";
  }
});

const ShowArchEditSortButton = document.getElementById(
  "ShowArchEditSortButton"
);
const DivForButtonsArchEditSort = document.getElementById(
  "DivForButtonsArchEditSort"
);
ShowArchEditSortButton.addEventListener("click", () => {
  generalDisplayBlockCall(DivForButtonsArchEditSort);
});

//Adding New Todo's to the DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoDateInput = document.querySelector(".todo-dateInput");

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

  const newTodoDate = document.createElement("li");
  newTodoDate.setAttribute("class", "IndDate");
  newTodoDate.innerText = todoDateInput.value;
  newTodoDate.classList.add("todo-item");
  toDoDiv.appendChild(newTodoDate);

  const cancelButton = document.createElement("button");
  // cancelButton.innerText = "trash";
  cancelButton.classList.add("cancel-btn");
  toDoDiv.appendChild(cancelButton);

  //add to list
  todoList.appendChild(toDoDiv);
  todoInput.value = "";

  if (todoDateInput.value === formatDate()) {
    taskDueToday += 1;
    ThingsDue.innerHTML = taskDueToday;
  }
}

//this stores new Todo to parse, first store then add to the DOM
function storeTODO(event) {
  //This is for getting the priority level and the categories
  var prNumberUser = document.getElementById("priorityNumber");
  var categoryNumberUser = document.getElementById("categoryNumber");
  var textPr = prNumberUser.options[prNumberUser.selectedIndex].value;
  var textCa = Array.from(categoryNumberUser.selectedOptions).map(
    (x) => x.value ?? x.text
  );
  //prevnting refresh of the page
  event.preventDefault();
  (async () => {
    const newTodo2 = new Parse.Object("ToDo");
    newTodo2.set("User", Parse.User.current());
    newTodo2.set("title", document.querySelector(".todo-input").value);
    newTodo2.set("isCompleted", false);
    newTodo2.set("priority", textPr);
    newTodo2.set("category", textCa);
    newTodo2.set("date", document.querySelector(".todo-dateInput").value);

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
  paragraph.style.backgroundColor = "transparent";
  editStoreTodo(id, paragraph.innerHTML);
}

function editStoreTodo(id, todoText) {
  (async () => {
    const query = new Parse.Query("ToDo");
    try {
      const object = await query.get(id);
      object.set("title", todoText);
      const result = await object.save();
      console.log("EDIT MADE", result);
    } catch (error) {
      console.error("Error while EDITING ToDo: ", error);
    }
  })();
}

// const CompletedTodoList = document.querySelector(".CompletedTodo-list");
CompletedTodoList.addEventListener("click", deleteCheck);
function addToArchive(todo) {
  var meow = todo;
  CompletedTodoList.appendChild(meow);
}

function addToOG(todo) {
  const ogList = document.querySelector(".todo-list");
  var meow = todo;
  ogList.appendChild(meow);
  ogList.addEventListener("click", deleteCheck);
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

    const todoNode = item.parentNode;
    if (todoNode.parentNode.className === "todo-list") {
      addToArchive(todoNode);

      if (todo.children.item(5).innerText === formatDate()) {
        taskDueToday -= 1;
        ThingsDue.innerHTML = taskDueToday;
      }
    } else if (todoNode.parentNode.className === "CompletedTodo-list") {
      addToOG(todoNode);
      if (todo.children.item(5).innerText === formatDate()) {
        taskDueToday += 1;
        ThingsDue.innerHTML = taskDueToday;
      }
    }
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
  }
}

//NOTES SECTION//

const saveButtonNotes = document.querySelector(".btn-save");
const notesList = document.querySelector(".notes-list");
const notesInput = document.querySelector(".body-field");
const notesTitle = document.querySelector(".title-field");

saveButtonNotes.addEventListener("click", storeNote);
notesList.addEventListener("click", deleteNote);

//Everythign pexils
const searchButton = document.getElementById("searchButton");
const noImageButton = document.getElementById("noImageButton");
const searchInput = document.getElementById("image-search");
var imageDisplay = document.querySelector(".display_images");
var currentImageSelected;

noImageButton.addEventListener("click", () => {
  currentImageSelected = null;
});

searchButton.addEventListener("click", async () => {
  var query = searchInput.value;
  const page_num = 1;

  // For setting this up I referenced
  // https://dev.to/nehasoni__/create-an-amazing-image-search-app-using-pexels-api-2cf
  //and https://www.pexels.com/api/documentation/

  const data = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&page=${page_num}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "563492ad6f917000010000013fbd8851f18b454ca1d76ee6f744a667",
      },
    }
  );
  const response = await data.json();

  display_images(response);
});

function display_images(response) {
  while (imageDisplay.firstChild) {
    imageDisplay.removeChild(imageDisplay.firstChild);
  }

  response.photos.forEach((image) => {
    const photo = document.createElement("div");
    photo.setAttribute("class", "IndImageGrid");
    photo.innerHTML = `<img src=${image.src.large}>
      <figcaption>By: ${image.photographer}</figcaption>`;
    imageDisplay.appendChild(photo);
  });

  var imageChoice = document.querySelectorAll(".IndImageGrid");
  imageChoice.forEach(function (i) {
    i.addEventListener("click", function () {
      console.log(i.firstChild.getAttribute("src"));
      currentImageSelected = i.firstChild.getAttribute("src");
    });
  });
}

function addNote(ob2) {
  var categoryNumberUser = document.getElementById("categoryNumberNotes");
  var textCa = Array.from(categoryNumberUser.selectedOptions).map(
    (x) => x.value ?? x.text
  );
  // preventDefault();
  const notesDivButtons = document.createElement("div");
  notesDivButtons.setAttribute("id", "notesDivButtons");

  const ExpandButton = document.createElement("button");
  ExpandButton.classList.add("Expand-btn");
  notesDivButtons.appendChild(ExpandButton);

  const showMoreIndButtonNote = document.createElement("button");
  showMoreIndButtonNote.classList.add("showMoreIndNote-Button");
  notesDivButtons.appendChild(showMoreIndButtonNote);

  const DivShowEditDeleteNoteButtons = document.createElement("div");
  DivShowEditDeleteNoteButtons.setAttribute(
    "class",
    "DivShowEditDeleteNoteButtons"
  );

  const EditNotesButton = document.createElement("button");
  EditNotesButton.setAttribute("value", "Off");
  EditNotesButton.classList.add("EditNotesButton");
  DivShowEditDeleteNoteButtons.appendChild(EditNotesButton);

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancelNote-btn");
  DivShowEditDeleteNoteButtons.appendChild(cancelButton);

  const notesDiv = document.createElement("div");
  notesDiv.appendChild(notesDivButtons);
  notesDiv.appendChild(DivShowEditDeleteNoteButtons);
  notesDiv.setAttribute("id", ob2);
  notesDiv.classList.add("note");

  if (currentImageSelected != null && currentImageSelected != undefined) {
    const noteHeaderImage = document.createElement("img");
    noteHeaderImage.setAttribute("class", "IndNoteHeadImagePerNote");
    noteHeaderImage.src = currentImageSelected;
    notesDiv.appendChild(noteHeaderImage);
    currentImageSelected = null;
  }

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
    newNote.set("images", currentImageSelected);

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

//Edit text note - potentially merge functions for both note and text in future
function editTextNoteFunc(id) {
  // const paragraph = document.getElementById(id);
  const p = document.getElementById(id);
  paragraph = p.querySelector(".bodyOut");
  paragraph.contentEditable = true;
  paragraph.style.backgroundColor = "#dddbdb";
}

//need to fix the lay out fo this, maybe two try statements???
function stopEditTextNote(id) {
  const p = document.getElementById(id);
  paragraph = p.querySelector(".bodyOut");
  paragraph.contentEditable = false;
  paragraph.style.backgroundColor = "transparent";
  editStoreNote(id, paragraph.innerHTML);
}

function editStoreNote(id, NoteBodyText) {
  (async () => {
    const query = new Parse.Query("Notes");
    try {
      const object = await query.get(id);
      object.set("NoteBody", NoteBodyText);
      const result = await object.save();
      console.log("EDIT MADE", result);
    } catch (error) {
      console.error("Error while EDITING Note Body: ", error);
    }
  })();
}

function deleteNote(event) {
  const item = event.target;
  if (item.classList[0] === "cancelNote-btn") {
    const notey = item.parentElement;
    const note = notey.parentElement;
    note.remove();
    deleteNoteStore(note.getAttribute("id"));
  }

  if (item.classList[0] === "Expand-btn") {
    const notey = item.parentElement;
    const note = notey.parentElement;
    note.classList.toggle("noteExpand");
  }

  if (item.classList[0] === "EditNotesButton") {
    const notey = item.parentElement;
    const note = notey.parentElement;
    ObjectIdText = note.getAttribute("id"); //Works
    note.classList.toggle("noteExpand");

    if (item.getAttribute("value") == "Off") {
      editTextNoteFunc(ObjectIdText);
      item.setAttribute("value", "On");
    } else if (item.getAttribute("value") == "On") {
      stopEditTextNote(ObjectIdText);
      item.setAttribute("value", "Off");
    }
  }

  if (item.classList[0] === "showMoreIndNote-Button") {
    const notey = item.parentElement;
    const note = notey.parentElement;
    ObjectIdText = note.getAttribute("id");

    //this finds the correct child (showMoreDiv) and calls the display function
    generalDisplayBlockCall(note.children.item(1));
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
  document.getElementById("welcome").innerHTML = "Hey, " + refUse + "!";
  document.getElementById("userPlay").src = userI;
  upScoreRealTime();
  retrieveTodos();
  retrieveNotes();
}

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
        const date = object.get("date");

        addOldToDo(objectId, title, isCompleted, priority, category, date);
      }
    } catch (error) {
      console.error("Error while fetching ToDo", error);
    }
  })();
}

function addOldToDo(objectId, title, isCompleted, priority, category, date) {
  const toDoDiv = document.createElement("div");
  toDoDiv.setAttribute("class", "IndToDo");
  toDoDiv.setAttribute("id", objectId);
  toDoDiv.classList.add("todo");

  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn");
  toDoDiv.appendChild(completedButton);

  const newToDo = document.createElement("li");
  newToDo.setAttribute("class", "IndTitle");
  newToDo.innerText = title;
  newToDo.classList.add("todo-item");
  toDoDiv.appendChild(newToDo);

  const EditTitleButton = document.createElement("button");
  EditTitleButton.setAttribute("value", "Off");
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

  const newTodoDate = document.createElement("li");
  newTodoDate.setAttribute("class", "IndDate");
  newTodoDate.innerText = date;
  newTodoDate.classList.add("todo-item");
  toDoDiv.appendChild(newTodoDate);

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-btn");
  toDoDiv.appendChild(cancelButton);

  if (isCompleted == true) {
    toDoDiv.classList.toggle("completed");
    CompletedTodoList.appendChild(toDoDiv);
  } else if (isCompleted == false) {
    todoList.appendChild(toDoDiv);
  }

  if (date === formatDate()) {
    taskDueToday += 1;
    ThingsDue.innerHTML = taskDueToday;
  }
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
        const noteHeaderImage = object.get("images");
        addOldNote(objectId, title, NoteBody, category, noteHeaderImage);
      }
    } catch (error) {
      console.error("Error while fetching ToDo", error);
    }
  })();
}

function addOldNote(objectId, title, NoteBody, category, images) {
  // preventDefault();

  const notesDivButtons = document.createElement("div");
  notesDivButtons.setAttribute("id", "notesDivButtons");

  const ExpandButton = document.createElement("button");
  ExpandButton.classList.add("Expand-btn");
  notesDivButtons.appendChild(ExpandButton);

  const showMoreIndButtonNote = document.createElement("button");
  showMoreIndButtonNote.classList.add("showMoreIndNote-Button");
  notesDivButtons.appendChild(showMoreIndButtonNote);

  const DivShowEditDeleteNoteButtons = document.createElement("div");
  DivShowEditDeleteNoteButtons.setAttribute(
    "class",
    "DivShowEditDeleteNoteButtons"
  );

  const EditNotesButton = document.createElement("button");
  EditNotesButton.setAttribute("value", "Off");
  EditNotesButton.classList.add("EditNotesButton");
  DivShowEditDeleteNoteButtons.appendChild(EditNotesButton);

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancelNote-btn");
  DivShowEditDeleteNoteButtons.appendChild(cancelButton);

  const notesDiv = document.createElement("div");
  notesDiv.appendChild(notesDivButtons);
  notesDiv.appendChild(DivShowEditDeleteNoteButtons);
  notesDiv.setAttribute("id", objectId);
  notesDiv.classList.add("note");

  if (images != null && images != undefined) {
    const noteHeaderImage = document.createElement("img");
    noteHeaderImage.setAttribute("class", "IndNoteHeadImagePerNote");
    noteHeaderImage.src = images;
    notesDiv.appendChild(noteHeaderImage);
  }

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

  //add to list
  notesList.appendChild(notesDiv);
}




//EVERYTHING HABIT TRACKER

//Adding New  Habit

const submitNewHabitBtn =document.getElementById("submitNewHabit");
const habitList=document.querySelector(".habits-list");

habitList.addEventListener("click", deleteCheckHabit);
submitNewHabitBtn.addEventListener("click", updateUserHabitList);

function updateUserHabitList(e){
  Parse.User.enableUnsafeCurrentUser();
  e.preventDefault();
  const currentUser = Parse.User.current();
  const currentUserId =currentUser.id;
  alert(currentUserId);
  (async () => {
    const query = new Parse.Query("User");
    try {
  var userHabits = currentUser.get("currentHabits");
  // alert(userHabits)
  newUserHabits=document.getElementById("habit-input").value;
  newUserHabitsArray= Array.from(newUserHabits).map(
    (x) => x.value ?? x.text
  );
  currentUser.set("currentHabits", newUserHabitsArray);

} catch (error) {
  console.error("Error while retrieving object ", error);
}
})();

}


function addHabit(e){
  e.preventDefault();
  var habitCount=0;

  if (habitList.childNodes.length<3){

  const habitDiv = document.createElement("div");
  habitDiv.setAttribute("class", "IndHabit");
  habitDiv.classList.add("Habit");



  const habitDivTitle = document.createElement("li");
  habitDivTitle.setAttribute("class", "IndHabitTitle");
  habitDivTitle.innerText = document.getElementById("habit-input").value;
  habitDivTitle.classList.add("habitTitle");
  habitDiv.appendChild(habitDivTitle);

  const completedButton = document.createElement("button");
  // completedButton.innerText = "✓";
  completedButton.classList.add("complete-btn");
  habitDiv.appendChild(completedButton);



  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-btn");
  habitDiv.appendChild(cancelButton);

  habitList.appendChild(habitDiv);
  habitCount=habitCount+1;
  console.log(habitCount, "meow")

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

  if (item.classList[0] === "complete-btn") {
    const habit = item.parentElement;
    habit.classList.toggle("completed");
    // completedStore(habit.getAttribute("id"));

 
}
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
    generalDisplayBlockCall(trashList[i]);
  }

  var editTitleList = document.querySelectorAll(".EditTitle-btn");
  for (let i = 0; i < editTitleList.length; i++) {
    generalDisplayBlockCall(editTitleList[i]);
  }
});

//Sorting todos based on priority
//this works!
const sortButton = document.getElementById("sortButton");
sortButton.addEventListener("click", () => {
  var numbersToSort = document.querySelector(".todo-list").children;
  numbersToSort = Array.prototype.slice.call(numbersToSort, 0);

  if (sortButton.innerHTML == "Priority Increasing") {
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
    sortButton.innerHTML = "Priority Decreasing";
  } else if (sortButton.innerHTML == "Priority Decreasing") {
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
    sortButton.innerHTML = "Priority Increasing";
  }
});

//soring based on date:
const sortButtonDate = document.getElementById("sortButtonDate");
sortButtonDate.addEventListener("click", () => {
  var DatesToSort = document.querySelector(".todo-list").children;
  DatesToSort = Array.prototype.slice.call(DatesToSort, 0);

  if (sortButtonDate.innerHTML == "Date Increasing") {
    DatesToSort.sort(function (a, b) {
      ab = a.querySelector(".todo-item.IndDate ");
      ba = b.querySelector(".todo-item.IndDate ");
      return ab.innerHTML > ba.innerHTML;
    });
    var parent = document.querySelector(".todo-list");
    parent.innerHTML = "";

    for (var i = 0, l = DatesToSort.length; i < l; i++) {
      parent.appendChild(DatesToSort[i]);
    }
    sortButtonDate.innerHTML = "Date Decreasing";
  } else if (sortButtonDate.innerHTML == "Date Decreasing") {
    DatesToSort.sort(function (a, b) {
      ab = a.querySelector(".todo-item.IndDate ");
      ba = b.querySelector(".todo-item.IndDate ");
      return ba.innerHTML > ab.innerHTML;
    });
    var parent = document.querySelector(".todo-list");
    parent.innerHTML = "";

    for (var i = 0, l = DatesToSort.length; i < l; i++) {
      parent.appendChild(DatesToSort[i]);
    }
    sortButtonDate.innerHTML = "Date Increasing";
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

  generalDisplayBlockCall(divToSelectFilterFormToDo);
});

//filtering notes section
const sortButtonNotes = document.getElementById("sortButtonNotes");
sortButtonNotes.addEventListener("click", () => {
  const divSelectFilterform = document.getElementById("divToSelectFilterForm");

  generalDisplayBlockCall(divSelectFilterform);
});

const submitFilterChoiceTodo = document.getElementById(
  "submitFilterChoiceTodo"
);

//Went through stackoverflow and came yup with this
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



// music
// https://soundcloud.com/chillspacelofi/sets/lofi-non-copyright-hip-hop
// https://soundcloud.com/chillspacelofi/agx12-adbeel-clouds?in=chillspacelofi/sets/lofi-non-copyright-hip-hop


var playButton = document.querySelector('.playButton');
var skipButton = document.querySelector('.skipButton');
// var text = document.querySelector('.text');
// var coverArt = document.querySelector('.coverArt');
var audio = document.querySelector('.audios');
// var duration=document.querySelector('.duration');




var songCount=0;
const songs = ["Cozy Afternoon", "Chocolate", "Yello Mornings","Snow fall"];
// const covers=["pics/Gum.jpeg","pics/stereoDriver.jpeg","pics/End.jpeg","pics/youUp.jpeg"];
const mp=["../music/CozyAfternoon.mp3",
"../music/Digimazz--Chocolate.mp3",
"../music/LostFiles-YellowMornings-2.mp3",
"../music/snowfall.mp3"];


audio.addEventListener('loadeddata', ()=>{
    duration.innerHTML = formating(audio.duration);
});

function formating(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time-(minutes * 60));
    return `${minutes}:${seconds}`;
  }


playButton .addEventListener("click",()=>{
    if (audio.paused || audio.ended){
    playerF();
    }else{
     pauseF();
    }
});

skipButton.addEventListener("click",()=>{
    newSong();
});

function newSong(){
    pauseF();
    // text.innerHTML=songs[songCount];;
    // coverArt.src=covers[songCount];
    audio.src=mp[songCount];

    if(songCount<songs.length-1){
    songCount+=1;
    }else{
        songCount=0;
    }
}


function playerF(){
    playButton.innerHTML ="||";
    audio.play();
}

function pauseF(){
    playButton.innerHTML = "▶";
    audio.pause();
}



// https://www.w3schools.com/howto/howto_js_draggable.asp
dragElement(document.getElementById("music"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
  

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}