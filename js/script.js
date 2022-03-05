$.ajax({
    url: "https://reqres.in/api/users",
    type: "POST",
    data: {
        name: "paul rudd",
        movies: ["I Love You Man", "Role Models"]
    },
    success: function(response){
        console.log(response);
        $("#tar1").text(JSON.stringify(response));
    }
});

$.ajax({
    url: "https://reqres.in/api/login",
    type: "POST",
    data: {
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
    },
    success: function(response){
        $("#tar2").text(JSON.stringify(response));
    }
});