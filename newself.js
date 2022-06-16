let addBtn = document.getElementById("addBtn");
let modal = document.getElementById("modal-dialog");
let modalForm = document.getElementById("modalForm");
let submitModal = document.getElementById("submitModal");
let tableContainerContent = document.querySelector(".table-container-content");
let empTable = document.getElementById("employeeTable");
let salary = document.getElementById("salary");
let age = document.getElementById("age");
let date = document.getElementById("date");
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let imgUrl = document.getElementById("imgUrl");
let email = document.getElementById("email");
let contact = document.getElementById("contact");
let address = document.getElementById("address");
let onModalSubmit = modal.addEventListener("submit", function(e) {
    e.preventDefault();
    if (tr == null) {
        if (salary && age && date && fName && lName && imgUrl && email && contact && address != "") {
            let empDetail = {
                id: new Date().getTime(),
                name: {
                    imgLocal: imgUrl.value,
                    fNameLocal: fName.value,
                    lNameLocal: lName.value,
                    emailLocal: email.value,
                    contactLocal: contact.value,
                    ageLocal: age.value,
                    dateLocal: date.value,
                    salaryLocal: salary.value,
                    addressLocal: address.value,
                    uniqueEmpId: new Date().getTime(),

                },
            };
            empDetails.unshift(empDetail);
            localStorage.setItem("empDetails", JSON.stringify(empDetail));
        }
    }
});
let tr = null;
let empDetails = []; //array
if (localStorage.getItem("empDetails")) { //local storage m agar data h to empdetail ko empdetails m daalenge
    empDetails.map((empDetail) => {
        createTableRow(empDetail); //function call
    });
}
// let onModalSubmit = modal.addEventListener("submit", function(e) {
//     e.preventDefault();
//     if (tr == null) {
//         if (salary && age && date && fName && lName && imgUrl && email && contact && address != "") {
//             let empDetail = {
//                 id: new Date().getTime(),
//                 name: {
//                     imgLocal: imgUrl.value,
//                     fNameLocal: fName.value,
//                     lNameLocal: lName.value,
//                     emailLocal: email.value,
//                     contactLocal: contact.value,
//                     ageLocal: age.value,
//                     dateLocal: date.value,
//                     salaryLocal: salary.value,
//                     addressLocal: address.value,
//                     uniqueEmpId: new Date().getTime(),

//                 },
//             };
//             empDetails.unshift(empDetail);
//             localStorage.setItem("empDetails", JSON.stringify(empDetail));
//         }
//     }
// });