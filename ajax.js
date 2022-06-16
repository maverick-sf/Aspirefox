let fetchBtn = document.getElementById("fetchBtn");


fetchBtn.addEventListener('click', btnhandler);

function btnhandler() {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', 'https://jsonplaceholder.typicode.com/posts/1', true);
    xhr.setRequestHeader('Content-type', 'application/json', 'charset=UTF-8');

    // params = "userId=4&id=5&title=unt aut facere repellat provident occaecati excepturi optio reprehenderit&body = quia et suscipit\ nsuscipit recusandae consequuntur expedita et cum\ nreprehenderit molestiae ut ut quas totam\ nnostrum rerum est autem sunt rem eveniet architecto "
    // params = `{"name":"test34sad545","salary":"123","age":"23"}`
    params = JSON.stringify({
            id: 2,
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        xhr.send(params);
    xhr.onload = function() {
        if (xhr.status === 200) {
            debugger
            let data = xhr.responseText;
            let data1 = data;
            console.log(data1);
            displayFetchData(data1);
        } else {
            console.log("Some error")
        }
    }
}
let displayFetchData = (data1) => {
    let htmlTemplate = ` <h3>${data1}</h3>`;
    document.querySelector("#fetch-card").innerHTML = htmlTemplate;
};

// function btnhandler() {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://dummy.restapiexample.com/api/v1/create', true);
//     xhr.getResponseHeader('Content-type', 'application/json');

//     // params = "userId=1&id=1&title=unt aut facere repellat provident occaecati excepturi optio reprehenderit&body = quia et suscipit\ nsuscipit recusandae consequuntur expedita et cum\ nreprehenderit molestiae ut ut quas totam\ nnostrum rerum est autem sunt rem eveniet architecto "
//     params = `{"name":"test34sad545","salary":"123","age":"23"}`;
//     xhr.send(params);
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             let data = xhr.responseText;
//             let data1 = JSON.parse(data);
//             console.log(data1);
//             displayFetchData(data1);
//         } else {
//             console.log("Some error")
//         }
//     }
// }
// let displayFetchData = (data1) => {
//     let htmlTemplate = ` <h3>${data1}</h3>`;
//     document.querySelector("#fetch-card").innerHTML = htmlTemplate;
// };


let backupBtn = document.getElementById("backupBtn");

backupBtn.addEventListener('click', btnhandler1);

function btnhandler1() {
    console.log("backup-btn clicked ")
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);


    xhr.send();
    xhr.onload = function() {
        if (xhr.status === 200) {
            let data = xhr.responseText;
            let data2 = JSON.parse(data);
            console.log(data2);
            let list = document.getElementById("list");
            str = "";
            for (key in data2) {
                str += `<li>${data2[key].id}</li>`;
            }
            displayBackupData(data2);
        } else {
            console.log("Some error")
        }
    }
}
let displayBackupData = (data2) => {
    let htmlTemplate = ` <h3> ${data2}</h3>`;
    document.querySelector("#backup-card").innerHTML = htmlTemplate;
};