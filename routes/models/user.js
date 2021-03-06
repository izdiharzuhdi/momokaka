var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird'); //ADD THIS LINE
Promise.promisifyAll(mongoose); //AND THIS LINE

var fbpageSchema = mongoose.Schema({
    name: String,
    id: { type: String },
    pagetoken: String,
    _isAppSubscribed: { type: String, default: "Not Connected" }
});

var feedSchema = mongoose.Schema({
    received: String,
    send: String,
    imageURL: String,
    replyMSG: String
});

var messengerSchema = mongoose.Schema({
    _isConnected: { type: Boolean, default: false },
    send: String
});

var userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        page: [fbpageSchema],
        feed: [feedSchema]
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);