const appConfig = {
    posApp: {
      port: process.env.PORT || 3000,
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        name: process.env.DB_NAME || 'smart_pos',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        dialect: process.env.DB_DIALECT || 'mysql',
    }
};

module.exports = appConfig;
