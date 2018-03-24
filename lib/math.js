module.exports = {
    getPercent: function(max, current){
        if(max===0){
            return 0;
        }
        return Math.floor((current/max)*100)
    }
}