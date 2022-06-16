let addNewEmployee = document.getElementById("addNewEmployee");
let modal = document.getElementById("favDialog");
let closeModal = document.getElementById("cancelModal");
let modalForm = document.getElementById("modal-form");
let submitModal = document.getElementById("submitModal");

let tableContainerHeader = document.querySelector(".table-container-header");
let tableContainerContent = document.querySelector(".table-container-content");

let empTable = document.getElementById("employeeTable");

const showModal = addNewEmployee.addEventListener("click", function() {
    modal.showModal();
});

closeModal.addEventListener("click", function() {
    modal.close();
});

let employeeId = document.getElementById("employeeId");
let employeeName = document.getElementById("employeeName");
let designation = document.getElementById("designation");
let salary = document.getElementById("salary");
let uniqueEmpId = document.getElementById("empDetailId");

let tr = null;
let empDetails = [];

if (localStorage.getItem("empDetails")) {
    empDetails.map((empDetail) => {
        createTableRow(empDetail);
    });
}

let onModalSubmit = modal.addEventListener("submit", function(e) {
    e.preventDefault();
    if (tr == null) {

        if (employeeId && employeeName && designation && salary != "") {
            let empDetail = {
                id: new Date().getTime(),
                name: {
                    employeeIdLocal: employeeId.value,
                    employeeNameLocal: employeeName.value,
                    designationLocal: designation.value,
                    salaryLocal: salary.value,
                    uniqueEmpId: new Date().getTime(),
                },
            };

            modal.close();

            empDetails.push(empDetail);

            localStorage.setItem("empDetails", JSON.stringify(empDetails));

            modalForm.reset();

            createTableRow(empDetail);
        }
    } else {
        tableUpdate(e);
    }
});

/////// Create Table Row

function createTableRow(empDetail) {

    const tEmployeeMarkup = `
  <tr class="fullEmpDetail">
    <td id="teId">${empDetail.name.employeeIdLocal}</td>
    <td id="teName">${empDetail.name.employeeNameLocal}</td>
    <td id="teDesignation">${empDetail.name.designationLocal}</td>
    <td id="teSalary">$${empDetail.name.salaryLocal}</td>
    <td>
      <i class="fas fa-eye"></i>
      <i value="Edit" type="button" id="update-row" class="edit-row fas fa-pencil-alt"></i>
      <i value="Delete" type="button" class="remove-row fas fa-trash-alt"></i>
    </td>
    <td id="empDetailId" class="empDetailId">${empDetail.id}</td>
  </tr>
`;

    empTable.innerHTML += tEmployeeMarkup;

    document.getElementById("modal-form").reset();
}


///////  Remove Row

function onDeleteRow(e) {
    if (!e.target.classList.contains("remove-row")) {

        return;
    }

    const btn = e.target;
    btn.closest("tr").remove();
}

tableContainerContent.addEventListener("click", onDeleteRow);

//////////// Edit Row

tableContainerContent.addEventListener("click", onEditRow);

function onEditRow(e) {
    if (e.target.classList.contains("edit-row")) {


        modal.showModal();


        tr = e.target.parentNode.parentNode;
        // console.log(tr);

        let tableEmpId = tr.cells[0].textContent;
        let tableEmpName = tr.cells[1].textContent;
        let tableEmpDesignation = tr.cells[2].textContent;
        let tableEmpSalary = tr.cells[3].textContent;

        employeeId.value = tableEmpId;
        employeeName.value = tableEmpName;
        designation.value = tableEmpDesignation;
        salary.value = tableEmpSalary;
    }
}

///////////////// Update Row

function tableUpdate(e) {
    let tableEmpId = document.getElementById("teId");
    let tableEmpName = document.getElementById("teName");
    let tableEmpDesignation = document.getElementById("teDesignation");
    let tableEmpSalary = document.getElementById("teSalary");

    tr.cells[0].textContent = employeeId.value;
    tr.cells[1].textContent = employeeName.value;
    tr.cells[2].textContent = designation.value;
    tr.cells[3].textContent = salary.value;


    modalForm.reset();
    modal.close();

    let tableEmpIDs = document.querySelectorAll(".empDetailId");

    let empDetails = JSON.parse(localStorage.getItem("empDetails"));

    for (let row = 0; row < tableEmpIDs.length; row++) {
        for (let i = 0; i < empDetails.length; i++) {
            empDetails[i].name.employeeIdLocal = tableEmpId.textContent;
            empDetails[i].name.employeeNameLocal = tableEmpName.textContent;
            empDetails[i].name.designationLocal = tableEmpDesignation.textContent;
            empDetails[i].name.salaryLocal = tableEmpSalary.textContent;
            break;
        }
    }

    localStorage.setItem("empDetails", JSON.stringify(empDetails));


}