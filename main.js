const MongoPool = require('./libs/mongo-pool');
const ConnectionString = require('./libs/connection-string');
const ConnOpts = require('./libs/conn-opts');


module.exports = {
	mongo: MongoPool.instance,
	MongoPool: MongoPool,
	ConnectionString: ConnectionString,
	ConnOpts: ConnOpts,
};