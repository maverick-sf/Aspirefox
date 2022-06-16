let fetchBtn = document.getElementById("fetchBtn");
// let modalForm = document.getElementById("modalForm")
let modal = document.getElementById("exampleModal")
let addBtn = document.getElementById("addBtn");
let saveBtn = document.getElementById("saveBtn");
let myInput = document.getElementById("myInput");
let submitModal = document.getElementById("submitModal");
const modalForm = document.getElementById("modalForm");
const btn2 = document.getElementById("btn2");
const editclass = document.getElementsByClassName("editclass");
const removeRow = document.getElementsByClassName("removeRow");
const editForm = document.getElementById('editForm');
const finalDelete = document.getElementById("finalDelete");
const table = document.getElementById('emp-table')
const submitEdit = document.getElementById("submitEdit")
var editdData;
var localData;

function getLocalStorage() {
    return localStorage.getItem('hi')
}

window.addEventListener('load', () => {
    if (localStorage.length > 0) {
        displayEmployeeData(JSON.parse(getLocalStorage()))
    } else {
        btnhandler()
    }
})

function btnhandler() {
    // console.log("Employee details are fetched");
    const xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001', true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status === 200) {
            let data = xhr.responseText;
            let data1 = JSON.parse(data)
                // console.table(data1);

            localStorage.setItem("hi", data)
            displayEmployeeData(data1);

        } else {
            console.log("Some error there...Trying to resolve")
        }
    }

}


//display on screen
let displayEmployeeData = (data) => {
    // console.log(data);
    // let keys = Object.keys(data[0]);
    // console.log(keys);

    let rows = data.length;

    let colLen = Object.keys(data[0]).length;
    let cols = Object.keys(data[0])



    tr = document.createElement('tr');

    headerObj = {
        'id': 'ID',
        'imageUrl': 'Image URL',
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'email': 'Email',
        'contactNumber': 'Contact Number',
        'age': 'Age',
        'dob': 'DOB ',
        'salary': 'Salary',
        'address': 'Address'
    };
    for (let i = 0; i < colLen; i++) {
        th = document.createElement('th');
        th.innerText = headerObj[cols[i]]
        tr.appendChild(th)

    }
    th = document.createElement("th")
    th.innerText = "Edit"
    tr.appendChild(th)

    th = document.createElement("th")
    th.innerText = "Delete"
    tr.appendChild(th)
    table.appendChild(tr)

    for (let i = 0; i < rows; i++) {
        trData = data[i];
        tr = document.createElement('tr');

        for (let j = 0; j < colLen; j++) {
            td = document.createElement('td')
            td.innerText = Object.values(trData)[j]
            tr.appendChild(td)

        }
        //edit button
        td = document.createElement("td");
        tr.appendChild(td);
        let btn1 = document.createElement('button');
        btn1.setAttribute("id", "btn1");
        btn1.setAttribute("class", "editclass");
        btn1.setAttribute("class", "editclass", "editing");
        btn1.setAttribute("data-bs-target", "#editModal")
        btn1.setAttribute("data-bs-toggle", "modal")
        btn1.innerText = "Edit";
        td.appendChild(btn1);



        td = document.createElement("td");
        tr.appendChild(td)
        let btn2 = document.createElement('button');
        btn2.setAttribute("id", "btn2");
        btn2.setAttribute("class", "removeRow", "removing");
        btn2.setAttribute("data-bs-target", "#deleteModal")
        btn2.setAttribute("data-bs-toggle", "modal")
        btn2.innerText = "Delete";
        td.appendChild(btn2);
        table.appendChild(tr);
        edit();
        removeData();
    }
}
modalForm.onsubmit = (e) => {
    console.log('u clicked submit');
    // (() => {

    let modalForm = document.getElementById("modalForm");

    // Fetch all the forms we want to apply custom Bootstrap validation styles to

    // Loop over them and prevent submission

    e.preventDefault();

    let newObj = {};
    localData = JSON.parse(getLocalStorage())[0]
    cols = Object.keys(localData) //new values added in modal form
        // cols.shift();
    newObj['id'] = maxID() + 1;

    for (let i = 0; i < modalForm.elements.length - 1; i++) {
        newObj[cols[i + 1]] = modalForm.elements[i].value
    }
    localData.unshift(newObj)
    localStorage.setItem('hi', JSON.stringify(localData))
    table.innerHTML = "";
    console.log(localData);
    displayEmployeeData('localData');
}


function maxID() {
    let max = 0;
    localData = JSON.parse(getLocalStorage());
    for (let i of localData) {
        if (i.id > max)
            max = i.id;
    }
    return max;

}
//edit
// function edit() {

//     let editRow = document.getElementsByClassName('editRow');
//     // edit buttons ko uthane ki lie..jinki class "editclass" h.                                          
//     for (let i of editRow) {
//         i.addEventListener("click", function() {
//             let editID = this.parentElement.parentElement.firstChild.innerText;
//             let edit1 = this.parentElement.parentElement;
//             // console.log(editID);

//             for (let j = 1; j < this.parentElement.parentElement.children.length - 2; j++) {
//                 // if (j === 7)
//                 //     document.getElementsByName('editInput')[j - 1].value = this.parentElement.parentElement.children[j].innerText.replaceAll('/ ', '-')
//                 // else
//                 document.getElementsByName('editInput')[j - 1].value = this.parentElement.parentElement.children[j].innerText;

//                 const editdData = document.getElementsByName('editInput')[j - 1].value;

//                 //adding functionality

//                 const submitEdit = document.getElementById("submitEdit");
//                 submitEdit.addEventListener("click", function(e) {
//                         // debugger;
//                         e.preventDefault();
//                         let newData = JSON.parse(localStorage.getItem("hi"))
//                             // let localData = JSON.parse(localStorage.getItem('hi'))[0];
//                         let newObj = {};
//                         for (i in newData) {
//                             if (Number(editID) === Number(newData[i].id)) {

//                                 newData[i] = newObj;
//                                 console.log(newData);


//                                 localStorage.setItem('hi', JSON.stringify(newData)); // console.log(this.parentElement.parentElement.children[0]);
//                                 // newData = Object.keys(localData)
//                                 // newObj['id'] = this.parentElement.parentElement.children[0];
//                                 // newObj['imageUrl'] = this.parentElement.parentElement.children[1];
//                                 // newObj['firstName'] = this.parentElement.parentElement.children[2];
//                                 // newObj['lastName'] = this.parentElement.parentElement.children[3];
//                                 // newObj['email'] = this.parentElement.parentElement.children[4];
//                                 // newObj['contactNumber'] = this.parentElement.parentElement.children[5];
//                                 // newObj['age'] = this.parentElement.parentElement.children[6];
//                                 // newObj['dob'] = this.parentElement.parentElement.children[7];
//                                 // newObj['salary'] = this.parentElement.parentElement.children[8];
//                                 // newObj['address'] = this.parentElement.parentElement.children[9];
//                                 // newData.unshift(newObj[i]);
//                             } else {
//                                 let table = document.getElementById("emp-table");
//                                 table.innerHTML = "";
//                                 displayEmployeeData(JSON.parse(localStorage.getItem('hi')));
//                                 // table.innerHTML = (JSON.parse(localStorage.getItem('hi')));
//                                 // console.log(JSON.parse(localStorage.getItem('hi')));
//                             }
//                             // localStorage.setItem('hi', JSON.stringify(newData))
//                             // table.innerHTML = "";
//                             // console.log(newData);
//                             // displayEmployeeData(localData);
//                         }

//                     })
//                     // console.log(editForm.elements[j].value);

//                 // for (let k of document.getElementsByName('editInput')) {
//                 //     k.value = 675
//                 // }


//             }
//         });
//     }
// }

//edit function


function edit() {
    let editclass = document.getElementsByClassName('editclass');
    //edit buttons ko uthane k lie                                        
    for (let i of editclass) {
        i.addEventListener("click", function() {
            const currDiv = document.getElementById('editField');
            const editForm = document.createElement('form');
            editForm.setAttribute('class', 'row g-3')
                // importing class name.
                // console.log( this.parentElement.parentElement.firstChild.innerText)
            let editId = this.parentElement.parentElement.firstChild.innerText;
            let editData = JSON.parse(localStorage.getItem('hi'));
            let editArr = Object.keys(editData[0]);
            for (let i = 0; i < editData.length; i++) {
                if (editId == editData[i].id) {
                    for (let j = 0; j < editArr.length; j++)
                    // every key element will take its place
                    {
                        if (j == 0)
                        // kyuki hamaari id disabled h

                        {
                            const div = document.createElement('div');
                            div.setAttribute('class', 'col-md-4');

                            const label = document.createElement('label');
                            label.setAttribute('for', `ip${j}`);
                            label.setAttribute('class', 'form-label');
                            label.innerText = settitle(editArr[j]);

                            const input = document.createElement('input');
                            input.setAttribute('id', `ip${j}`);
                            input.setAttribute('class', 'form-control');
                            // input feild will be 100%.

                            input.setAttribute('disabled', '')

                            input.value = editData[i][editArr[j]];

                            input.setAttribute('required', '');

                            div.appendChild(label);
                            div.appendChild(input);
                            editForm.appendChild(div);
                        } else {
                            const div = document.createElement('div');
                            div.setAttribute('class', 'col-md-4');

                            const label = document.createElement('label');
                            label.setAttribute('for', `ip${j}`);
                            label.setAttribute('class', 'form-label');
                            label.innerText = settitle(editArr[j]);

                            const input = document.createElement('input');
                            input.setAttribute('id', `ip${j}`);
                            input.setAttribute('class', 'form-control');
                            input.value = editData[i][editArr[j]];

                            input.setAttribute('required', '');

                            div.appendChild(label);
                            div.appendChild(input);
                            editForm.appendChild(div);
                        }
                    }
                }
            }
            // doing this so that it does make duplication
            if (currDiv.innerHTML == "") {
                currDiv.appendChild(editForm);

            } else {
                currDiv.innerHTML = "";
                currDiv.appendChild(editForm);

            }

            // what should happen after clicking save changes button in the modal
            document.getElementById('editbtn').addEventListener('click', () => {

                let newData = JSON.parse(localStorage.getItem('hi'))
                let newObj = {};

                for (let i = 0; i < editArr.length; i++) {
                    if (document.getElementById(`ip${i}`).value == "") {
                        alert('field is empty');

                        return;
                    } else {

                        newObj[editArr[i]] = document.getElementById(`ip${i}`).value;
                    }

                    // id of the input box .value
                    // an entire new object is created.
                }


                for (let i = 0; i < newData.length; i++) {
                    if (newObj.id == editData[i].id) {
                        newData[i] = newObj;
                        console.log(newData);

                        localStorage.setItem('hi', JSON.stringify(newData));
                        // createtable();
                        if (document.getElementById('emp-table').innerHTML == "") {
                            displayEmployeeData(JSON.parse(localStorage.getItem('hi')));
                            // taking the data from localstorage and creating table.
                        } else {
                            document.getElementById('emp-table').innerHTML = "";
                            displayEmployeeData(JSON.parse(localStorage.getItem('hi')));
                        }
                    }
                }
            })
        })
    }
}

//settitle function
function settitle(str) {
    let newstr = "";
    for (let i = 0; i < str.length; i++) {
        if (i == 0) {
            newstr += str[i].toUpperCase();
        } else {
            if (str[i] == str[i].toUpperCase()) {
                newstr += " " + str[i];
            } else {
                newstr += str[i]
            }
        }
    }
    return newstr;

}
//delete
function removeData() {
    let removeRow = document.getElementsByClassName('removeRow'); //className se saare btn lelo

    for (let i of removeRow) { //loop chalao btn ko baari bari access krne k lie
        i.addEventListener("click", function() {
            let rowId = this.parentElement.parentElement.firstChild.innerHTML; //row ki id ko uthange 
            console.log(rowId);
            const finalDelete = document.getElementById("finalDelete"); //modal k andar ka btn
            finalDelete.addEventListener("click", function() {
                let hi = JSON.parse(localStorage.getItem("hi"))
                for (i in hi) { //local storage k object ko baari baari access karega
                    if (Number(rowId) === Number(hi[i].id)) { //agar toh row ki id match hojaati h localstorage ki object ki id se while clicking on the button
                        hi.splice(i, 1); //local storage m se vo wala object splice krdo
                        break; //break krdo...aage mt badho
                    }
                }
                localStorage.setItem("hi", JSON.stringify(hi))
                table.innerHTML = ""; //already wali table hta do...so that we can add new and updated table
                displayEmployeeData(hi); //table wale function m...localstorage ka data bhej do
                if (!i.classList.contains("removeRow")) {

                    return;
                }
                const btn = i;
                btn.closest("tr").remove();
            });
        });
    }
}
//search

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    let count = 0;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("emp-table");
    tr = table.getElementsByTagName("tr");
    let found;
    for (i = 0; i < tr.length; i++) {
        // for (j = 0; j < colLen; j++) {
        tds = tr[i].getElementsByTagName("td");
        for (let j = 0; j < tds.length; j++) {
            if (tds[j]) {
                txtValue = tds[j].innerText;
                // console.log('88888', txtValue);
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    // found = tr[i];
                    // count++
                    break
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    // console.log(count, found)
    // count = 0
}
// }