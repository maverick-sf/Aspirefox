var price;
var removeModal = document.getElementsByName("removeModal");

//calculating price
function totalPrice() {

    var selected = document.getElementsByName("item");
    var i;
    var numberOfDropdowns = selected.length;
    var tmpSelectValue;


    price = 0;

    for (i = 0; i < numberOfDropdowns; i++) {
        tmpSelectValue = selected[i].options[selected[i].selectedIndex].value
        price += parseFloat(tmpSelectValue);
    }
    $("#Calculatedval").val(price)


}



var emptyRow = "<tr><td colspan='6' class='text-center'> No Records Available</td></tr>";

//ajax request for card

let http = new XMLHttpRequest();



http.open('get', 'products.json', true);

http.send();


http.onload = function() {

    if (this.readyState == 4 && this.status == 200) {

        let products = JSON.parse(this.responseText);

        let output = "";


        for (let item of products) {
            output += `
				<div class="product">
					<img src="${item.ImageUrl}" alt="Book Image" class="img w-100 d-block">
					<p class="title text-center pt-3 pb-2">${item.Name}</p>
					<p class="description">Author: ${item.Author}</p>
					<p class="description">Genre: ${item.Genre}</p>
					<p class="description">Reviews: ${item.Ratings}</p>
					<p class="description">Available Quantity: ${item.QuantityAvailable}</p>
					<p class="description">Unit Price: ${item.HourlyPrice}</p>
				</div>
			`;
        }

        document.querySelector(".products").innerHTML = output;
    }
}



// table

$(document).ready(function() {
    $("#addBtn").click(function() {

        })
        // loadDataFromLocal();
    $('#tblData').on('click', '.btn-new', function() {
        $("#addModal").modal('show');
    });

    //     const name = $(this).parent().parent().find(".txtName").html();
    //     const contact = $(this).parent().parent().find(".txtContact").html();
    //     const altContact = $(this).parent().parent().find(".txtAltNo").html();
    //     const address = $(this).parent().parent().find(".txtAddress").html();
    //     const price = $(this).parent().parent().find("#tPrice").html();
    //     const id = $(this).parent().parent().find(".txtName").attr("data-id");
    //     $("#txtName").val(name);
    //     $("#txtContact").val(contact);
    //     $("#txtAltNo").val(altContact);
    //     $("#txtAddress").val(address);
    //     $("#txtId").val(id);
    //     $("#btnSave").text("Update");
    // });

    // $(".btn-remove").click(function() {
    //     $("#removeModal").modal('show');
    $('#tblData').on('click', '.btn-remove', function() {
        $("#removeModal").modal('show');
        deleteDataFromLocal(id);
    });
    $("#btnSave").click(function() {
        debugger;
        if ($("#txtId").val() == '') {
            addDataToLocal();
        } else {
            updateDataFromLocal();
        }
    });

    $("#btnClear").click(function() {
        debugger;
        clearForm();
    });
});

function clearForm() {
    debugger;
    $("#txtName").val("");
    $("#txtContact").val("");
    $("#txtAltNo").val("");
    $("#txtAddress").val("");
    $("#btnSave").text("Add");
}

function addEmptyRow() {
    debugger;
    if ($("#tblData tbody").children().children().length == 0) {
        $("#tblData tbody").append(emptyRow);
    }
}

function loadDataFromLocal() {
    debugger;
    let localData = localStorage.getItem('localData');
    if (localData) {
        $("#tblData tbody").html("");
        let localArray = JSON.parse(localData);
        let index = 1;
        localArray.forEach(element => {
            let dynamicTR = "<tr>";
            dynamicTR = dynamicTR + "<td> " + index + "</td>";
            dynamicTR = dynamicTR + "<td class='txtName'  data-id=" + element.id + ">" + element.name + "</td>";
            dynamicTR = dynamicTR + "<td class='txtContact'>" + element.contact + "</td>";
            dynamicTR = dynamicTR + "<td class='txtAltNo'>" + element.altContact + "</td>";
            dynamicTR = dynamicTR + "<td class='txtAddress'>" + element.address + "</td>";
            dynamicTR = dynamicTR + "<td class='tPrice'>" + element.tPrice + "</td>";
            dynamicTR = dynamicTR + "<td class='tdAction text-center'>";
            dynamicTR = dynamicTR + "<button class='btn btn-sm btn-success btn-new'> Add New Book</button>";
            dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-danger btn-remove'> Remove</button>";
            dynamicTR = dynamicTR + "  </td>";
            dynamicTR = dynamicTR + "</tr>";
            $("#tblData tbody").append(dynamicTR);
            index++;
        });
    }
    addEmptyRow();
}

function addDataToLocal() {
    debugger;
    let localData = localStorage.getItem('localData');
    if (localData) {
        let localArray = JSON.parse(localData);
        const obj = {
            id: localArray.length + 1,
            name: $("#txtName").val(),
            contact: $("#txtContact").val(),
            altContact: $("#txtAltNo").val(),
            address: $("#txtAddress").val()
        };
        localArray.push(obj);
        localStorage.setItem('localData', JSON.stringify(localArray));
        loadDataFromLocal();
    } else {
        const arryObj = [];
        const obj = {
            id: 1,
            name: $("#txtName").val(),
            contact: $("#txtContact").val(),
            altContact: $("#txtAltNo").val(),
            address: $("#txtAddress").val()
        };
        arryObj.push(obj);
        localStorage.setItem('localData', JSON.stringify(arryObj));
        loadDataFromLocal();
    }
    clearForm();
}

function updateDataFromLocal() {
    debugger;
    let localData = localStorage.getItem('localData');
    let localArray = JSON.parse(localData);
    const oldRecord = localArray.find(m => m.id == $("#txtId").val());
    oldRecord.name = $("#txtName").val();
    oldRecord.contact = $("#txtContact").val();
    oldRecord.altContact = $("#txtAltNo").val();
    oldRecord.address = $("#txtAddress").val();
    localStorage.setItem('localData', JSON.stringify(localArray));
    loadDataFromLocal();
    clearForm();
}

function deleteDataFromLocal(id) {
    debugger;
    let localData = localStorage.getItem('localData');
    let localArray = JSON.parse(localData);
    let i = 0;
    while (i < localArray.length) {
        if (localArray[i].id === Number(id)) {
            localArray.splice(i, 1);
        } else {
            ++i;
        }
    }
    localStorage.setItem('localData', JSON.stringify(localArray));
    loadDataFromLocal();
}
$("#frm").validate({
    rules: {
        name: "required",
        phone: {
            required: true,
            minlength: 10
        },
        dob: {
            required: true,
        },
        address: "required",
        bookSelect: "required",
        Select: "required",
    },
    messages: {
        name: "Please Enter your Name",
        phone: {
            required: "please enter your Phone Number",
            minlength: "Enter at least 10 digits"
        },
        password: {
            required: "please enter your password",
            minlength: "password must be aleast of 5 characters"
        },
        dob: "Please enter correct DOB",
        address: "Please enter your address",
        bookSelect: "Please choose any of the following",
        select: "Please choose a book",
    },
    submitHandler: function(form) {
        form.submit();
    }
})