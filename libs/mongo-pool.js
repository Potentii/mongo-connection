const ConnectionString = require('./connection-string');

let _instance;

class MongoPool{
	
	constructor(){
		this._pool = null;
	}


	/**
	 * 
	 * @return {MongoPool}
	 */
	static get instance(){
		if(!_instance)
			_instance = new MongoPool();
		return _instance;
	}


	/**
	 *
	 * @param {ConnOpts} opts
	 * @param {Function|*} [promiseLibrary] The underlying library to use as promises. Defaults to the standard JavaScript Promise constructor
	 * @return {Promise<mongoose.Connection>}
	 */
	async connect(opts, promiseLibrary = Promise){
		if(this.isConnected)
			return this._pool;

		this._pool = null;
		this._pool = await new promiseLibrary((resolve, reject) => {
			try{
				// *Creating a new connection:
				const conn = mongoose.connect(ConnectionString.build(opts), {
					user: opts._user,
					pass: opts._pass,
					dbName: opts._dbName,
					poolSize: opts._poolSize,
					useNewUrlParser: true,
					promiseLibrary: promiseLibrary
				});

				// *Resolving into the connection:
				resolve(conn);
			} catch(err){
				reject(err);
			}
		});

		return this._pool;
	}


	/**
	 * 
	 * @return {Promise<void>}
	 */
	async disconnect(){
		if(this.isConnected)
			this._pool.close();
		this._pool = null;
	}

	
	/**
	 *
	 * @type {Boolean}
	 * @return {Boolean}
	 */
	get isConnected(){
		return !!this._pool;
	}


	/**
	 * 
	 * @type {mongoose.Connection}
	 * @return {mongoose.Connection}
	 */
	get pool(){
		return this._pool;
	}
	
}

module.exports = MongoPool;