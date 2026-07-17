const form = document.getElementById("myForm");

let wrongAttempts = 0;
let isLocked = false;

form.addEventListener("submit", function (event) {

    event.preventDefault();
    clearErrors();

    if (isLocked) {
        document.getElementById("passwordError").innerHTML =
            "Password is locked. Try again after 1 minute.";
        return;
    }
    
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let category = document.getElementById("category");
    let reason = document.getElementById("reason");

    let gender = document.querySelector('input[name="gender"]:checked');
    let clubs = document.querySelectorAll('input[name="club"]:checked');

    let valid = true;

    
    // first name
    if (firstName.value.trim() == "") {
        showError(firstName,"firstNameError","First Name is required.");
        valid = false;
    }

    else if (!/^[A-Za-z ]+$/.test(firstName.value.trim())) {
        showError(firstName,"firstNameError","Only letters are allowed.");
        valid = false;
    }
    else {
        showSuccess(firstName);
    }


    //last naeme
    if (lastName.value.trim() == "") {
        showError(lastName,"lastNameError","Last Name is required.");
        valid = false;
    }
    else if (!/^[A-Za-z ]+$/.test(lastName.value.trim())) {
        showError(lastName,"lastNameError","Only letters are allowed.");
        valid = false;
    }
    else {
        showSuccess(lastName);
    }
    
    //email
    if (email.value.trim()=="") {
        showError(email,"emailError","Email is required.");
        valid = false;
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "emailError", "Invalid Email Address.");
        valid = false;
    }
    else {
        showSuccess(email);
    }
    

    //Password = SAGOR1234
    if (password.value=="") {
        showError(password,"passwordError","Password is required.");
        valid = false;
    }
    else if (password.value!="SAGOR1234") {
        wrongAttempts++;

        showError(
            password,
            "passwordError",
            "Wrong Password! Attempt " + wrongAttempts + " of 3."
        );

        valid = false;

        if (wrongAttempts>=3) {
            isLocked = true;

            document.getElementById("passwordError").innerHTML =
                "Too many wrong attempts. Password locked for 1 minute.";

            password.disabled = true;
            setTimeout(function () {

                isLocked = false;
                wrongAttempts = 0;
                password.disabled = false;

                document.getElementById("passwordError").innerHTML ="Password unlocked. Try again.";
            }, 60000);
        }
    }
    else {
        wrongAttempts = 0;
        showSuccess(password);
    }

    //gender
    if (gender == null) {
        document.getElementById("genderError").innerHTML ="Please select your gender.";
        valid = false;
    }


    //club interested
    if (clubs.length==0) {
        document.getElementById("clubError").innerHTML = "Select at least one club.";
        valid = false;
    }


    //club catagory
    if (category.value=="") {
        showError(
            category,
            "categoryError",
            "Please select a club category."
        );
        valid = false;
    }
    else {
        showSuccess(category);
    }


    //reason
    if (reason.value.trim()=="") {
        showError(reason, "reasonError", "Reason is required.");
        valid = false;
    }
    else if (reason.value.trim().length < 20) {
        showError(
            reason,
            "reasonError",
            "Reason must be at least 20 characters."
        );
        valid = false;
    }
    else {
        showSuccess(reason);
    }

    
    //valid
    if (valid) {
        alert("Club Registration Successful!");
        form.reset();
        clearErrors();
    }

});



//error
function showError(input, errorId, message) {
    input.classList.add("errorBorder");
    input.classList.remove("successBorder");
    document.getElementById(errorId).innerHTML = message;
}

//success
function showSuccess(input) {
    input.classList.remove("errorBorder");
    input.classList.add("successBorder");
}

//clear error
function clearErrors() {
    let errors = document.querySelectorAll(".error");
    errors.forEach(function (item) {
        item.innerHTML = "";
    });
    let fields = document.querySelectorAll("input, select, textarea");
    fields.forEach(function (field) {
        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");
    });
}