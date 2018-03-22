var url = "/";
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
});

//klikken om button -> values van form naar server sturen
var submitBtn = document.querySelector(".submitBtn");
if(submitBtn){
    submitBtn.addEventListener("click", function(e){
        primus.write({test: "Test"});
        e.preventDefault();
    });
}

primus.on("data", function(data){
    alert("test!");
});