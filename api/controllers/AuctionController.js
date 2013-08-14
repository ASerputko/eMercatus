/**
 * AuctionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  bid: function (req, res) {
  	Auction.findOne(req.param('id')).exec(function (err, auction) {
      if (err) return res.send(err, 500);
      if (!auction) return res.send("No other chicken with that id exists!", 404);

      auction.price += 1;

      auction.save(function (err) {
        if (err) return res.send(err, 500);
        res.socket.emit('/auction/' + req.param('id') + '/bid', auction.toJSON());
        res.socket.broadcast.emit('/auction/' + req.param('id') + '/bid', auction.toJSON());
      });
    });
  }

};
