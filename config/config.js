require('dotenv').config();//instatiate environment variables

CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP   || 'dev';
CONFIG.port         = process.env.PORT  || '3000';

CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mysql';
CONFIG.db_port      = process.env.DB_PORT       || '3306';
// CONFIG.db_host      = process.env.DB_HOST       || 'localhost';
// CONFIG.db_name      = process.env.DB_NAME       || 'twinsave';
// CONFIG.db_user      = process.env.DB_USER       || 'root';
// CONFIG.db_password  = process.env.DB_PASSWORD   || 'wandah';
CONFIG.db_name      = process.env.DB_NAME       || 'heroku_079f5cbfd0c9f51';
CONFIG.db_host      = process.env.DB_HOST       || 'us-cdbr-iron-east-04.cleardb.net';
CONFIG.db_user      = process.env.DB_USER       || 'b69b7799175ef6';
CONFIG.db_password  = process.env.DB_PASSWORD   || '45a263cf';

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';
