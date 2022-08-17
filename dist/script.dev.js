"use strict";

$(document).ready(function () {
  // Page heading
  $(".title").text("Hello! this is a password strength checker"); // CSS STYLING

  $("body").css({
    "padding": "15px"
  });
  $("div.container").css({
    "margin": "auto"
  });
  $("div.form-control").css({
    "margin-bottom": "15px",
    "position": "relative"
  });
  $("label").css({
    "display": "block",
    "margin-bottom": "7px"
  });
  $("input").css({
    "padding": "8px",
    "width": "100%"
  });
  $("span.psw-visibilty").css({
    "padding": "3px",
    "border": "1px solid #E2DFD2",
    "font-size": "0.8rem",
    "cursor": "pointer",
    "position": "absolute",
    "right": "-15px",
    "top": "35px"
  });
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
  }); // Global declarations and initialization

  var numPattern = /([0-9])/;
  var smallLetterPattern = /[a-z]/;
  var bigLetterPattern = /[A-Z]/;
  var specialPattern = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/; // EVENTS LISTENING
  // check on each keyup

  $("#password").keyup(function () {
    passwordStrength();
  }); // Check if repeat password matches password

  $("#rPassword").keyup(function () {
    checkMatch();
  }); // Password and repeat password visibility toggling
  // password

  $("#pswToggler").click(function () {
    var password = $("#password");
    var toggler = $(this);
    togglePasswordVisibility(password, toggler);
  }); // Repeat password

  $("#rPswToggler").click(function () {
    var password = $("#rPassword");
    var toggler = $(this);
    togglePasswordVisibility(password, toggler);
  }); // Submit form

  $("#submitBtn").click(function () {}); // FUNCTIONS
  //Check password strength

  var passwordStrength = function passwordStrength() {
    var passwordValue = $("#password").val();
    console.log(passwordValue.length);

    if (passwordValue.length < 8) {
      $("#strengthBar").css({
        "background-color": "red",
        "width": "20%"
      });
    }

    if (passwordValue.length >= 8) {
      $("#strengthBar").css({
        "background-color": "orange",
        "width": "40%"
      });
    }

    if (passwordValue.length >= 8 && (passwordValue.match(smallLetterPattern) && passwordValue.match(bigLetterPattern) || passwordValue.match(smallLetterPattern) && passwordValue.match(numPattern) || passwordValue.match(smallLetterPattern) && passwordValue.match(specialPattern) || passwordValue.match(bigLetterPattern) && passwordValue.match(numPattern) || passwordValue.match(bigLetterPattern) && passwordValue.match(specialPattern) || passwordValue.match(numPattern) && passwordValue.match(specialPattern))) {
      $("#strengthBar").css({
        "background-color": "yellow",
        "width": "60%"
      });
    }

    if (passwordValue.length >= 8 && (passwordValue.match(smallLetterPattern) && passwordValue.match(bigLetterPattern) && passwordValue.match(numPattern) || passwordValue.match(smallLetterPattern) && passwordValue.match(bigLetterPattern) && passwordValue.match(specialPattern) || passwordValue.match(smallLetterPattern) && passwordValue.match(numPattern) && passwordValue.match(specialPattern) || passwordValue.match(bigLetterPattern) && passwordValue.match(numPattern) && passwordValue.match(specialPattern))) {
      $("#strengthBar").css({
        "background-color": "yellowgreen",
        "width": "80%"
      });
    }

    if (passwordValue.length >= 8 && passwordValue.match(smallLetterPattern) && passwordValue.match(bigLetterPattern) && passwordValue.match(numPattern) && passwordValue.match(specialPattern)) {
      $("#strengthBar").css({
        "background-color": "green",
        "width": "100%"
      });
    }
  }; // Check whether password and repeat password matches


  var checkMatch = function checkMatch() {
    var passwordValue = $("#password").val();
    var repeatPasswordValue = $("#rPassword").val();

    if (repeatPasswordValue === passwordValue) {
      $("#rPasswordTip").text("Password are similar");
      console.log("Password: ", passwordValue);
      console.log("Repeat: ", repeatPasswordValue);
    } else {
      $("#rPasswordTip").text("Password are not similar");
      console.log("Password: ", passwordValue);
      console.log("Repeat: ", repeatPasswordValue);
    }
  }; // Passwords visibility toggling functions


  var togglePasswordVisibility = function togglePasswordVisibility(password, toggler) {
    if (password.attr("type") === "password") {
      password.attr("type", "text");
      toggler.text("Hide");
    } else {
      $(password).attr("type", "password");
      toggler.text("View");
    }
  };
});