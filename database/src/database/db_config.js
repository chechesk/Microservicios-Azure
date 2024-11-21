require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = require('../config/env');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
{
    // si en produccion funciona la carga de countries sin aumentar el pool entonces eliminar la configuracion pool
    pool: {
      max: 10,
    },
    logging: false,
    native: false,
     dialectOptions: {
       ssl: true
    }, 
  }
);

const basename = path.basename(__filename);
const modelDefiners = [];

console.log(__dirname);
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

// aqui van los modelos definidos ejemplo {Instrument, Category, Admin, Cart, Payment,User}
const { Customer, Kyc, Portfolio, ResultPortfolio, RiskProfile, Chat , CustomerPortfolio, RiskScore, Noticia} = sequelize.models;

// RELACIONES

// customer - kyc
Customer.hasOne(Kyc, { foreignKey: { name: 'customer_id', unique: true } });
Kyc.belongsTo(Customer, { foreignKey: 'customer_id' });

// customer - risk_profile
Customer.hasOne(RiskProfile, {foreignKey: { name: 'customer_id', unique: true },});
RiskProfile.belongsTo(Customer, { foreignKey: 'customer_id' });

// customer - chat
Customer.hasOne(Chat, { foreignKey: { name: 'customer_id', unique: true } });
Chat.hasMany(Customer,  { foreignKey: 'customer_id' });

//customer - customerPortfolio
Customer.hasOne(CustomerPortfolio, { foreignKey: { name: 'customer_id', unique: true } });
CustomerPortfolio.hasMany(Customer,  { foreignKey: 'customer_id' });

// portfolio - resultportfolio
Portfolio.hasOne(ResultPortfolio, { foreignKey: { name: 'customer_id', unique: true } });
ResultPortfolio.hasMany(Portfolio,  { foreignKey: 'customer_id' });
// customer - puntuacion de riesgo 
Customer.hasOne(RiskScore, { foreignKey: { name: 'customer_id', unique: true } });
RiskScore.belongsTo(Customer, { foreignKey: 'customer_id' });

module.exports = {
  ...sequelize.models,
  db_conn: sequelize,
  models: { ...sequelize.models },
};
