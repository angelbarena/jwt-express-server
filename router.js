const router = require('express').Router(['strict']);
const Authentication = require('./controllers/authentication');
//const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt',{session: false});
const requireSignin = passport.authenticate('local', {session:false});

router.get('/',requireAuth,(req, res)=>{
	return res.json({hi:'there'});
});

router.post('/signin', requireSignin, Authentication.singin);
router.post('/signup', Authentication.signup);

module.exports = router;
