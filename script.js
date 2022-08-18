$(document).ready(function () {
    // Page heading
    $(".title").text("Hello! This is a password strength checker")

    // CSS STYLING
    $("body").css({
        "padding": "15px"
    })

    $("div.container").css({
        "margin": "auto"
    })

    $("div.form-control").css({
        "margin-bottom": "15px",
        "position": "relative"
    })

    $("label").css({
        "display": "block",
        "margin-bottom": "7px"
    })

    $("input").css({
        "padding": "8px",
        "width": "100%"
    })

    $("span.psw-visibilty").css({
        "padding": "3px",
        "border": "1px solid #E2DFD2",
        "font-size": "0.8rem",
        "cursor": "pointer",
        "position": "absolute",
        "right": "-15px",
        "top": "35px"
    })

    $("#strengthBar").css({
        "background-color": "yellow",
        "width": "0%",
        "height": "10px",
        "border-radius": "10px"
    });


    $("#submitBtn").css({
        "padding": "8px",
        "cursor": "pointer",
        "margin-left": "auto",
        "margin-right": "auto"
    });



    // Global declarations and initialization
    let passwordRemark = ""


    // EVENTS LISTENING
    // check on each keyup
    $("#password").keyup(function () {
        passwordStrength()
    })


    // Check if repeat password matches password
    $("#rPassword").keyup(function () {
        checkMatch()
    })

    // Password and repeat password visibility toggling
    // password
    $("#pswToggler").click(function () {
        let password = $("#password");
        let toggler = $(this)
        togglePasswordVisibility(password, toggler)
    })

    // Repeat password
    $("#rPswToggler").click(function () {
        let password = $("#rPassword");
        let toggler = $(this)
        togglePasswordVisibility(password, toggler)
    })

    // Submit form
    $("#submitBtn").click(function (e) {
        e.preventDefault()

        submitForm()

    })





    // FUNCTIONS
    //Check password strength
    let passwordStrength = function () {
        let passwordValue = $("#password").val();
        let numPattern = /([0-9])/;
        let smallLetterPattern = /[a-z]/;
        let bigLetterPattern = /[A-Z]/
        let specialPattern = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/
        console.log(passwordValue.length)
        if (passwordValue.length < 8) {
            $("#strengthBar").css({
                "background-color": "red",
                "width": "20%"
            });

            passwordRemark = "Very Weak"
        }

        if (passwordValue.length >= 8) {
            $("#strengthBar").css({
                "background-color": "orange",
                "width": "40%"
            });

            passwordRemark = "Weak"
        }

        if (passwordValue.length >= 8 &&
            ((passwordValue.match(smallLetterPattern) && passwordValue.match(bigLetterPattern)) ||
                (passwordValue.match(smallLetterPattern) && passwordValue.match(numPattern)) ||
                (passwordValue.match(smallLetterPattern) && passwordValue.match(specialPattern)) ||
                (passwordValue.match(bigLetterPattern) && passwordValue.match(numPattern)) ||
                (passwordValue.match(bigLetterPattern) && passwordValue.match(specialPattern)) ||
                (passwordValue.match(numPattern) && passwordValue.match(specialPattern)))) {
            $("#strengthBar").css({
                "background-color": "yellow",
                "width": "60%"
            });

            passwordRemark = "Fair"
        }

        if (passwordValue.length >= 8 &&
            ((passwordValue.match(smallLetterPattern) &&
                    passwordValue.match(bigLetterPattern) && passwordValue.match(numPattern)) ||
                (passwordValue.match(smallLetterPattern) &&
                    passwordValue.match(bigLetterPattern) && passwordValue.match(specialPattern)) ||
                (passwordValue.match(smallLetterPattern) &&
                    passwordValue.match(numPattern) && passwordValue.match(specialPattern)) ||
                (passwordValue.match(bigLetterPattern) &&
                    passwordValue.match(numPattern) && passwordValue.match(specialPattern)))) {
            $("#strengthBar").css({
                "background-color": "yellowgreen",
                "width": "80%"
            });
            passwordRemark = "Good"
        }

        if (passwordValue.length >= 8 && (passwordValue.match(smallLetterPattern) &&
                passwordValue.match(bigLetterPattern) && passwordValue.match(numPattern) &&
                passwordValue.match(specialPattern))) {
            $("#strengthBar").css({
                "background-color": "green",
                "width": "100%"
            });

            passwordRemark = "Very Good"
        }

    }


    // Check whether password and repeat password matches
    let checkMatch = function () {
        let passwordValue = $("#password").val();
        let repeatPasswordValue = $("#rPassword").val();
        if (repeatPasswordValue === passwordValue) {
            $("#rPasswordTip").text("Passwords are similar")
            console.log("Password: ", passwordValue)
            console.log("Repeat: ", repeatPasswordValue)
        } else {
            $("#rPasswordTip").text("Passwords are not similar")
            console.log("Password: ", passwordValue)
            console.log("Repeat: ", repeatPasswordValue)
        }
    }


    // Passwords visibility toggling functions
    let togglePasswordVisibility = function (password, toggler) {
        if (password.attr("type") === "password") {
            password.attr("type", "text")
            toggler.text("Hide")
        } else {
            $(password).attr("type", "password")
            toggler.text("View")
        }
    }


    // display form details on submission
    let submitForm = function () {
        // Hide form container
        $(".container").hide();

        // Create details display div
        let detailsPage = document.createElement("div")
        detailsPage.id = "detailsPage"

        // Details page title
        let detailsTitle = "<h3>Password Strength Checker Summary</h3>"

        // Get Email input
        let emailValue = $("#email").val();
        let displayEmail = ""
        var emailPattern = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (emailValue == "") {
            displayEmail = "<b>Email: </b>" + "No Email."
        } else if (emailValue.match(emailPattern)) {
            displayEmail = "<b>Email: </b>" + emailValue
        } else {
            displayEmail = "<b>Email: </b>" + emailValue + " *(Your email address is invalid.)"
        }

        // Get password strength
        // let strengthIndicatorValue = $("#strengthBar").width();
        let passwordValue = $("#password").val();
        let strengthRemark = ""
        if (passwordValue == "") {
            strengthRemark = "<b>Password Strength: </b>" + "NO PASSWORD."
        } else {
            strengthRemark = "<b>Password Strength: </b>" + passwordRemark.toUpperCase()
        }


        // Get repeat password match
        let repeatPasswordValue = $("#rPassword").val();
        let matchRemark = ""
        if (repeatPasswordValue == "") {
            matchRemark = "<b>Password Match: </b>" + "No value in repeat password field."
        } else if (repeatPasswordValue === passwordValue) {
            matchRemark = "<b>Password Match: </b>" + "Passwords match."
        } else {
            matchRemark = "<b>Password Match: </b>" + "Passwords did not match."
        }


        detailsPage.innerHTML = detailsTitle + "<br>" + displayEmail + "<br>" + strengthRemark + "<br>" + matchRemark + "<br><br><br><br><h3>Thanks for trying our app"
        $("body").append(detailsPage);
    }

});