let taskForm = document.querySelector("#task-form");

// localStorage.clear();

taskForm.addEventListener("submit", function() {
    let taskinput = document.querySelector("#input-item");
    let task = taskinput.value.trim();
    //get task
    let tasklist = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];
    tasklist.unshift(task);
    //set to local storage
    localStorage.setItem("task", JSON.stringify(tasklist));
    displayTask();
    window.reload();
});
//display
let tasklistEl = document.querySelector("#task-list");
let displayTask = () => {

    let tasklist = [];
    tasklist = !!localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];
    let eachTask = '';

    if (tasklist.length > 0) {
        for (let task of tasklist) {
            eachTask += `<li class="list-group-item list-group-item-action list-group-item-primary"><span>${task}</span><br><button class="close"><i class="fa-solid fa-xmark d-flex justify-content-end"></i></button></li>`;
        }
    }
    tasklistEl.innerHTML = eachTask;
};
displayTask();


//remove tasks
let taskListEl = document.querySelector("#task-list");
taskListEl.addEventListener("click", function(event) {
    // console.log(event.target);
    let targetElement = event.target;
    if (targetElement.classList.contains("fa-solid fa-xmark")) {
        console.log("yes");
    } else {
        console.log("No");
        let actualEl = targetElement.parentElement.parentElement;
        // console.log(actualEl)
        let selectedEl = actualEl.innerText;
        // console.log(selectedEl);

        // get task from localstorage
        let tasklist = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];
        tasklist = tasklist.filter(function(task) {
            return task.trim() !== selectedEl.trim(); //execpt the selected element others will be visible (it will be filtered)
        });
        // console.log(tasklist);
        localStorage.setItem("task", JSON.stringify(tasklist));
    }
    displayTask();

})