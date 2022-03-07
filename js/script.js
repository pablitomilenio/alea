let page = 1;
let per_page = 1;
let totPages = 3;


function toggleBoxes() {
    if (typeof $.cookie('token') != 'undefined') { //user is logged in
        $("#logsq").hide();
        $("#usersq").show();
        $("#lgoutsq").show();
        $("#err404").show();
        $("#usrtbl").show();
    } else { // user is logged out
        $("#logsq").show();
        $("#usersq").hide();
        $("#err404").hide();
        $("#usrtbl").hide();
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
            "password": $("#loginpwd").val(),
        },
        success: function (response) {
            console.log("Setting login cookie")
            $.cookie("token", JSON.stringify(response.token));
            toggleBoxes();
        },
        error:function (xhr, ajaxOptions, thrownError){
                console.log(xhr.status+" "+thrownError);
                alert("Credentiasl Error. Email does not exist in database")
        }
    });
}

function doLogout() {
    console.log("doLogout");
    $.removeCookie("token");
    toggleBoxes();
}

$(document).ready(function () {
    toggleBoxes();
    listUsers();
});


function listUsers() {
    per_page = $("#perpage").val();
    if (page < 1) page = 1;
    if (page > totPages) page = totPages;
    console.log("listing...");
    $.ajax({
        url: "https://reqres.in/api/users?page="+page+"&per_page="+per_page,
        type: "GET",
        data: {
        },
        success: function (response) {
            let theArr = [];
            let tblString = "";
            totPages = response.total_pages;
            //console.log(response.total_pages);
            for (i = 0; i < response.data.length; i++) {
                theArr = response.data[i];
                $.each(theArr, function (key, value) {
                    tblString += "<tr>";
                    tblString += "<td>" + key + "</td>";
                    tblString += "<td>" + value + "</td>";
                    tblString += "</tr>";
                });
            }
            //console.log(response);
            $("#maintbl").html(tblString);
        },
        error:function (xhr, ajaxOptions, thrownError){
            console.log(xhr.status+" "+thrownError);
        }
    });
}


function user23() {
    console.log("show error page");
    $.ajax({
        url: "https://reqres.in/api/users/23",
        type: "GET",
        error:function (xhr, ajaxOptions, thrownError){
                console.log(xhr.status);
                if (xhr.status == 404) window.open("404err.html")
        }
    });
}
