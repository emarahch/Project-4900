const saveButtonNotes= document.querySelector('.btn-save');
const clearButtonNotes= document.querySelector('.btn-clear');
const notesInput= document.querySelector('.body-field');
const notesList= document.querySelector('.notes-list');
const notesTitle= document.querySelector('.title-field');


saveButtonNotes.addEventListener("click", storeNote);
clearButtonNotes.addEventListener("click", clearNote);
notesList.addEventListener("click", deleteNote);




function storeNote(event){
  event.preventDefault();
  addNote()
//   window.alert("works");

}

  function clearNote(event){
    event.preventDefault();
    window.alert("works");
  }


  

  function addNote(){
    // preventDefault();
    const notesDiv = document.createElement('div');
    // toDoDiv.setAttribute("id", idd);
    // toDoDiv.setAttribute("value", "OFF")  
    notesDiv.classList.add('note');
  

    const noteTitle=document.createElement('li');
    noteTitle.innerText= notesTitle.value;
    noteTitle.classList.add('titleOut');
    notesDiv.appendChild(noteTitle);

    const newNote=document.createElement('li');
    newNote.innerText = notesInput.value;
    newNote.classList.add('note-item');
    notesDiv.appendChild(newNote);


    const timeCreated =document.createElement('li');
    timeCreated.innerText=formatTime();
    timeCreated.classList.add('timeCreatedOutput');
    notesDiv.appendChild(timeCreated);
  
  
    const cancelButton =document.createElement('button');
    cancelButton.innerText='delete';
    cancelButton.classList.add("cancel-btn");
    notesDiv.appendChild(cancelButton);
  
  
  
    //add to list
    notesList.appendChild(notesDiv);
    
    // window.alert(toDoDiv.getAttribute("id"))// workdeleteNote
    //clear inout value 
  
    notesInput.value="";
    notesTitle.value="";
  }

  
  function deleteNote(event){
    const item= event.target;
    if(item.classList[0]=== "cancel-btn"){
      const note= item.parentElement;
      note.remove();
    //   deleteToDoStore(todo.getAttribute("id"))
    }
}

  // LOL CHANGE UP

  //format time
  function formatTime(str) {
    // var parsed = new Date(str);
    var parsed = new Date();
    var date = zeroPad(parsed.getMonth() + 1) + "/"+ zeroPad(parsed.getDate())  + "/"+  parsed.getFullYear(); 
    var time = zeroPad(parsed.getHours()) + ":" + zeroPad(parsed.getMinutes());
    return ("Created: " + date + " | " + time);
  }
  //append 0's to hours/ minutes if single digits
  function zeroPad(num) {
    while(String(num).length < 2) { num = "0" + String(num); }
    return num;
  }


