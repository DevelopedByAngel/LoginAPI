const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors=require('cors');
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
    const j=true;
		const {email,name,password} = req.body;
		if (!name || !email || !password)
		{
      j=false;
			res.status(400).json('wrong credentials')
		}
		else{
			data.map(d=>{
				if(d.email === email)
					res.json("exists");
          j=false;
			});
    console.log('in')
		data.push({
			email:email,
			name:name,
			password:password
		})
	}
  if (j)
	res.json('ok');
else
  res.json('not')
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
      if(password===d.password && d.email===email )
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