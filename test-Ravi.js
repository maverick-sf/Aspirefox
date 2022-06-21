$(document).ready(() => {
    if (localStorage.getItem('localData') != null) {
        if ($('#tbody').html() == "") {
            formTable();
        } else {
            $('#tbody').html("");
            formTable();
        }
    }
})
let tempdata = "";


$(document).ready(function() {
    $.getJSON("test-Ravi.json", function(data) {
        tempdata = data;
        let headArr = Object.keys(tempdata[0]);
        console.log(headArr);

        const cardDiv = $('#cardDiv');
        for (let i = 0; i < tempdata.length; i++) {
            const card = $('<div class="card col-sm-6 m-1" style="width: 20rem;"></div>');
            const imgC = $("<img>");
            imgC.attr({
                class: "card-img-top shadow imageCard",
                src: `${tempdata[i].ImageUrl}`,
                style: "width: 16rem; height: 180px;"
            })
            const cardBody = $('<div></div>');
            cardBody.attr("class", "card-body");
            const p1 = $(`<p class="card-text fs-5">Author: ${tempdata[i].Author} </P>`);
            const p2 = $(`<p class="card-text fs-5">Genre: ${tempdata[i].Genre} </P>`);

            const p3 = $(`<p class="card-text fs-5">Rating: ${tempdata[i].Rating} </P>`);
            const p4 = $(`<p class="card-text fs-5">Available Qty: ${tempdata[i].QuantityAvailable} </P>`);
            const p5 = $(`<p class="card-text fs-5">Unit Price: ${tempdata[i].Price} </P>`);
            cardBody.append(p1);
            cardBody.append(p2);
            cardBody.append(p3);
            cardBody.append(p4);
            cardBody.append(p5);

            card.append(imgC)
            card.append(cardBody);

            cardDiv.append(card);
        }

    }).fail(function() {
        console.log("Cant find the data.");
    });
})





$('#showModal').click(function() {

    $('#dob').change(function() {

        for (let i = 0; i < tempdata.length; i++) {
            if (calAge($('#dob').val()) >= 10 && calAge($('#dob').val()) < 13) {
                if (tempdata[i].Genre != "Horror") {
                    const opt = $(`<option></option>`);
                    opt.attr({
                        value: `${tempdata[i].Name}`,
                    });
                    opt.text(`${tempdata[i].Name}`);
                    $('#selectBook').append(opt)
                }
            } else {
                const opt = $(`<option></option>`);
                opt.attr({
                    value: `${tempdata[i].Name}`,
                });
                opt.text(`${tempdata[i].Name}`);
                $('#selectBook').append(opt)
            }


        }
    })


    $('#selectBook').change(() => {
        $('#totalPrice').text(findPrice($('#selectBook').val()))
    })



    $('#saveBtn').click(function() {

        let newObj = {};


        let theadArr = ["name", "phoneNo", "dob", "address", "selectBook", "totalPrice"];
        for (let i = 0; i < 6; i++) {
            if (i == 4) {
                if ($(`#${theadArr[i]}`).val() != "") {
                    let newArr = [];
                    newArr.unshift($(`#${theadArr[i]}`).val())
                    newObj[theadArr[i]] = newArr;
                } else {
                    return
                }
            } else if (i == 5) {

                if ($('#selectBook').val() != "") {
                    let price = findPrice($('#selectBook').val());
                    console.log(price);
                    newObj["totalPrice"] = price

                } else {
                    return;
                }

            } else {
                if ($(`#${theadArr[i]}`).val() != "") {
                    newObj[theadArr[i]] = $(`#${theadArr[i]}`).val();
                } else {
                    return;
                }
            }


        }
        console.log(newObj);

        if (localStorage.getItem('localData') == null) {
            let newData = [];
            //create table
            newData.unshift(newObj);
            localStorage.setItem('localData', JSON.stringify(newData));
            console.log(JSON.parse(localStorage.getItem('localData')));
            // debugger
            if ($('#tbody').html() == "") {
                formTable();
            } else {
                $('#tbody').html("");
                formTable();
            }
        } else {
            let currRec = JSON.parse(localStorage.getItem('localData'))
            currRec.unshift(newObj);
            localStorage.setItem('localData', JSON.stringify(currRec));

            if ($('#tbody').html() == "") {
                formTable();
            } else {
                $('#tbody').html("");
                formTable();
            }
        }

        var myAlert = document.getElementById('toastNotice');
        var bsAlert = new bootstrap.Toast(myAlert);
        bsAlert.show();
    });

    // Validation
    $("#addBorrowerForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phoneNo: {
                required: true,
                number: true,
                minlength: 10
            },
            dob: {
                required: true
            },
            address: {
                required: true
            },
            selectBook: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Please enter you name",
                minlength: "length of name must be 2"
            },
            phoneNo: {
                required: "please enter you 10 digit mobile no.",
                minlength: "Enter valid mob no.",
                number: "mobile no. shoud be in numeric"
            },
            dob: {
                required: "Please enter you date of birth"
            },
            address: {
                required: "Please enter your resident address"
            },
            selectBook: {
                required: "please select a book."
            },
            submitHandler: function(form) {
                form.submit();

            }
        }
    });

});



//Calculating price
function findPrice(str) {
    for (let i = 0; i < tempdata.length; i++) {
        if (tempdata[i].Name == str) {
            return tempdata[i].Price;
        }
    }
}

//creating table
function formTable() {
    let localData = JSON.parse(localStorage.getItem('localData'));

    let headerArr = Object.keys(localData[0]);
    for (let i = 0; i < localData.length; i++) {
        const row = $('<tr></tr>');
        row.attr({
            id: `${localData[i].name}`
        });

        for (let j = 0; j < headerArr.length; j++) {
            const td = $('<td></td>');

            td.text(localData[i][headerArr[j]]);
            row.append(td);
        }


        const currRow = $('<td></td>')
        const rtnBtn = $('<button id="rtnModal" class="btn btn-danger">Return</button>');
        rtnBtn.attr('onclick', 'returnBookFun(this)')
        const addBookBtn = $('<button id="addBookButton" class="btn btn-success">Add Book</button>');
        addBookBtn.attr("onclick", "addBookFunction(this)")
        currRow.append(rtnBtn);
        currRow.append(addBookBtn);
        row.append(currRow);
        $('#tbody').append(row);

    }


    $('#myTable').DataTable();
}



function addBookFunction(e) {
    $('#addBook').modal('show');
    let bookList = tempdata;
    let targetRow = $(e).parent().parent().attr("id");

    let tempRec = JSON.parse(localStorage.getItem('localData'));

    $('#selectAddBook').empty();
    for (let j = 0; j < bookList.length; j++) {
        let optionB = $(`<option value="${bookList[j].Name}"></option`);
        optionB.text(bookList[j].Name);
        $('#selectAddBook').append(optionB);

    }
    $('#selectAddBook').change(() => {
        $('#bKPrice').text(findPrice($('#selectAddBook').val()))
    })
    $('#addBook1').click(() => {
        console.log('clicked');
        for (let i = 0; i < tempRec.length; i++) {
            if (tempRec[i].name == targetRow) {

                let bookArr = tempRec[i].selectBook;
                let newBook = $('#selectAddBook').val();


                bookArr.unshift(newBook)

                tempRec[i].selectBook = bookArr;

                let bookcost = tempRec[i].totalPrice;

                let currBkPrice = findPrice($('#selectAddBook').val());
                let newp = bookcost + currBkPrice;

                tempRec[i].totalPrice = parseInt(newp);
                console.log(tempRec[i]);
                localStorage.setItem('localData', JSON.stringify(tempRec));


                //updating table
                if ($('#tbody').html() == "") {
                    formTable();
                } else {
                    $('#tbody').html("");
                    formTable();
                }




            }
        }
    })

    $('#addBook').modal('hide');

}


function returnBookFun(e) {
    $('#returnBook').modal('show');
    let tempRec = JSON.parse(localStorage.getItem('localData'));

    let targetRow = $(e).parent().parent().attr("id");

    for (let i = 0; i < tempRec.length; i++) {
        if (tempRec[i].name == targetRow) {
            let bookArr = tempRec[i].selectBook;

            $('#selectReturnBook').empty();
            for (let j = 0; j < bookArr.length; j++) {
                const opt = $('<option></option>')
                opt.val(`${bookArr[j]}`);
                opt.text(`${bookArr[j]}`);
                $('#selectReturnBook').append(opt);
            }

            //updating price
            $('#selectReturnBook').change(() => {

                let totalCost = tempRec[i].totalPrice;

                let currBookPrice = findPrice($('#selectReturnBook').val());
                console.log("bk price", currBookPrice);
                let newPrice = totalCost - currBookPrice;
                $('#rtnPrice').text(newPrice);
            })
        }
    }

    $('#returnBtn').click(() => {
        for (let i = 0; i < tempRec.length; i++) {
            if (tempRec[i].name == targetRow) {
                let nbookList = tempRec[i].selectBook;
                console.log(nbookList);
                let currBook = $('#selectReturnBook').val();

                for (let j = 0; j < nbookList.length; j++) {
                    if (nbookList[j] == currBook) {
                        nbookList.splice(j, 1);
                    }
                    console.log("BooksList", nbookList);
                    tempRec[i].selectBook = nbookList;
                    let ntotalPrice = $('#rtnPrice').text();
                    tempRec[i].totalPrice = ntotalPrice;
                    console.log(tempRec[i].totalPrice);

                    //updating table
                    localStorage.setItem('localData', JSON.stringify(tempRec));
                    if ($('#tbody').html() == "") {
                        formTable();
                    } else {
                        $('#tbody').html("");
                        formTable();
                    }


                }
            }
        }
        var myAlertR = document.getElementById('toastRemove');
        var bsAlertR = new bootstrap.Toast(myAlertR);
        bsAlertR.show();
    })



    $('#returnBook').modal('hide');
}








// Calculate age
function calAge(str) {

    let year = new Date(str).getFullYear();

    // let count = 0;
    // for(let i=str.length-4;i<str.length;i++){
    //     year += str[i];
    // }
    let today = new Date().getFullYear();
    return today - year;
}