/*!
 * An in-memory DataSource for development.
 */
var loopback = require('loopback');

//module.exports = loopback.createDataSource({
//  connector: loopback.Memory
//});

module.exports = loopback.createDataSource({
  connector: require('loopback-connector-mongodb'),
  host: 'iad-c11-0.objectrocket.com',
  port: 48018,
  database: 'XXXXXX-app',
  username: 'XXXXXX',
  password: 'XXXXXX'
});
