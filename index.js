Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  'rspognStfNV37CQa4LHoJxZReWuNU1iXKgPyOVv2', // This is your Application ID
  'ARHVg2q79aHYce2i4rov3RDm6Z4LMvPckfwggh6T' // This is your Javascript key
);



/// section 1 completed


function mainProfilePage(){
  location.href = "ProfilePage.html";
  
};

function login(){ ///struggling
  var user = Parse.User
  .logIn(document.getElementById("email_field").value,document.getElementById("password_field").value).then(function(user) {
      // window.alert("logged in babes");
      mainProfilePage();

}).catch(function(error){
  window.alert("Error: " + error.code + " " + error.message);
});
};

function createAccountPage(){
  location.href = "createAccount.html";
};

function loginPage(){
location.href = "loginPage.html";
};

function chooseYourCharacterPage(){
location.href = "chooseYourChara.html";
};
/// section 1 completed

   

// / section 2 completed
 function create () {  
   var user = new Parse.User();
   user.set("username", document.getElementById("userName_field").value);
   user.set("email", document.getElementById("email_field").value);
   user.set("password", document.getElementById("password_field").value);
       
  // Call the save method, which returns the saved object if successful
   user.signUp().then(function(user) {
     chooseYourCharacterPage();
    }).catch(function(error){
      window.alert("Error: " + error.code + " " + error.message);
     });
    
    }

  

  function refUser(){
  Parse.User.enableUnsafeCurrentUser()
  const currentUser = Parse.User.current();
  refUse=currentUser.get("username");
   document.getElementById("welcome").innerHTML ="Hey! "+refUse;


   //playong with local storage, this is here bc this is the onload functuon in the profile html
  //  localStorage.setItem('myCat', 'Tom');
  //  const cat = localStorage.getItem('myCat');
  //  window.alert(cat)
  // window.alert(toppp);
  }
// section 2 completed


const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');

todoButton.addEventListener("click", storeTODO);
todoList.addEventListener("click", deleteCheck);


function addTodo(idd){
  // preventDefault();
  const toDoDiv = document.createElement('div');
  toDoDiv.setAttribute("id", idd);
  toDoDiv.setAttribute("value", "OFF")  
  toDoDiv.classList.add('todo');

  const newToDo=document.createElement('li');
  newToDo.innerText = todoInput.value;
  newToDo.classList.add('todo-item');
  toDoDiv.appendChild(newToDo);


  const completedButton =document.createElement('button');
  completedButton.innerText='done';
  completedButton.classList.add('complete-btn');
  toDoDiv.appendChild(completedButton);

  const cancelButton =document.createElement('button');
  cancelButton.innerText='trash';
  cancelButton.classList.add("cancel-btn");
  toDoDiv.appendChild(cancelButton);



  //add to list
  todoList.appendChild(toDoDiv);
  
  window.alert(toDoDiv.getAttribute("id"))// works
  //clear inout value 

  todoInput.value="";
}

//this stores new Todo to parse
function storeTODO(event){
  event.preventDefault();
  (async () => {
    const todo2= new Parse.Object('ToDo');
    todo2.set('User', Parse.User.current());
    todo2.set('title',document.querySelector('.todo-input').value);
    todo2.set('isCompleted', false);
    
    try {
      const result = await todo2.save();
      console.log('ToDo created', result);
    } catch (error) {
      console.error('Error while creating ToDo: ', error);
    }

    ob=todo2.id
    addTodo(ob)
  

   
  })();
  
   }     

   //this updates parse for task deletion
  function deleteToDoStore(idd){
    (async () => {
      const query = new Parse.Query('ToDo');
      try {
        // here you put the objectId that you want to delete
        const object = await query.get(idd);
        try {
          const response = await object.destroy();
          console.log('Deleted ParseObject', response);
        } catch (error) {
          console.error('Error while deleting ParseObject', error);
        }
      } catch (error) {
        console.error('Error while retrieving ParseObject', error);
      }
    })();

  }


  //this updates parse for task completion 
  function completedStore(idd){
    (async () => {
      const query = new Parse.Query('ToDo');
      try {
        // here you put the objectId that you want to update
        const object = await query.get(idd);
        //this is so the user can toggle multiple times for the same task
        meow=object.get('isCompleted');
        if (meow==false){
        object.set('isCompleted', true);
        }
        if (meow==true){
          object.set('isCompleted', false);
          }
        try {
          const response = await object.save();

        } catch (error) {
          console.error('Error while updating ', error);
        }
      } catch (error) {
        console.error('Error while retrieving object ', error);
      }
      
    })();
  }



// /currently working on

function loginLoadUserTodo(idd){
}
//currently working on


function deleteCheck(event){
const item= event.target;
if(item.classList[0]=== "cancel-btn"){
  const todo= item.parentElement;
  todo.remove();
  deleteToDoStore(todo.getAttribute("id"))
}



//need to have it whhere the user can click button multuple times, bc people make mistakes - comeplted, but still do test
if(item.classList[0] === "complete-btn"){
  const todo= item.parentElement;
  todo.classList.toggle('completed');
  completedStore(todo.getAttribute("id"));
  }

}



//left on minute 48 for filter to do!




       


