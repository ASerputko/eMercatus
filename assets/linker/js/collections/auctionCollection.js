(function (exports, $, _, Backbone, AuctionModel) {

	var AuctionCollection = Backbone.Collection.extend({

		model: AuctionModel,

		socket: socket,
		
		url: '/auction',

		initialize: function () {
			// var collection = this;
			// socket.on('connect', function () {
			// 	socket.on('message', function (message) {
			// 		collection.set([message.data], {merge: true});
			// 	});
			// });
		},

		sync: function (type, collection, options) {
			if (type === 'read') {
				collection.socket.request(collection.url, function (response) {
					options.success(response);
				});
			}
		}

	});

	return exports.AuctionCollection = AuctionCollection;

}).call(this, window, jQuery, _, Backbone, AuctionModel);