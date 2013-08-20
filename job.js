// var amqp = require('amqp'),
// 	mysql = require('mysql'),
// 	pool = mysql.createPool({
// 		host: '127.0.0.1',
// 		user: 'root',
// 		password : '',
// 		database: 'eMdev'
// 	}),
// 	rabbitmq = amqp.createConnection({host: '192.168.240.120'});

// rabbitmq.on('ready', function () {
// 	rabbitmq.queue('rabbitMQ-auction', {autoDelete: false}, function (queue) {
// 		queue.subscribe(function (message) {
// 			var data = message.data.toString('utf-8'), id = JSON.parse(data).id;
// 			pool.getConnection(function(err, connection) {

// 				connection.query('UPDATE auction SET `price`= price + 0.01 WHERE `id`=' + id +'', function (err, result) {
// 					connection.query('SELECT * FROM auction WHERE `id`=' + id + '', function (err, rows, fields) {
// 						console.log(data);
// 						connection.end();
// 						rabbitmq.publish('rabbitMQ-auction-updated', JSON.stringify(rows[0]))
// 					});
// 				})
// 			});
				
// 		});
		
// 	});
// });

var amqp = require('amqp');
var storage = {}

rabbitmq = amqp.createConnection({host: '192.168.240.120'});

rabbitmq.on('ready', function () {
	rabbitmq.queue('rabbitMQ-auction', {autoDelete: false}, function (queue) {
		queue.subscribe(function (message) {
			var data = message.data.toString('utf-8'),
				id = JSON.parse(data).id;
				// console.log(new Date(), id);

				// var d = new Date()
				// d.toString()
				// if (storage[d.toString()]) {
				// 	storage[d.toString()].push(id + ' --- ' + d.toString())
				// } else {
				// 	storage[d.toString()] = []
				// 	storage[d.toString()].push(id + ' --- ' + d.toString())
				// };

				// console.log('============================')
				// for (var key in storage) {
				// 	console.log(key, storage[key].length)
				// }
				// console.log('============================')
			// Auction.findOne(id).exec(function (err, auction) {

			// 	auction.price += 0.01;
			// 	auction.price = Math.round(parseFloat(auction.price) * 100) / 100;

			// 	auction.save(function (err) {
			// 		Auction.publishUpdate(auction.id, auction.toJSON());
			// 	});
			// });
		});
	});
});