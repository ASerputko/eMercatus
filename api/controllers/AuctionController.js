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
      sails.rabbitmq.publish('rabbitMQ-auction', JSON.stringify({id: 1}));
    }

    res.json({max: max});
  },

  bid: function (req, res) {
    sails.rabbitmq.publish('rabbitMQ-auction', JSON.stringify({id: req.param('id')}));
  }

};
