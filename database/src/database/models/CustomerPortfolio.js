const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
{
  const CustomerPortfolio = sequelize.define(
    'customerPortfolio',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      simulation: {
        type: DataTypes.JSON,      
      
      }
    }
  )
  CustomerPortfolio.list = async () =>
  {
    const portfolio_list = await CustomerPortfolio.findAll();
    return portfolio_list;
  };
  CustomerPortfolio.get_record = async (query_condition) =>
  {
    const record_found = await CustomerPortfolio.findOne({
      where: query_condition,
    });
    return record_found;
  };
  CustomerPortfolio.create_new = async (portfolio) =>
  {

    const new_portfolio = await CustomerPortfolio.create({
      simulation: portfolio.simulation,
      customer_id: portfolio.customer_id
    });
    return new_portfolio;
  };
  CustomerPortfolio.update_record = async(portfolio)=>{
    const { customer_id } = portfolio;
    const new_portfolio = await CustomerPortfolio.update(
      { ...portfolio },
      { where: { customer_id } }
     
    );
    return new_portfolio;
  }
}