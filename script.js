const express= require('express');
const bodyParser= require('body-parser');
const app=express();
const port= 3000;
/* `app.set('view engine','ejs');` sets the view engine for the application to EJS (Embedded
JavaScript). This means that when rendering views, the application will use EJS to generate HTML
dynamically. */
var items=["Buy Food","Cook Food","Eat Food"];
var workitems=["Learn DSA","Learn Development"];
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
/* `app.use(express.static('public'));` is serving static files such as images, CSS files, and
JavaScript files from the `public` directory. This means that any files in the `public` directory
can be accessed by the client without any additional routing or middleware. */
app.use(express.static('public'));
app.get("/",(req,res)=>
{
    var today= new Date();
var options={
weekday: "long",
day: "numeric",
month: "long"

};

var day= today.toLocaleDateString("en-US",options);

    res.render("list",{listTitle: day, newListItems: items});
    // res.write("yah weekend");
    // res.write('hello');
    // res.end();
});

app.post("/",(req,res)=>
{
    //console.log(req.body);
    var item =req.body.newItem;
     if(req.body.listtype==='WORK')
    {
        workitems.push(item);
        res.redirect("/work");
    }
    else
    {
        items.push(item);
        res.redirect("/");

    }
    
})
app.get('/about',function(req,res){
res.render("about");
})
app.get("/work",(req,res)=>
{
    res.render("list",{listTitle: "WORK", newListItems: workitems})
})

// app.post("/work",(req,res)=>
// {
//     var item =req.body.newItem;
//     workitems.push(item);
//     res.redirect("/work");
// })
app.listen(process.env.PORT||port,()=>
{
    console.log('server running on port 3000');
});
// var today= new Date();
//today.getDay()->returns a number like 1 for mon, 2 for tue and so on
