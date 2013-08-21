var amqp = require('amqp'),
	mysql = require('mysql'),
	pool = mysql.createPool({
		host: '127.0.0.1',
		user: 'root',
		password : '',
		database: 'titleAuction'
	}),
	rabbitmq = amqp.createConnection({host: '127.0.0.1'});

rabbitmq.on('ready', function () {
	rabbitmq.queue('MsgFromClientToServer', {autoDelete: false}, function (queue) {
		queue.subscribe(function (message) {
			var data = message.data.toString('utf-8'), id = JSON.parse(data).id;
			pool.getConnection(function(err, connection) {

				connection.query('UPDATE auction SET `price`= price + 0.01 WHERE `id`=' + id +'', function (err, result) {
					connection.query('SELECT * FROM auction WHERE `id`=' + id + '', function (err, rows, fields) {
						connection.end();
						rabbitmq.publish('MsgFromServerToClient', JSON.stringify(rows[0]))
					});
				})
			});
				
		});
		
	});
});