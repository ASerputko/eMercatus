(function (exports, $, _, Backbone) {

	var AuctionModel = Backbone.Model.extend({

		socket: socket,

		urlRoot: '/auction/',

		initialize: function () {
			// var model = this;
			// this.socket.on(this.url() + '/bid', function (response) {
			// 	model.set(response);
			// });
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
		},

		toHTML: function () {
			var attributes = _.clone(this.attributes);
			attributes.price = parseFloat(attributes.price).toFixed(2);

			return attributes;
		},

		getPrice: function (options) {
			if (options.fixed) {
				return parseFloat(this.get('price')).toFixed(options.fixed);
			} else {
				return this.get('price');
			}
		}
		
	});

	return exports.AuctionModel = AuctionModel;

}).call(this, window, jQuery, _, Backbone);