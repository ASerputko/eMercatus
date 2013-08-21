/**
 * AuctionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  performance: function (req, res) {
    var max = req.param('max');
    var id = req.param('id') || 1;

    for (var i = 1; i <= max; i++ ) {
      sails.rabbitmq.publish('MsgFromClientToServer', JSON.stringify({id: id}));
    }

    if (req.param('setInterval')) {
      setInterval(function () {
        for (var i = 1; i <= 2000; i++ ) {
          sails.rabbitmq.publish('MsgFromClientToServer', JSON.stringify({id: id}));
        }
      }, 1000);
    }

    res.json({max: max});
  },

  bid: function (req, res) {
    sails.rabbitmq.publish('MsgFromClientToServer', JSON.stringify({id: req.param('id')}));
  }

};
