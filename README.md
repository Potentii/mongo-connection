# Mongo connection

A utility to help connect to MongoDB using mongoose.

<br>

# Content

- [Installing](#installing)
- [Using](#using)
- [API](#api)
  - [mongo](#mongo)
  - [ConnOpts](#connopts)
  - [MongoPool](#mongopool)
- [License](#license)

<br>

# Installing

To install, simply do:

```text
npm i @potentii/mongo-connection
```

Make sure you have also installed **[mongoose](https://www.npmjs.com/package/mongoose)** in your project, as it is a peer dependency.

<br>

# Using

To connect using mongoose, simply do:

```javascript
const { mongo, ConnOpts } = require('@potentii/mongo-connection');

const opts = new ConnOpts()
    .host('127.0.0.1')
    .port('27017');

mongo.connect(opts)
    // 'pool' is the mongoose connection pool
    // now the 'mongo' singleton stores this reference, so you can access it from anywhere, just calling 'mongo.pool'
    .then(pool => {
        // use as pool.model('User', new Schema(...))
        // or as mongo.pool.model('User', new Schema(...))
    });

```

<br>

## API

### mongo

It's a singleton that holds the reference to the main [MongoPool](#mongopool) instance.

Establishing a new connection at the start of the application:
```javascript
const { mongo, ConnOpts } = require('@potentii/mongo-connection');

const opts = new ConnOpts(); // complete with parameters

mongo.connect(opts)
    .then(...);
```

Then you can access the connection pool using:

```javascript
const { mongo, ConnOpts } = require('@potentii/mongo-connection');

mongo.pool.model('User', new Schema(...));
```

<br>

### ConnOpts

Connection options builder utility.

#### Instance methods

- **user(** _user_ :`String` **)** : [`ConnOpts`](#connopts) - Sets the username.
- **pass(** _pass_ :`String` **)** : [`ConnOpts`](#connopts) - Sets the password.
- **host(** _host_ :`String` **)** : [`ConnOpts`](#connopts) - Sets the hostname _(The default is `127.0.0.1`)_.
- **port(** _port_ :`String` **)** : [`ConnOpts`](#connopts) - Sets the port number _(The default is `27017`)_.
- **dbName(** _dbName_ :`String` **)** : [`ConnOpts`](#connopts) - Sets the database name.
- **authSource(** _authSource_ :`String` **)** : [`ConnOpts`](#connopts) - Sets the authentication source collection _(The default is `admin`)_.
- **withoutAuthOnUrl(** _withoutAuthOnUrl_ :`Boolean` **)** : [`ConnOpts`](#connopts) - Sets if the connection string should not have authentication details _(may not work in some environments)__(The default is `false`)_.
- **poolSize(** _poolSize_ :`Number` **)** : [`ConnOpts`](#connopts) - Sets the size of the pool _(The default is `6`)_.
- **isSrv(** _isSrv_ :`String|Boolean` **)** : [`ConnOpts`](#connopts) - Tells if the server uses SRV _(MongoDB Atlas for example)__(The default is `false`)_.

#### Static methods

- **ConnOpts.fromEnv( )** - Builds a new **[ConnOpts](#connopts)** from the environment variables.
  - **MONGO_USER** - The username
  - **MONGO_PASS** - The password
  - **MONGO_HOST** - The hostname
  - **MONGO_PORT** - The port
  - **MONGO_DB_NAME** - The database name
  - **MONGO_AUTH_SOURCE** - The authentication collection name
  - **MONGO_WITHOUT_AUTH_ON_URL** - If it should not use authentication on the connection string  
  - **MONGO_POOL_SIZE** - The size of the pool
  - **MONGO_IS_SRV** - If it is SRV

<br>

### MongoPool

Instances of this class connects to the database, and holds the connection pool reference for later use.

#### Instance properties

- **isConnected** : `Boolean` - Tells if there is a connection present.
- **pool** : [`mongoose.Connection`](https://mongoosejs.com/docs/api/connection.html) - The reference to the mongoose connection.

#### Instance methods

- **connect(** _opts_ : [`ConnOpts`](#connopts), _\[promiseLibrary\]_ : `Function|*` **)** : [`Promisse<mongoose.Connection>`](https://mongoosejs.com/docs/api/connection.html) - Connects to the database using the opts. _(`promiseLibrary` defaults to the standard JavaScript [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) implementation)_.
- **disconnect( )** : `Promise<void>` - Disconnects from the database.

<br>

## License
[MIT](LICENSE)