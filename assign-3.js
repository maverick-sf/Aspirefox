let fetchBtn = document.getElementById("fetchBtn");
fetchBtn.addEventListener("click", btnhandler);

const table = document.getElementById('emp-table')

function btnhandler() {
    console.log("Employee details are fetched");
    const xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001', true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status === 200) {
            let data = xhr.responseText;
            let data1 = JSON.parse(data)
            console.table(data1);

            localStorage.setItem("hi", data)
            displayEmployeeData(data1);

        } else {
            console.log("Some error there...Trying to resolve")
        }
    }

}





//display on screen
let displayEmployeeData = (data) => {
    rows = data.length
    colLen = Object.keys(data[0]).length
    cols = Object.keys(data[0])
    console.log(colLen, cols);

    tr = document.createElement('tr')
    for (let i = 0; i < colLen; i++) {
        th = document.createElement('th')
        th.innerText = cols[i]
        tr.appendChild(th)
    }
    table.appendChild(tr)

    for (let i = 0; i < rows; i++) {
        trData = data[i]
        tr = document.createElement('tr')

        for (let j = 0; j < colLen; j++) {
            td = document.createElement('td')
            td.innerText = Object.values(trData)[j]
            tr.appendChild(td)
        }

        table.appendChild(tr)
            //     let d2 = ``;
            //     for (let emp of data1) {
            //         d2 += ` <tr><th>ID</th><th>FIRST</th><th>LAST</th><th>AGE</th><th>EMAIL</th><th>SALARY</th></tr><tr><td>${emp.id}</td><td>${emp.firstName}</td><td>${emp.lastName}</td><td>${emp.age}</td><td>${emp.email}</td><td>${emp.salary}</td></tr>
            //    `
            //         document.querySelector("#emp-table").innerHTML = d2;
            //     }
    }
}