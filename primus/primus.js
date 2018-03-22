exports.kickstart = function(server){
    const Primus = require("primus");
    let primus = new Primus(server, {});

    primus.on("connection", function(spark){

    });
};