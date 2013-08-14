(function (exports, $, _, Backbone, AuctionCollection, AuctionView) {

	var AuctionCollectionView = Backbone.View.extend({
		
		initialize: function () {
			this.collection = new AuctionCollection();
			
			this.listenTo(this.collection, 'sync', this.addAll);
			
			this.collection.fetch();
		},

		addAll: function () {
			this.collection.each(this.addOne, this);
		},

		addOne: function (model) {
			var view = new AuctionView({model: model, collection: this.collection});
			this.$el.append(view.render().el);
		}
		
	});

	return exports.AuctionCollectionView = AuctionCollectionView;

}).call(this, window, jQuery, _, Backbone, AuctionCollection, AuctionView);