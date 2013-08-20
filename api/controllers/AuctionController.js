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
      sails.rabbitmq.publish('rabbitMQ-auction', JSON.stringify({id: i}));
    }

    res.json({max: max});
  },

  bid: function (req, res) {
    // sails.rabbitmq.publish('rabbitMQ-auction', JSON.stringify({id: req.param('id')}));
   Auction.findOne(req.param('id')).exec(function (err, auction) {
      if (err) return res.send(err, 500);
      if (!auction) return res.send("No other chicken with that id exists!", 404);

      auction.price += 0.01;
      auction.price = Math.round(parseFloat(auction.price) * 100) / 100

      auction.save(function (err) {
        if (err) return res.send(err, 500);
        Auction.publishUpdate(auction.id, auction.toJSON());
        // res.socket.emit('/auction/' + req.param('id') + '/bid', auction.toJSON());
        // res.socket.broadcast.emit('/auction/' + req.param('id') + '/bid', auction.toJSON());
      });
    });
  }

};
