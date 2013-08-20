/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

var amqp = require('amqp');

module.exports.bootstrap = function (cb) {

	// It's very important to trigger this callack method when you are finished 
	// with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

	sails.rabbitmq = sails.rabbitmq || amqp.createConnection({host: '192.168.240.120'});

	// sails.rabbitmq.on('ready', function () {
	// 	sails.rabbitmq.queue('rabbitMQ-auction', {autoDelete: false}, function (queue) {
	// 		queue.subscribe(function (message) {
	// 			var data = message.data.toString('utf-8'),
	// 				id = JSON.parse(data).id;


	// 			// Auction.findOne(id).exec(function (err, auction) {
  
	// 			// 	auction.price += 0.01;
	// 			// 	auction.price = Math.round(parseFloat(auction.price) * 100) / 100;

	// 			// 	auction.save(function (err) {
	// 			// 		Auction.publishUpdate(auction.id, auction.toJSON());
	// 			// 	});
	// 			// });
	// 		});
	// 	});
	// });
	cb();
};