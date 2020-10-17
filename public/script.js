// selecting elements of app
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_Through = "lineThrough";
let LIST = [];
let id = 0;

function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_Through : "";
    const text = `<li class="item">
                    <i class="fa ${DONE} complete "  job="complete" id="${id}"></li>
                    <p class="text"> ${LINE}">${toDo}</p>
                    <i class="de fa fa-trash-o" job="delete" id="${id}"></li>
                    </li>`

    const position = "beforeend";

    list.insertAdjacentHTML(position, text);

}
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addTod(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            input.value = "";
            id++;
        }
    }

});