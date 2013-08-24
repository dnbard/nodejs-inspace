var request = require('request'),
	cheerio = require('cheerio'),
	cc = require('../consoleformat.js'),
	crypto = require('crypto'),
	db = require('../database.js'), 
	mongoose = require('mongoose'), 
	SpaceReport = require('../model/spacereport.js').SpaceReport;

exports.parseMain = parseMain;
function parseMain(){
	var url = 'http://www.howmanypeopleareinspacerightnow.com/space.json';
	requestUrl(url, parseMain_requestClbk);
}

function parseMain_requestClbk(url, resp, body){
	var data = JSON.parse(body);
	var peopleInSpace = data.number;
	var _people = data.people;
	var _date = new Date();
	var strDate = dateFormater(_date);

	cc.log(peopleInSpace + ' people in space ' + strDate);
	//cc.log(body);

	var report = new SpaceReport({
		date: strDate,
		rawdate: getRawDate(_date),
		count: peopleInSpace,
		people: _people
	});
	report.save();
}

function requestUrl(url, callback){
	cc.log('Request send to ' + cc.notice(url));
	request(url, function(err, resp, body){
		if (err) return cc.log(cc.error("Couldn't request " + url));
		else return callback(url, resp, body);		
	});
}

function dateFormater(date){
	var day = date.getUTCDate().toString();
	var month = (date.getUTCMonth() + 1).toString();
	var year = date.getFullYear().toString();

	if (day.length < 2) day = '0' + day;
	if (month.length < 2) month = '0' + month;
	return year + '-' + month + '-' + day;
}

function getRawDate(date){
	var day = date.getUTCDate();
	var month = (date.getUTCMonth() + 1);
	var year = date.getFullYear();

	return day + month * 100 + year * 10000;
}