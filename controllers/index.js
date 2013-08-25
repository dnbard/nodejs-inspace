var SpaceReports = require('../model/spacereport.js'),
	cc = require('../consoleformat.js');

exports.route = route;
function route(req, res){
	SpaceReports.current(function(report){
		res.jsonp(report);		
	});
}