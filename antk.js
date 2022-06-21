$(document).ready(function() {
    console.log("Hello");

    $("#newModalForm").validate({
        rules: {
            pName: {
                required: true,
                minlength: 8
            },
            action: {
                required: true,
                minlength: 10

            },
            dob: {
                required: true,


            }
        },
        messages: {
            pName: {
                required: "Please enter some data",
                minlength: "Your data must be at least 8 characters"
            },
            action: {
                required: "Please enter valid phone number",
            },
            dob: {
                required: "Please enter valid date of birth",
            }
        }
    });
});