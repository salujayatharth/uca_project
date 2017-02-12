module.exports = {
log: function(route){
    console.log(new Date() +" "+ route.stack[0].method+ " " + route.path)
}
}