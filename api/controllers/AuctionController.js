/**
 * AuctionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  performance: function (req, res) {
    var max = req.param('max');

    for (var i = 1; i <= max; i++ ) {
      // sails.rabbitmq.publish('rabbitMQ-auction', JSON.stringify({id: 1}));

      var id = i % 2 ? 1 : 2;
      Auction.findOne(id).exec(function (err, auction) {
        if (err) return res.send(err, 500);
        if (!auction) return res.send("No other chicken with that id exists!", 404);

        auction.price += 0.01;
        auction.price = Math.round(parseFloat(auction.price) * 100) / 100;

        sails.rabbitmq.publish('rabbitMQ-auction', auction.toJSON());

        auction.save(function (err) {
          if (err) return res.send(err, 500);
          Auction.publishUpdate(auction.id, auction.toJSON());
        });
      });
    }

    res.json({max: max});
  },

  bid: function (req, res) {
    
    Auction.findOne(req.param('id')).exec(function (err, auction) {
      if (err) return res.send(err, 500);
      if (!auction) return res.send("No other chicken with that id exists!", 404);

      auction.price += 0.01;
      auction.price = Math.round(parseFloat(auction.price) * 100) / 100;

      sails.rabbitmq.publish('rabbitMQ-auction', auction.toJSON());

      auction.save(function (err) {
        if (err) return res.send(err, 500);
        Auction.publishUpdate(auction.id, auction.toJSON());
      });
    });
  }

};
