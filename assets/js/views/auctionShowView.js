(function (exports, $, _, Backbone, AuctionModel) {

	var AuctionShowView = Backbone.View.extend({

		className: 'col-lg-12',

		template: JST['assets/linker/templates/auction/show.html'],

		events: {
			'click button': 'bidNow'
		},

		initialize: function (options) {
			this.model = new AuctionModel({id: options.auctionId})
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'change:price', this.priceChanged);

			this.model.fetch();
		},

		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		},

		price: 1,

		bidNow: function () {
			this.model.bidNow();
		},

		priceChanged: function () {
			this.$('.price').text(this.model.get('price'));
		}

	});

	exports.AuctionShowView = AuctionShowView;

}).call(this, window, jQuery, _, Backbone, AuctionModel);