"use strict";

$(document).ready(function () {
  // jQuery methods go here...
  // Page heading
  $(".title").text("Hello! this is a password strength checker"); // Global declarations and initialization

  var numPattern = /([0-9])/;
  var smallLetterPattern = /[a-z]/;
  var bigLetterPattern = /[A-Z]/;
  var specialPattern = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
  $("#strengthBar").css({
    "background-color": "yellow",
    "width": "0%",
    "height": "10px"
  }); // check on each keyup

  $("#password").keyup(function () {
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
  }); // Check if repeat password matches password

  $("#rPassword").keyup(function () {
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
  });
  $("#visibilityToggler").click(function () {
    var password = $("#password");

    if ($(password).attr("type") === "password") {
      $(password).attr("type", "text");
      $(this).text("Hide");
    } else {
      $(password).attr("type", "password");
      $(this).text("View");
    }
  });
});