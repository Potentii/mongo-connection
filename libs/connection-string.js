const ConnectionOptionsBuilder = require('./conn-opts');

class ConnectionString{

	constructor(){}
	
	static build(opts){		
		let url = '';

		url += (opts._isSrv)
			? 'mongodb+srv://'
			: 'mongodb://';
		
		if(!opts._withoutAuthOnUrl && opts._user){
			url += (opts._pass)
				? `${opts._user}:${opts._pass}@`
				: `${opts._user}@`;
		}
		
		url += (opts._isSrv)
			? `${opts._host}`
			: `${opts._host}:${opts._port}`;

		url += (opts._dbName)
			? `/${opts._dbName}`
			: ''

		url += (opts._authSource)
			? `?authSource=${opts._authSource}` 
			: ''
		
		return url;
	}
	
	static buildFromEnv(){
		return ConnectionString.build(ConnectionOptionsBuilder.fromEnv());
	}
	

}


module.exports = ConnectionString;
