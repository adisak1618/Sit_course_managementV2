var mongoose = require('mongoose');
var userSchema = require('./database/user');
var coursePlanSchema = require('./database/plan');
mongoose.connect('mongodb://localhost/sit');


module.exports = function(){
	

	mongoose.model('user',userSchema);
	mongoose.model('plan',coursePlanSchema);
}