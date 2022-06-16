$(document).ready(function() {
    $("#myTable").DataTable({
        "ajax": "https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001",
        "columns": [
            { "data": "id" },
            { "data": "imageUrl" },
            { "data": "firstName" },
            { "data": "lastName" },
            { "data": "email" },
            { "data": "data" },
            { "data": "age" },
            { "data": "dob" },

        ]

    });
})