$(document).ready(function() {
    $("#myTable").DataTable();
})
getData();

function getData() {
    $.get("https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001", function(data, status) {
        if (status == "success") {
            localStorage.setItem("hello", JSON.stringify(data))
        }
    })
    createtable();
}

function createtable() {
    let tempData = JSON.parse(localStorage.getItem("hello"));
    let rowLen = tempData.length;
    let headrr = Object.keys(tempData[0]);
    let colLen = headrr.length;
    let table = $("#myTable")
    thead = $(`<thead></thead>`)
    trhead = $(`<tr></tr>`)
    for (let i = 0; i < colLen; i++) {
        let th = $(`<th></th>`);
        th.text(headrr[i]);
        trhead.append(th);
    }
    thead.append(trhead)
    table.append(thead)

    //tBody
    const tbody = $(`<tbody></tbody>`);
    tbody.attr("id", "tBody");
    for (let i = 0; i < rowLen; i++) {
        const tr = $(`<tr></tr>`);
        tr.attr('id', `${tempData[i].id}`)
        for (let j = 0; j < colLen; j++) {
            let td = $(`<td></td>`);
            td.html(tempData[i][headrr[j]]);
            tr.append(td)
        }
        tbody.append(tr);
        table.append(tbody);
    }
}
$(function() {
    $("#tbody").sortable();
});