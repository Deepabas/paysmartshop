const users=require('../Modles/UserModel');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require("./validationControler");
const nodemailer = require("nodemailer")
var smtpTransport = require("nodemailer-smtp-transport");
    

//check username

const validateUsername = async name => {
    let user = await users.query().findOne({ name });
    return user? false:true;
}

//check email
const validateEmail = async email => {
    let user = await users.query().findOne({ email });
    return user? false:true;
}

//insert user details

exports.createUsers = async function (req, res) {
 
	//lets validate the data before we a user
	try {
	const { error } = registerValidation(req.body)
	if (error) {
		return res.status(400).send(error.message);
	}

	let usernameNotTaken = await validateUsername(req.body.name);
    if(!usernameNotTaken){
        return res.status(400).json({
            message:`Username is already taken`,
            success:false
        })
    }

	  //validate the email
	  let emailNotRegistered = await validateEmail(req.body.email);
	  if(!emailNotRegistered){
		  return res.status(400).json({
			  message:`Email is already registered`,
			  success:false
		  })
	  }
	//get the  hashed password
	const hashPassword = await bcrypt.hash(req.body.password, 12)
	console.log(hashPassword)
  const status=1;
	const user = await users.query().insert({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
    status:status
	})

	
		
			var transporter = nodemailer.createTransport(smtpTransport({
				service: 'gmail',
				secure: true,
				auth: {
					user: 'deepabaskaran.b@gmail.com',
					pass: 'deepa@123'
				}
			}));

			let info = await transporter.sendMail({
				from: '"Fred Foo 👻" <deepabaskaran.b@gmail.com>',
				to: user.email,
				subject: 'Hello ✔', // Subject line
				text: 'Hello world?', // plain text body
				html: `<P>Successfully register your account</p>` // html body
			});

			console.log('Message sent: %s', info.messageId);

			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		

   return res.render('/Signup');

	}

	catch (err) {
		console.log(err)
		return res.redirect('/Signup');
	}
};




//login
exports.userLogin = async (req,  res) => {
	//lets validate the data before we a user
	const {error} = loginValidation(req.body)
	
	if(error){
		return res.status(400).send(error.message);
	  
	} 
	
	//checking if the email exists
	   const user = await users.query().findOne({name: req.body.name});
	   if(!user) return res.status(400).send('Invalid username');
	
	//password is correct
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if(!validPassword) 
	{
		//sign in the token and issue it to the user
		// const token = jwt.sign({user}, 'secretkey');
	
	let result ={
		id: user.id,
		name:user.name,
	password:user.password
	}

	req.session.userId = result.id
	console.log(req.session)
		res.redirect('/');
	
	/*return res.status(200).json({
		...result,
		message:"Hurray! you are now logged in",
		success:true
    })*/
  
	}
	else{
		/*return res.status(403).json({
			message:"Incorrect password ",
			success:false
		})*/
    res.redirect('/Login');
    }
	}


	//logout your session

	exports.userLogout= async(req, res) => {
		console.log("delete")
		console.log(req.session.userId)
		// if(req.session.userId>0) {
			
		// 	await delete req.session.userId;
		
		// 	res.redirect('/');
		// } else {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
		// 	res.redirect('/login');
		// }    
		req.session.destroy(err => {
			if(err){
				return res.redirect('/home')
			}
			
			res.redirect('/login')
		  })
		
	}



const operator = [{

}]
const circle = [{}]

exports.view = async (req,  res) => {
	console.log(req.session)

    res.render('home',{data:{operator:operator,circle:circle}});
//    res.redirect('/',{data:{operator:operator,circle:circle}});

}



// exports.createUsers = async function (req, res) {
// 	// console.log(req)
//   const status=1;
//   var success="Successfully Regeisteration";
// 	await users.query().insert({
// 		name: req.body.name,
// 		email: req.body.email,
// 		password: req.body.password,
//     status:status
// 		});
//     //req.flash('success', 'Your account has been created. Please log in.');
//     res.redirect('/Signup');
// 	//res.json({ success: true, message: 'ok' });
// };
