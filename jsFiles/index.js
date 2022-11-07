Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  'rspognStfNV37CQa4LHoJxZReWuNU1iXKgPyOVv2', // This is your Application ID
  'ARHVg2q79aHYce2i4rov3RDm6Z4LMvPckfwggh6T' // This is your Javascript key
);

//If havinf trouble with parse, check if their is an update


/// section 1 completed



//FOR BUTTONS START
function mainProfilePage(){
  location.href = "../htmlFiles/ProfilePage.html";
  
};

//FOR BUTTONS END



   

// / section 2 completed


function create () {  
  var user = new Parse.User();
  user.set("username", document.getElementById("userName_field").value);
  user.set("email", document.getElementById("email_field").value);
  user.set("password", document.getElementById("password_field").value);
 
      // Call the save method, which returns the saved object if successful
      user.signUp().then(function(user) {
        mainProfilePage();
      }).catch(function(error){
          window.alert("Error: " + error.code + " " + error.message);
      });

}



function login(){
  var user = Parse.User
  .logIn(document.getElementById("email_field").value,document.getElementById("password_field").value).then(function(user) {
    mainProfilePage();

}).catch(function(error){
  window.alert("Error: " + error.code + " " + error.message);
});
};



function loader(){
  Parse.User.enableUnsafeCurrentUser()
  const currentUser = Parse.User.current();
  const refUse=currentUser.get("username");
  document.getElementById("welcome").innerHTML ="Hey! "+refUse;
}





const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');

todoButton.addEventListener("click", storeTODO);
todoList.addEventListener("click", deleteCheck);


function addTodo(idd){
  //??
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
  
  // window.alert(toDoDiv.getAttribute("id"))// works
  //clear inout value 

  todoInput.value="";
}

//this stores new Todo to parse
function storeTODO(event){
  event.preventDefault();
  (async () => {
    const newTodo2= new Parse.Object('ToDo');
    newTodo2.set('User', Parse.User.current());
    newTodo2.set('title',document.querySelector('.todo-input').value);
    newTodo2.set('isCompleted', false);

    try {
      const result = await  newTodo2.save();
      console.log('ToDo created', result);
    } catch (error) {
      console.error('Error while creating ToDo: ', error);
      
    }

    ob= newTodo2.id;
    // window.alert(ob);// works
    addTodo(ob);
  
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








//Testing trying to get old stuff...
const getterButton= document.querySelector('.random');
getterButton.addEventListener("click", retrieveTodos);

//needs aync bc of await
async function retrieveTodos(){
  Parse.User.enableUnsafeCurrentUser()
  const currentUser = Parse.User.current();
  

  const GameScore = Parse.Object.extend("ToDo");
  var query = new Parse.Query(GameScore);
  query.include('User');
  query.equalTo("User",currentUser);

query.find({  //Having trouble making this fully work
  success: function(results){
      window.alert("Successfully retrieved " + results.length + " scores."); //this does nothiung?
      console.log("??")
  },

  error: function(error) {
    // error is an instance of Parse.Error.
    window.alert("problem" + error);
  }
});
// window.alert("hello");

}



function pasteToDo(results){
  for (let i = 0; i < results.length; i++) {
    const object = results[i];
    alert(object.id + ' - ' + object.get('User'));
}
}

//left on minute 48 for filter to do!




       


