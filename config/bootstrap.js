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

	sails.rabbitmq = sails.rabbitmq || amqp.createConnection({host: 'localhost'});

	sails.rabbitmq.on('ready', function () {

		if (sails.config.port === 3000) {
			sails.rabbitmq.queue('MsgFromServerToClient', {autoDelete: false}, function (queue) {
				queue.subscribe(function (message) {
					var data = message.data.toString('utf-8'),
						auction = JSON.parse(data);

					Auction.publishUpdate(auction.id, auction);
				});
			});
		}

	});
	cb();
};