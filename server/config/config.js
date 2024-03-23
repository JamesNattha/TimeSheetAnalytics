require('dotenv').config()
module.exports = {
  development : {
    yanhee: {
      username : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      dialect : process.env.DB_DIALECT,
      pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
      },
      dialectOptions : {
        useUTC : false 
      },
      timezone : '+07:00'
    }
  },
  test : {
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    dialect : process.env.DB_DIALECT,
  },
  production : {
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    dialect : process.env.DB_DIALECT,
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,
      idle : 10000
    },
    dialectOptions : {
      useUTC : false 
    },
    timezone : '+07:00'
  }
}
