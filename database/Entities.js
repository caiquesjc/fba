module.exports = {
    
    User: require("./models/User"),

    list: function() {
        return Object.values(this)
    }
}