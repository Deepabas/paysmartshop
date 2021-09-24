//Loads the express module
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

//Creates our express server
const app = express();
const port = 3000;

//create database connection

require('dotenv').config();

const user_routes = require('./server/routes/User');
const mobile_routes = require('./server/routes/Mobile');

//connect flash
app.use(flash())

//create bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//handlebarsetting

app.set('view engine', "hbs");
app.engine('hbs', exphbs({
    extname: "hbs",
    defaultlayout: "main",
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
}));

app.use(express.static('public'))

const SESS_NAME = 'sid'
//Express session middleware
app.use(session({
    name:SESS_NAME,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
  }))

app.use('/',user_routes);

 app.use('/',mobile_routes);


/*app.get('/', (req, res) => {
    res.render('home')

});*/
app.get('/About', (req, res) => {
    res.render('about')

});
app.get('/login', (req, res) => {
    res.render('login')

});

app.get('/Signup', (req, res) => {
    res.render('signup')
});
/*app.get('/Mobile', (req, res) => {
    res.render('mobile')
});*/
app.get('/DTH', (req, res) => {
    res.render('dth')
});
app.get('/Datacard', (req, res) => {
    res.render('datacard')
});
app.get('/Landline', (req, res) => {
    res.render('landline')
});
app.get('/Broadband', (req, res) => {
    res.render('broadband')
});
app.get('/Electricity', (req, res) => {
    res.render('electricity')
});
app.get('/Gas', (req, res) => {
    res.render('gas')
});
app.get('/Metro', (req, res) => {
    res.render('metro')
});
app.get('/Water', (req, res) => {
    res.render('water')
});
app.get('/Recharge_Summary', (req, res) => {
    res.render('recharge_summary')
});
app.get('/Dashboard', (req, res) => {
    res.render('dashboard')
});
app.get('/Profile', (req, res) => {
    res.render('profile')
});
app.get('/Profile_Cards', (req, res) => {
    res.render('profile-cards')
});
app.get('/Transactions', (req, res) => {
    res.render('transactions')
});
app.get('/Transactions_Details', (req, res) => {
    res.render('transactions-details')
});
app.get('/Profile_Notifications', (req, res) => {
    res.render('profile-notifications')
});
app.get('/Recharge_Order', (req, res) => {
    res.render('recharge-order')
});
app.get('/Recharge_Payment', (req, res) => {
    res.render('recharge-payment')
});
app.get('/Recharge_done',(req,res)=>
{
    res.render('recharge-done') 
})
app.get('/Contact',(req,res)=>
{
    res.render('contact')
});
app.get('/History',(req,res)=>
{
    res.render('history')
});
app.get('/Bank_Accounts',(req,res)=>
{
    res.render('profile-cards-and-bank-accounts')
});
//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));




//connection pool
/*const pool = mysql.createPool({
    connectionLimit : 100,
    host            :process.env.DB_HOST,
    user            :process.env.DB_USER,
    password        :process.env.DB_PASS,
    database        :process.env.DB_NAME

});

//connect to database
pool.getConnection((err,connection)=>{
if(err) throw err; //database not connected 
console.log('connected as ID' + connection.threadId);
});*/
