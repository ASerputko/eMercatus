(function (exports, $, _, Backbone) {

	var AuctionModel = Backbone.Model.extend({

		socket: socket,

		urlRoot: '/auction/',

		initialize: function () {
			var model = this;
			this.socket.on(this.url() + '/bid', function (response) {
				model.set(response);
			});
		},

		bidNow: function () {
			var model = this;
			this.socket.put(this.url() + '/bid', {}, function (response) {});
		},

		sync: function (type, model, options) {
			if (type === 'read') {
				model.socket.request(model.url(), function (response) {
					options.success(response);
				});
			}
		}
		
	});

	return exports.AuctionModel = AuctionModel;

}).call(this, window, jQuery, _, Backbone);