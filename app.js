//text-button

let textButton = document.querySelector('#text-btn');
textButton.addEventListener('click', function() {
    //ajax

    //create ajax req
    let xhr = new XMLHttpRequest;

    //prepare the req
    xhr.open('GET', '/msg.txt', true);


    //send req
    xhr.send();

    //process req
    xhr.onload = () => {
        if (xhr.status === 200) {
            let data = xhr.responseText;
            console.log(data);
            displayTextData(data);
        }
    };
});
//display text data
let displayTextData = (data) => {
    let htmlTemplate = `<h3>${data}</h3>`;
    document.querySelector("#text-card").innerHTML = htmlTemplate;
};

//json-btn
let jsonBtn = document.querySelector("#json-btn");
jsonBtn.addEventListener('click', function() {
    //ajax
    //create req
    let xhr = new XMLHttpRequest;
    //open
    xhr.open('GET', 'mobiles.json', true);
    //send
    xhr.send();
    //process
    xhr.onload = () => {
        if (xhr.status === 200) {
            let data = xhr.responseText;
            let mobile = JSON.parse(data)
            console.log(mobile);
            displayJsonData(mobile);
        }
    };
});
let displayJsonData = (mobile) => {
    let d2 = ``;
    d2 = `
    <ul>
    <li>ID:${mobile.id}</li>
    <li>Brand:${mobile.brand}</li>
    <li>COLOR:${mobile.color}</li>
    <li>PRICE:${mobile.price}</li>
    </ul>`
    document.querySelector("#json-card").innerHTML = d2;
}

//API-btn
let apiBtn = document.querySelector("#api-btn");
apiBtn.addEventListener('click', function() {
    //ajax
    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status === 200) {
            let data = xhr.responseText;
            let users = JSON.parse(data)
            console.log(users);
            displayApiData(users);
        }
    };
});

let displayApiData = (users) => {
    let d3 = ``;
    for (let user of users) {
        d3 += `
    <ul>
    <li>ID:${user.id}</li>
    <li>Name:${user.name}</li>
    <li>EMAIL:${user.email}</li>
   
    </ul>`;
    }
    document.querySelector("#api-card").innerHTML = d3;


};