module.exports = {
    
    User: require("./models/User"),
    Course: require("./models/Course"),
    Class: require("./models/Class"),
    FinishedClass: require("./models/FinishedClass"),

    list: function() {
        return Object.values(this)
    }
}