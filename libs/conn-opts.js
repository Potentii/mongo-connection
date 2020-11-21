const defaults = require('./defaults');

class ConnOpts{

	constructor(){
		this._host = ConnOpts.DEFAULT_HOST;
		this._port = ConnOpts.DEFAULT_PORT;
		this._poolSize = ConnOpts.DEFAULT_POOL_SIZE;
		this._authSource = ConnOpts.DEFAULT_AUTH_SOURCE;
	}


	static get DEFAULT_HOST(){
		return defaults.DEFAULT_HOST;
	}

	static get DEFAULT_PORT(){
		return defaults.DEFAULT_PORT;
	}

	static get DEFAULT_AUTH_SOURCE(){
		return defaults.DEFAULT_AUTH_SOURCE;
	}

	static get DEFAULT_POOL_SIZE(){
		return defaults.DEFAULT_POOL_SIZE;
	}


	user(user){
		this._user = user;
		return this;
	}

	pass(pass){
		this._pass = pass;
		return this;
	}

	host(host){
		this._host = host;
		return this;
	}

	port(port){
		this._port = port;
		return this;
	}

	dbName(dbName){
		this._dbName = dbName;
		return this;
	}

	authSource(authSource){
		this._authSource = authSource;
		return this;
	}

	poolSize(poolSize){
		this._poolSize = Number(poolSize);
		return this;
	}

	withoutAuthOnUrl(withoutAuthOnUrl = true){
		this._withoutAuthOnUrl = withoutAuthOnUrl === 'TRUE' || withoutAuthOnUrl === 'true' || withoutAuthOnUrl === true;
		return this;
	}

	isSrv(isSrv){
		this._isSrv = isSrv === 'TRUE' || isSrv === 'true' || isSrv === true;
		return this;
	}

	static fromEnv(){
		return new ConnOpts()
			.user(process.env.MONGO_USER)
			.pass(process.env.MONGO_PASS)
			.host(process.env.MONGO_HOST || ConnOpts.DEFAULT_HOST)
			.port(process.env.MONGO_PORT || ConnOpts.DEFAULT_PORT)
			.dbName(process.env.MONGO_DB_NAME)
			.poolSize(process.env.MONGO_POOL_SIZE || ConnOpts.DEFAULT_POOL_SIZE)
			.isSrv(process.env.MONGO_IS_SRV || false)
			.withoutAuthOnUrl(process.env.MONGO_WITHOUT_AUTH_ON_URL || false)
			.authSource(process.env.MONGO_AUTH_SOURCE || ConnOpts.DEFAULT_AUTH_SOURCE);
	}

}


module.exports = ConnOpts;
