(function (exports, $, _, Backbone, AuctionCollectionView, AuctionShowView) {

	var AuctionRouter = Backbone.Router.extend({

		initialize: function () {
			this.currentController = null;
		},

		routes: {
			'': 'auction',
			'auction': 'auction',
			'auction/': 'auction',
			'auction/:id': 'auction'
		},

		auction: function (auctionId) {
			auctionId = auctionId || false;

			// TEMP
			if (this.currentController) {
				this.currentController.remove();
				this.currentController = null;
			}

			if (auctionId) {
				$('#container .row').append('<div></div>')
				this.currentController = new AuctionShowView({el: $('#container .row div'), auctionId: auctionId});
			} else {
				$('#container .row').append('<div></div>')
				this.currentController = new AuctionCollectionView({el: $('#container .row div')});
			}
		}

		
	});

	return exports.AuctionRouter = AuctionRouter;

}).call(this, window, jQuery, _, Backbone, AuctionCollectionView, AuctionShowView);