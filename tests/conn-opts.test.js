const { expect } = require('chai');
const ConnOpts = require('../libs/conn-opts')


describe('ConnOpts', function(){
	
	it('Should set options using the builder (implicit values)', () => {
		const opts = new ConnOpts()
			.user('USER')
			.pass('PASS')
			.host('HOST')
			.port('PORT')
			.dbName('DBNAME')
			.poolSize(1234)
			.isSrv('TRUE')
			.withoutAuthOnUrl('TRUE')
			.authSource('AUTHSOURCE');
		
		// *Checking all values:
		expect(opts._user)            .to.eq('USER');
		expect(opts._pass)            .to.eq('PASS');
		expect(opts._host)            .to.eq('HOST');
		expect(opts._port)            .to.eq('PORT');
		expect(opts._dbName)          .to.eq('DBNAME');
		expect(opts._poolSize)        .to.eq(1234);
		expect(opts._isSrv)           .to.eq(true);
		expect(opts._withoutAuthOnUrl).to.eq(true);
		expect(opts._authSource)      .to.eq('AUTHSOURCE');
	});

	it('Should set options using the builder (default values)', () => {
		const opts = new ConnOpts();

		// *Checking all values:
		expect(opts._user)            .to.undefined
		expect(opts._pass)            .to.undefined
		expect(opts._host)            .to.eq('127.0.0.1');
		expect(opts._port)            .to.eq('27017');
		expect(opts._dbName)          .to.undefined
		expect(opts._poolSize)        .to.eq(6);
		expect(opts._isSrv)           .to.not.ok
		expect(opts._withoutAuthOnUrl).to.not.ok
		expect(opts._authSource)      .to.eq('admin');
	});

	it('Should set options using the environment (implicit values)', () => {
		process.env.MONGO_USER = 'USER';
		process.env.MONGO_PASS = 'PASS';
		process.env.MONGO_HOST = 'HOST';
		process.env.MONGO_PORT = 'PORT';
		process.env.MONGO_DB_NAME = 'DBNAME';
		process.env.MONGO_POOL_SIZE = '1234';
		process.env.MONGO_IS_SRV = 'TRUE';
		process.env.MONGO_WITHOUT_AUTH_ON_URL = 'TRUE';
		process.env.MONGO_AUTH_SOURCE = 'AUTHSOURCE';
		
		const opts = ConnOpts.fromEnv();

		// *Checking all values:
		expect(opts._user)            .to.eq('USER');
		expect(opts._pass)            .to.eq('PASS');
		expect(opts._host)            .to.eq('HOST');
		expect(opts._port)            .to.eq('PORT');
		expect(opts._dbName)          .to.eq('DBNAME');
		expect(opts._poolSize)        .to.equals(1234);
		expect(opts._isSrv)           .to.eq(true);
		expect(opts._withoutAuthOnUrl).to.eq(true);
		expect(opts._authSource)      .to.eq('AUTHSOURCE');
	});

	it('Should set options using the environment (default values)', () => {
		delete process.env.MONGO_USER;
		delete process.env.MONGO_PASS;
		delete process.env.MONGO_HOST;
		delete process.env.MONGO_PORT;
		delete process.env.MONGO_DB_NAME;
		delete process.env.MONGO_POOL_SIZE;
		delete process.env.MONGO_IS_SRV;
		delete process.env.MONGO_WITHOUT_AUTH_ON_URL;
		delete process.env.MONGO_AUTH_SOURCE;

		const opts = ConnOpts.fromEnv();

		// *Checking all values:
		expect(opts._user)            .to.undefined
		expect(opts._pass)            .to.undefined
		expect(opts._host)            .to.eq('127.0.0.1');
		expect(opts._port)            .to.eq('27017');
		expect(opts._dbName)          .to.undefined
		expect(opts._poolSize)        .to.eq(6);
		expect(opts._isSrv)           .to.not.ok
		expect(opts._withoutAuthOnUrl).to.not.ok
		expect(opts._authSource)      .to.eq('admin');
	});
	
})

