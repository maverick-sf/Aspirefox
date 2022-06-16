let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhbHBoYXRlc3RpbmczMzNAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiSzFLS0JDaXh5TEtnRW9qMXdGVHpFM0d1Mk9FNmI1OTAwRTJEUDJtUzZCXzVjRm0tWW9hOThrRTBIc0F4c3VuMkl4VSJ9LCJleHAiOjE2NTUwMTQwMDd9.Ae0xsP8EHI_J5N3ybYiVpZr6gr9Z-gIJeSDQ4M113l8";
$(document).ready(function() {
    $.ajax({
        type: "get",
        url: "https://www.universal-tutorial.com/api/getaccesstoken",
        headers: {
            "Accept": "application/json",
            "api-token": "VHxxnVLFLxPV8vz5HLf5DesVonCjOeCB3R_FqlQRqM0EWcENVp-a8Jn3GoAl1A4B1o",
            "user-email": "ravi1301bharadwaj@gmail.com"
        },
        success: function(data) {
            // console.log(data.auth_token);
            getCountry();
        },
        error: function(error) {

        }

    })
    $("#country").change(function() {
        getState();
    })
    $("#state").change(function() {
        getCity();
    })
});

function getCountry() {
    $.ajax({
        type: 'get',
        url: "https://www.universal-tutorial.com/api/countries/",
        headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
        },
        success: function(data) {
            // getState();
            console.log(data);
            // console.log(token); 
            data.forEach(element => {
                $("#country").append('<option value="' + element.country_name + '">' + element.country_name + '</option>')
            });
        },
        error: function(error) {
            console.log(error)
        }

    })
}

function getState() {
    let country_name = $("#country").val();
    $.ajax({
        type: "get",
        url: "https://www.universal-tutorial.com/api/states/" + country_name,
        headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
        },
        success: function(data) {
            $("#state").empty();
            data.forEach(element => {
                $("#state").append('<option value="' + element.state_name + '">' + element.state_name + '</option>')
            });
            // console.log(data)
            // console.log("state : = " + token)

        },
        error: function(error) {
            console.log("error_state")
        },

    })

}

function getCity() {
    let state_name = $("#state").val();
    $.ajax({
        type: "get",
        url: "https://www.universal-tutorial.com/api/cities/" + state_name,
        headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
        },
        success: function(data) {
            $("#city").empty();
            data.forEach(element => {
                $("#city").append('<option value="' + element.city_name + '">' + element.city_name + '</option>')
            });
        },
        error: function(error) {
            console.log("error_city")
        },

    })

}