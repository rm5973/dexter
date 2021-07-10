
 
const express = require("express");
const path = require("path");
const fs = require("fs")
const  bodyparser= require("body-parser");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dexter:dexteract007@cluster0.h7bii.mongodb.net/gym?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() =>{
  console.log('connected to db')
})
const port = 80;

const gymSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address:String,
    more:String,
  });
  var item= mongoose.model('item', gymSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
// PUG SPECIFIC STUFF
// app.set('view engine', 'pug') // Set the template engine as pug
// app.set('views', path.join(__dirname, 'views')) // Set the views directory
//const back=fs.readFileSync("./index.html")
// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'gym content', "content": con}
    res.sendFile(__dirname+"/index.html")
    // res.status(200).sendDate('index.html', params);
})

app.post('/',(req,res)=>{
  
 var mydata= new item(req.body);
 mydata.save().then(()=>{
     res.send(" client has be admited to gymdata base ")
 }).catch(()=>{
     res.status(400).send("sorry could not add to data base ")
 });
//  const params={"message":" the form is submited pprly "}
//  res.status(200).render('index.pug',params)


})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on  ${port} port`);
});


