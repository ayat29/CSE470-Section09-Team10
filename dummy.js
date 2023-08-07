const UserDetails = require('./models/userModel');

UserDetails.register({ email: "a@a", username : "a" }, "a", (err, user) => {
    if (err) {
        console.log("Registration failed");
    } else {
        console.log("Registration successful")
    }
});
UserDetails.register({ email: "b@b", username : "b" }, "b", (err, user) => {
    if (err) {
        console.log("Registration failed");
    } else {
        console.log("Registration successful")
    }
});