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
        var question = document.querySelector(".question").value;
        var answer1 = document.querySelector(".answer1").value;
        var answer2 = document.querySelector(".answer2").value;
        primus.write({
            question: question,
            answer1: answer1,
            answer2: answer2
        });
        e.preventDefault();
    });
}

primus.on("data", function(data){
    var poll = document.querySelector(".poll");
    if(poll){
        poll.innerHTML = "<h2>"+data.question+"</h2><button type='button'>"+data.answer1+"</button><button type='button'>"+data.answer2+"</button>";
    }
});