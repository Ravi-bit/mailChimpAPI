const express=require("express");
const BParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(express.static("public"));
app.use(BParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    const Fname=req.body.fName;
    const Lname=req.body.LName;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:Fname,
                    LNAME:Lname
                }
            }
        ]
    };

const jsonData=JSON.stringify(data);
const url="https://us6.api.mailchimp.com/3.0/lists/931e91488e";
const options={
    method:"POST",
    auth:"RealRavi:ce3b6521a92146f4dcaf1cac21731731-us6"
}

const request=https.request(url,options,function(response){

    if(response.statusCode===200){
       res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
   response.on("data",function(data){
       console.log(JSON.parse(data));
   });
});
request.write(jsonData);
request.end();
});





app.listen(process.env.PORT||3000,function(){
    console.log("Running...");
})


//ce3b6521a92146f4dcaf1cac21731731-us6

// 931e91488e