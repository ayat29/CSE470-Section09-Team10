// importing modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1/users',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
  
  
var UserSchema = new Schema({   
    email: {type: String, required:true, unique:true},
    username : {type: String, unique: true, required:true},
});
  
// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);
  
// export userschema
 module.exports = mongoose.model("User", UserSchema);