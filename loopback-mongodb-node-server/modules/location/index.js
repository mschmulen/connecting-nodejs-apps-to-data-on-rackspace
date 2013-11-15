/*!
 * A CRUD-capable model.
 */
var loopback = require('loopback');
var properties = require('./properties');
var config = require('./config');
var location = loopback.createModel('location', properties, config);
var applications = config.applications || [];

if (config['data-source']) {
  location.attachTo(require('../' + config['data-source']));
}

applications.forEach(function (name) {
  var app = require('../' + name);
  app.model(location);
});

module.exports = location;
