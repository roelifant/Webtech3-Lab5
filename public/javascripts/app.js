var url = "/";
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
});

//klikken op button -> values van form naar server sturen
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

//klikken op antwoorden -> naar server sturen
var answerButton1 = document.querySelector(".answer1");
var answerButton2 = document.querySelector(".answer2");
if(answerButton1 != null){
    answerButton1.addEventListener("click", function(e){
        console.log("1");
        primus.write({action: "option 1"});
        e.preventDefault();
    });
    answerButton2.addEventListener("click", function(e){
        console.log("2");
        primus.write({action: "option 2"});
        e.preventDefault();
    });
}

//button link
if(document.querySelector(".ask")){
    document.querySelector(".ask").addEventListener("click", function(){
        window.location.replace("/createpoll");
    });
}

var votes1 = 0;
var votes2 = 0;
primus.on("data", function(data){
    var poll = document.querySelector(".poll");
    var animate1 = document.querySelector(".animate1");
    var animate2 = document.querySelector(".animate2");

    if(poll && data.question){
        document.querySelector("h2").innerHTML = "Answer this question!"
        document.querySelector("h1").innerHTML = data.question;
        document.querySelector(".answer1").innerHTML = data.answer1;
        document.querySelector(".answer2").innerHTML = data.answer2;
        document.querySelector(".ask").style.display = "none";
        poll.style.display = "inline";
    }

    if(poll && data.action){
        if(data.action === "option 1"){
            console.log("optie 1 ontvangen!");
            votes1 = votes1 + 1;
            animate1.style.width = (votes1*1.5)+"%";
            document.querySelector("p").style.left = ((votes1*1.5)+32)+"%";
            document.querySelector("p").innerHTML = votes1;
        }
        if(data.action === "option 2"){
            console.log("optie 2 ontvangen");
            votes2 = votes2 + 1;
            animate2.style.width = (votes2*1.5)+"%";
            document.querySelector("p:last-of-type").style.left = ((votes2*1.5)+32)+"%";
            document.querySelector("p:last-of-type").innerHTML = votes2;
        }
    }
});