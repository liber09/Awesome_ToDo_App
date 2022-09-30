//Selectors
document.querySelector('form').addEventListener('submit',addTaskToList);
document.querySelector('#RemoveAll').addEventListener('click',deleteAll);
document.querySelector('ul').addEventListener('click',checkOrDelete);
document.querySelector('#helpMeBtn').addEventListener('click',helpMe);

//Lists
const leftToDoTaskList = new Array();
const doneTaskList = new Array();

//Delete all items from ToDoList and reset other fields
function deleteAll(event){
    document.querySelector('ul').innerHTML='';
    leftToDoTaskList.length = 0;
    doneTaskList.length = 0;
    let randomTaskPlaceholder = document.querySelector('.randomTask');
    randomTaskPlaceholder.textContent = "";
    updateCounterText();
}

//Fnction that randomly pick a task for you among the available ones, not those marked as complete.
//And prints it on the screen.
function helpMe(event){
    if (leftToDoTaskList.length == 2){
        let taskIndex = (Math.random()>=0.5)? 1 : 0;
        let randomTaskPlaceholder = document.querySelector('.randomTask');
        randomTaskPlaceholder.textContent = leftToDoTaskList[taskIndex];
        let randomTaskContainer = document.querySelector('.randomTaskContainer');
        randomTaskContainer.style.display = 'block';
    }else if(leftToDoTaskList.length >= 1){
        let taskIndex = Math.floor(Math.random()*leftToDoTaskList.length);
        let randomTaskPlaceholder = document.querySelector('.randomTask');
        randomTaskPlaceholder.textContent = leftToDoTaskList[taskIndex];
        let randomTaskContainer = document.querySelector('.randomTaskContainer');
        randomTaskContainer.style.display = 'block';
    }
}

//Handles the click on a task icon. If it should be checked or deleted
function checkOrDelete(event){
    if(event.target.name == 'checkBtn'){
        checkToDo(event);
    }
    if(event.target.name == 'deleteBtn'){
        deleteToDo(event);
    }
}

//Adds a new item to the ToDoList and if input empty display error message
function addTaskToList(event){
    event.preventDefault();
    let input = document.querySelector('input');
    let emptyMessage = document.querySelector('.emptyMessage');
    if(input.value != ""){
        addToDo(input.value);
        input.value = "";
        if(emptyMessage.style.display != "none"){
            emptyMessage.style.display = "none";
        }
    }else{
        emptyMessage.style.display = "block";
    }
}

//The actual add of a ToDo is here, adds the task both in HTML and in Javascript array
function addToDo(ToDo){
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    li.innerHTML = `
        <span class="ToDo-Item">${ToDo}</span>
        <button class="itemButtons" name="checkBtn"><i class="fas fa-check-square"></i></button>
        <button class="itemButtons" name="deleteBtn"><i class="fas fa-trash"></i></button>
    `;
    li.classList.add('ToDoItem');
    ul.appendChild(li);
    leftToDoTaskList.push(ToDo);
    updateCounterText();
}

//Check or uncheck task depending on it's current state
function checkToDo(event){
    let item = event.target.parentElement;
    let taskId = leftToDoTaskList.indexOf(item.innerText);
    
    if(item.style.textDecoration == 'line-through'){
        item.style.textDecoration = 'none';
        item.style.color ="rgb(36, 25, 25)"
        leftToDoTaskList.push(item.innerText);
        doneTaskList.splice(taskId,1);
    }else{
        item.style.textDecoration = 'line-through';
        item.style.color = "rgb(0,255,13)";
        doneTaskList.push(item.innerText);
        leftToDoTaskList.splice(taskId,1);
    }
    updateCounterText();
}

//Deletes a todo item from the list with a little animation
function deleteToDo(event){
    let taskToDelete = event.target.parentElement;
    let leftTask = leftToDoTaskList.indexOf(taskToDelete.innerText);
    if (leftTask>=0){
        leftToDoTaskList.splice(leftTask,1);
    }
    let doneTask = doneTaskList.indexOf(taskToDelete.innerText);
    if (doneTask>=0){
        doneTaskList.splice(doneTask,1);
    }
    //Handle the counter that prints how many tasks are done and how many there are left to do.
    updateCounterText();
    taskToDelete.addEventListener('transitionend',function(){
        taskToDelete.remove();
    })
    taskToDelete.classList.add('ToDoItem-fall');
    
}

function updateCounterText(){
    let counterText = document.querySelector('.CounterText');
    counterText.innerText = doneTaskList.length + " of " + (leftToDoTaskList.length+doneTaskList.length) + " tasks done"
}