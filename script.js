//Selectors
document.querySelector('form').addEventListener('submit',addTaskToList);
document.querySelector('ul').addEventListener('click',deleteToDo);

//Lists
const leftToDoTaskList = new Array();
const doneTaskList = new Array();


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
        <button class="deleteItemButton" name="deleteBtn">🗑️</button>
    `;
    li.addEventListener("click",checkToDo)
    ul.appendChild(li);
    leftToDoTaskList.push(ToDo);
    updateCounterText();
}

//Check or uncheck task depending on it's current state
function checkToDo(event){
    let item = event.target.parentElement;
    let taskId = leftToDoTaskList.indexOf(item.innerText);
    
    if(item.getAttribute("class") == "ToDo-Item-Completed"){
        item.setAttribute("class","ToDo-Item");
        item.style.color = "rgb(0,0,0)";
        leftToDoTaskList.push(item.innerText);
        doneTaskList.splice(taskId,1);
    }else{
        item.setAttribute("class", "ToDo-Item-Completed");
        item.style.color = "rgb(231,231,231)";
        doneTaskList.push(item.innerText);
        leftToDoTaskList.splice(taskId,1);
    }
    updateCounterText();
}

//Deletes a todo item from the list with a little animation
function deleteToDo(event){
    ul = document.querySelector('ul')
    if(event.target.name == 'deleteBtn'){
        let taskToDelete = event.target.parentElement;
        console.log(taskToDelete.innerText);
        let leftTask = leftToDoTaskList.indexOf(taskToDelete.innerText);
        if (leftTask>=0){
            leftToDoTaskList.splice(leftTask,1);
        }
        let doneTask = doneTaskList.indexOf(taskToDelete.innerText);
        if (doneTask>=0){
            doneTaskList.splice(doneTask,1);
        }
        ul.removeChild(taskToDelete)
        //Handle the counter that prints how many tasks are done and how many there are left to do.
        updateCounterText(taskToDelete.innerText);
    }
    
}

function updateCounterText(){
    let counterText = document.querySelector('.CounterText');
    counterText.innerText = doneTaskList.length + " of " + (leftToDoTaskList.length+doneTaskList.length) + " tasks done"
}