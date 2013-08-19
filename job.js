var sails = require('sails'),
	util = require('sails/lib/util'),
	async = require('async'),
	Modules = require('sails/lib/moduleloader');

sails.load(function () { return process.exit(1) });


sails.models = Modules.optional({
	dirname		: sails.config.paths.models,
	filter		: /(.+)\..+$/
});

console.log(sails.models.fustmodel.bid())