exports.kickstart = function(server){
    console.log("Wow! dependency injection!");
    const Primus = require("primus");
    let primus = new Primus(server, {/*empty for now*/});
};