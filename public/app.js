// Select the Elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const modalContent = document.getElementById('modal-body')
const input = document.getElementById('input');
const taskInput = document.getElementById('taskNameInput')
const modalTitle = document.getElementById('exampleModalLabel')
let selectedList

// Classes names
const checkit = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addList(item.name, item.id, item.done, item.trash);
    });
}

// clear the localstorage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addList(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? checkit : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `  <li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p id="${id}" class="text ${LINE}" onclick="selectList(event)" data-toggle="modal" data-target="#exampleModal">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                        </li>
                        `;
    // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    // Launch
    // </button>

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

function selectList(event) {
    const listId = event.target.id

    LIST.forEach(list => {
        console.log(list)
        if (list.id === Number(listId)) {
            selectedList = list
        }
    })

    renderTasks()

}

function renderTasks() {
    modalTitle.innerHTML = selectedList.name

    // Remove all modal content
    modalContent.innerHTML = ""

    // Loop through selectedList.lists and render each task into the modal content
    tasksToRender = ""
    selectedList.tasks.forEach(task => {
        tasksToRender += `
        <li class="item">
          <i class="fa ${task.done} co" job="complete" id="${task.id}"></i>
          <p id="${task.id}" class="text ${task.done ? LINE_THROUGH : ""}" onclick="selectList(event)">${task.name}</p>
          <i class="fa fa-trash-o de" job="delete" id="${task.id}"></i>
        </li>
      `;
    })

    modalContent.insertAdjacentHTML("beforeend", tasksToRender)
}

function addTask(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? checkit : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `  <li class="item">
                      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                      <p class="text ${LINE}">${toDo}</p>
                      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                      </li>
                      `;

    const position = "beforeend";
    modalContent.insertAdjacentHTML(position, item);
}


// add an item to the list user the enter key
input.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // if the input isn't empty
        if (toDo) {
            addList(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
                tasks: []
            });

            // add item to localstorage (this code must be added where the LIST array updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});
taskInput.addEventListener("keyup", function(event) {

    if (event.keyCode == 13) {

        const toDo = taskInput.value;

        // if the input isn't empty
        if (toDo) {

            selectedList.tasks.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });

            renderTasks()

            // add item to localstorage (this code must be added where the LIST array updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

// complete to do
function completeToDo(element) {
    element.classList.toggle(checkit);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", function(event) {
    const element = event.target; // return the clicked element inside list
    if (element.attributes.job) {

        const elementJob = element.attributes.job.value; // complete or delete

        if (elementJob == "complete") {
            completeToDo(element);
        } else if (elementJob == "delete") {
            removeToDo(element);
        }

        // add item to localstorage (this code must be added where the LIST array updated)
        localStorage.setItem("TODO", JSON.stringify(LIST));
    }
})