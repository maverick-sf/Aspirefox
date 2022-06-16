$(document).ready(function() {

})
$("#frm").validate({
    rules: {
        name: "required",
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 5
        },
        marks: "required",
        checkbox: "required",
        Select: "required",
    },
    messages: {
        name: "Please Enter your Name",
        email: {
            required: "please enter your Email",
            minlength: "Please enter a valid email"
        },
        password: {
            required: "please enter your password",
            minlength: "password must be aleast of 5 characters"
        },
        marks: "Please enter your marks",
        checkbox: "Please agree to the statement",
        checkbox: "Please choose any of the following",
    },
    submitHandler: function(form) {
        form.submit();
    }
})