Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  'rspognStfNV37CQa4LHoJxZReWuNU1iXKgPyOVv2', // This is your Application ID
  'ARHVg2q79aHYce2i4rov3RDm6Z4LMvPckfwggh6T' // This is your Javascript key
);

   

        function create () {  //works
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



  function refUser(){
  Parse.User.enableUnsafeCurrentUser()
  const currentUser = Parse.User.current();
  refUse=currentUser.get("username");
   document.getElementById("welcome").innerHTML ="Hey! "+refUse;
//  window.alert("Hey!"+" "+refUse);
  }



  //the following is practice from a video to figure out code to potential 
const todoInput= document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');
 
todoButton.addEventListener("click", addTodo);

  function addTodo(event){
    event.preventDefault();

    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('todo');

    const newToDo=document.createElement('li');
    newToDo.innerText ="hey";
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    const completedButton =document.createElement('button');
    completedButton.innerText='iddkdkdnd'
    completedButton.classList.add('complete-btn');
    toDoDiv.appendChild(completedButton);

    const cancelButton =document.createElement('button');
    cancelButton.innerText='bye'
    cancelButton.classList.add("cancel-btn");
    toDoDiv.appendChild(cancelButton);

    //add to list
    todoList.appendChild(toDoDiv);
  }

  //left off at minute 24
       
    