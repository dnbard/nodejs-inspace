var mongoose = require('mongoose'),
	cc = require('../consoleformat.js')

var spaceReportSchema = mongoose.Schema({
	date: String,
	rawdate: Number,
	count: Number,
	people: [mongoose.Schema.Types.Mixed]
});

spaceReportSchema.set('autoIndex', false);

var SpaceReport = mongoose.model('SpaceReport', spaceReportSchema);
exports.SpaceReport = SpaceReport;

exports.current = current;
function current(callback){
	SpaceReport.findOne({}, '', {
			sort: {rawdate: -1}},
		function(err, data){
		if (err) return cc.log(cc.error(err));			
		return callback(data);
	});
}