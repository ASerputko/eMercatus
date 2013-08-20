/**
 * Auction
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
  	
  	name: {
		type: 'STRING',
		required: true
	},
	currency: {
		type: 'STRING',
		required: true
	},
	price: {
		type: 'FLOAT',
		required: true
	}
  }

};
