const { DataTypes } = require('sequelize');
const client_error = require('../../utils/errors/index');
const { query } = require('express');

module.exports = (sequelize) => {
    const ResultPortfolio = sequelize.define(
      'ResultPortfolio',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        portfolio_weights: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        estimated_portfolio_return: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        estimated_portfolio_risk: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      })

   

    // funciones del modelo

    ResultPortfolio.list = async () => {
        const portfolio_list = await ResultPortfolio.findAll();
        return portfolio_list;
      };
  
      // se debe pasar un objeto con el nombre de la propiedad y el valor
      ResultPortfolio.get_record = async (query_condition) => {
        const record_found = await ResultPortfolio.findOne({
          where: query_condition,
        });
        return record_found;
      };
  
      ResultPortfolio.create_new = async (portfolio) => {
        portfolio.user_name = portfolio.email;
  
  
      const new_portfolio = await ResultPortfolio.create(portfolio);
      return new_portfolio.id;
    };
  
    ResultPortfolio.activate_record = async (portfolio) => {
        await Portfolio.update({ where: { email } });
      };
  
      // update mediante id.
      ResultPortfolio.update_record = async (portfolio) => {
        const { id } = customer;
        const [num_updated] = await ResultPortfolio.update(
          { ...portfolio },
          { where: { id } }
        );
  
        if (num_updated > 0) {
          return 'portfolio updated successfully';
        } else {
          throw new client_error('Error updating portfolio');
        }
      };
      //busca el usuario por email
      ResultPortfolio.serch_by_email = async (portfolio_email) => {
        const { email } = portfolio_email;
        let portfolio = await ResultPortfolio.findOne({ where: { email } });
        return portfolio;
      };
    
    };