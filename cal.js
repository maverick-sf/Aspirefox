//all Elements
const his = document.querySelector(".his");
const current = document.querySelector(".current");
const temp = document.querySelector(".temp");
const number = document.querySelectorAll(".number");
const operation = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".clear");
// const last_clear = document.querySelector(".last-clear");
const backspace = document.querySelector(".backspace");

//variables we need

let num1 = "";
let num2 = "";
let result = null;
let last = "";
let haveDot = false;
number.forEach(number => {
    //dot
    number.addEventListener("click", (e) => {
        if (e.target.innerText == "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText == "." && haveDot) {
            return;
        }
        num2 += e.target.innerText;
        current.innerText = num2;
    })
});

//Operations

operation.forEach(operation => {
    operation.addEventListener("click", (e) => {
        if (!num2) {
            return;
        }
        haveDot = false; //agar hum koi operation kkre and 2nd wale no. m "dot" lagana ho toh pehle hume false krna pdega 
        const operationName = e.target.innerText;
        if (num1 && num2 && last) { //agr humare paas num1 and num2 dono h and koi operation bhi h toh mathOperation function kaam krega
            mathOperation();
        } else {
            result = parseFloat(num2); //joh bhi hum display krwa rahe h...vo string k form m h...but hume opeartion krnne k lie number k form m chaie oh hum parse krenge

            //parsefloat -> string leta h nd return krta h first number ko
        }
        clearItem(operationName);
        last = operationName; //!!********
        console.log(result); //jb bhi hum operation pr click r e h....tb last (recent) vaues console m show ho rahi h
    })
});

//Update value in current, his, temp

function clearItem(item = "") { //item mera operation h jo bhi perform karunga

    num1 += num2 + " " + item + " ";
    his.innerText = num1; //history m num1 show hojae operation daalte hi 
    current.innerText = ""; //current wala part khali hojaae
    num2 = ""; //num2 khali krdunda new value add krne k lie
    temp.innerText = result; //temp m result dikha dunga(jo bhi number mne add kia nd calculate hone k baad result ki value ko )

}
//All Maths operation

function mathOperation() {
    if (last === "*") {
        result = parseFloat(result) * parseFloat(num2);
    }
    if (last === "-") {
        result = parseFloat(result) - parseFloat(num2);
    }
    if (last === "+") {
        result = parseFloat(result) + parseFloat(num2);
    }
    if (last === "/") {

        result = parseFloat(result) / parseFloat(num2); {
            if (result == 0) { result = result.innerText = "Undefined" }
        }

    }
    if (last === "%") {
        result = parseFloat(result) % parseFloat(num2);
    }

}
//Equal 

equal.addEventListener("click", (e) => {
        if (!num2 || !num1) {
            return;
        }
        haveDot = false;
        mathOperation();
        clearItem(); //saari jagah value update krne k lie
        current.innerText = result;
        temp.innerText = "";
        num2 = result;
        num1 = "";

    })
    //clearAll

clearAll.addEventListener("click", (e) => {
    current.innerText = "0";
    his.innerText = "0";
    temp.innerText = "0";
    result = "";
    num1 = "";
    num2 = "";
});

//backspace

backspace.addEventListener("click", (e) => {
    current.innerText = current.innerText.slice(0, -1);


});
// last_clear.addEventListener("click", (e) => {
//     current.innerText = "0";
//     num2 = "";
// });


//Keyboard

document.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickButton(e.key);
    } else if (
        e.key === "*" ||
        e.key === "+" ||
        e.key === "-" ||
        e.key === "%" ||
        e.key === "/") {
        clickOperation(e.key);
    } else if (e.key === "Enter" || e.key === "=") {
        clickEqual();
    }
});

function clickButton(key) {
    number.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickOperation(key) {
    operation.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickEqual() {
    equal.click();
}
