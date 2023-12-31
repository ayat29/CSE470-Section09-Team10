if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
}

const express = require("express")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const User = require('./models/userModel');
const checkLoggedIn = require('connect-ensure-login')
const bodyParser = require('body-parser')
const path = require("path")
var cors = require("cors")
var version = require("./react-setup/models/versionModel")

const app = express()

app.use(cors())
app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));

app.set("view-engine", "ejs")
app.use(express.static('public'));
//app.use("/reactapp", express.static("client/build"))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash())

app.use(methodOverride("_method"))

app.get("/home", checkLoggedIn.ensureLoggedIn("/login"), (req, res) => {
    res.render("index.ejs", {name: req.user.username})
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.get("/register", (req, res) => {
    res.render("register.ejs")
})

app.get("/welcome", (req, res) => {
    res.render("home.ejs")
})

app.use("/reactapp", checkLoggedIn.ensureLoggedIn("/login"), express.static(path.join(__dirname, 'public')));

app.get("/save_work", (req, res) => {
    const emailId = req.user.email;
    version.findOneAndReplace({id: emailId}, {id: emailId, data: req.query.data}, {upsert : true}).exec()
})

app.get("/find_save", async (req, res) => {
    const emailId = req.user.email;
    const data = await version.find({ id: emailId}).exec();
    res.send(data[0].data)
})

app.post("/register", (req, res) => {
    User.register({ email: req.body.email, username: req.body.username}, req.body.password, (err, user) => {
        if (err) {
            console.log("Registration failed");
        } else {
            console.log("Registration successful");
            passport.authenticate("local")(req, res, () => {
                res.redirect("/reactapp");
            })
        }
    })
})

app.post("/login", passport.authenticate("local", { failureRedirect: '/login' }),  (req, res) => {
	res.redirect("/reactapp");
});

app.delete("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/login');
    });
})

app.listen(3000)

