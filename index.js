const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors=require('cors');
const bcrypt=require('bcrypt-nodejs');
var data=
[{
email:'angel',
name:'angel',
password:'ok'
}];
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res) =>
	{
		res.json(data)
	});
app.post('/register',(req,res) =>
	{
		console.log('ok')
		const {email,name,password} = req.body;
		if (!name || !email || !password)
		{
			res.status(400).json('wrong credentials')
		}
		else{
			data.map(d=>{
				if(d.email === email)
					res.json("exists");
			});
      console.log('in')
		const hash=bcrypt.hashSync(password);//getting hashed password
		data.push({
			email:email,
			name:name,
			password:hash
		})
	}
	res.json(data[data.length-1]);
	});
app.post('/login',(req,res)=>
  {
  	var login=false;
  	console.log('o')
    const {email,password} = req.body;
    if(!email || !password)
    {
      res.status(400).json('wrong credentials');
    }
    else
    {
      var compare
      data.map(d=>{
      compare=bcrypt.compareSync(password,d.password)
      if(compare && d.email===email )
        login=true;
    });
    }
    if(login)
    {
    	console.log('ok')
    	res.json('ok');
    }
    else
    {
    	console.log('not')
    	res.json('not')
    }
  });

app.listen(process.env.PORT)