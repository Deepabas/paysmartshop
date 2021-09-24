const recharge=require('../Modles/MobileModel');
const {userLogin}=require('../controller/UserController');


exports.view= (req,res)=>
{
    res.render('mobile');
   //res.redirect('/',{data:{operator:operator,circle:circle}});
    }

	//inser recharge details
exports.Mobile_recharge = async function (req, res) {
  const  user= await req.session.userId
  const status=0;
  

  
  

//we will check the role

if(!req.session.userId){
res.redirect('/login');
}
if(req.session.userId>0){
const RechargeData =	await recharge.query().insert({
		mobile: req.body.mobile,
		operator: req.body.operator,
		amount: req.body.amount,
		user_id:user,
        status:status 
		});

		res.redirect('/Recharge_Summary');

	}
	
    // req.flash('success', 'Your account has been created. Please log in.');
    
	//res.json({ success: true, message: 'ok' });
};



exports.viewDetails = async function (req, res) {
	
	let user_id = 3
const rechargeUser = await recharge.query()
		// .withGraphFetched('users')
				.findByIds(user_id)
				.then(rechargeUser => {
					console.log(rechargeUser)
					// res.send(`<a href='http//localhost/3000/user/${user_id}'></a>`)
					res.render('Recharge_Summary',{data:rechargeUser})	
				})
};
