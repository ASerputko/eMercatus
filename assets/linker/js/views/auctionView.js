(function (exports, $, _, Backbone) {

	var AuctionView = Backbone.View.extend({

		className: 'col-lg-2',

		template: JST['assets/linker/templates/auction/index.html'],

		events: {
			'click button': 'bidNow'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'change:price', this.priceChanged);
		},

		render: function () {
			this.$el.html(this.template(this.model.toHTML()));
			return this;
		},

		bidNow: function () {
			this.model.bidNow();
		},

		priceChanged: function () {
			this.$('.price').text(this.model.get('price'));
		}

	});

	return exports.AuctionView = AuctionView;

}).call(this, window, jQuery, _, Backbone);