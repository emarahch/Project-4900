Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  'rspognStfNV37CQa4LHoJxZReWuNU1iXKgPyOVv2', // This is your Application ID
  'ARHVg2q79aHYce2i4rov3RDm6Z4LMvPckfwggh6T' // This is your Javascript key
);

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
//  window.alert("Hey!"+" "+refUse);
  }


//close but bc it starts at 0 the dunctionaly is off
 ob=0;
  function storeTODO(){
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
      // window.alert(ob);
    })();
     }     

     //still working on
    // function deleteToDoStore(){
    //   (async () => {
    //     const query = new Parse.Query('ToDo');
    //     try {
    //       // here you put the objectId that you want to delete
    //       const object = await query.get('xKue915KBG');
    //       try {
    //         const response = await object.destroy();
    //         console.log('Deleted ParseObject', response);
    //       } catch (error) {
    //         console.error('Error while deleting ParseObject', error);
    //       }
    //     } catch (error) {
    //       console.error('Error while retrieving ParseObject', error);
    //     }
    //   })();

    // }

//not perfect, but better. need to chnage it so you can complte task any time not just right after adding
    function completedStore(idd){
      (async () => {
        const query = new Parse.Query('ToDo');
        try {
          // here you put the objectId that you want to update
          const object = await query.get(idd);
          object.set('isCompleted', true);
          try {
            const response = await object.save();
            // You can use the "get" method to get the value of an attribute
            // Ex: response.get("<ATTRIBUTE_NAME>")
            // Access the Parse Object attributes using the .GET method
            // console.log(response.get('myCustomKey1Name'));
            // console.log('MyCustomClassName updated', response);
          } catch (error) {
            console.error('Error while updating ', error);
          }
        } catch (error) {
          console.error('Error while retrieving object ', error);
        }
      })();
    }



  //the following is practice from a video to figure out code to potential 
const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
 
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);



  function addTodo(event){
    event.preventDefault();
    storeTODO()
    idd=ob;

    const toDoDiv = document.createElement('div');
    toDoDiv.setAttribute("id", idd);
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


  //I might need to completlye redo the logic of the todo list

function deleteCheck(event){
  const item= event.target;
  if(item.classList[0]=== "cancel-btn"){
    const todo= item.parentElement;
    todo.remove();
  }

  if(item.classList[0] === "complete-btn"){
    const todo= item.parentElement;
    todo.classList.toggle('completed');
    completedStore(todo.getAttribute("id"));
    // window.alert(todo.getAttribute("id"))

   

    //idea, with each todo the id is stored, so here we can get the id of the parent element to dlete
    // meow=todo.idd;
    // window.alert(meow)
    // completedStore(idd)
    // completedStore(ob)

  }

}




//left on minute 48 for filter to do!




       


