// $.ajax({
//     url: "https://reqres.in/api/users",
//     type: "POST",
//     data: {
//         name: "paul rudd",
//         movies: ["I Love You Man", "Role Models"]
//     },
//     success: function(response){
//         console.log(response);
//         $("#tar1").text(JSON.stringify(response));
//     }
// });



function toggleBoxes () {
    if (typeof $.cookie('token') != 'undefined') { //user is logged in
        $("#logsq").hide();
        $("#usersq").show();
        $("#lgoutsq").show();
    } else { // user is logged out
        $("#logsq").show();
        $("#usersq").hide();
        $("#lgoutsq").hide();
    }
}

function doLogin() {
    console.log("doLogin");
    $.ajax({
    url: "https://reqres.in/api/login",
    type: "POST",
    data: {
        "email": $("#loginemail").val(),
        "password": "chau"
    },
    success: function(response){
        console.log("Setting login cookie")
        $.cookie("token",JSON.stringify(response.token));
        toggleBoxes();
    }
});
}

function doLogout() {
    console.log("doLogout");
    $.removeCookie("token");
    toggleBoxes();
}

$( document ).ready(function() {
    toggleBoxes();
});


function createUser() {
    console.log("createUser");
    $.ajax({
    url: "https://reqres.in/api/users",
    type: "POST",
    data: {
        "email": $("#usremail").val(),
        "first_name": $("#usrfname").val(),
        "last_name": $("#usrlname").val()
    },
    success: function(response){
        console.log("Saved User:"+$("#usrlname").val())
    }
});
}