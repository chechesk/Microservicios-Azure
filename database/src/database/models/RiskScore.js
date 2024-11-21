const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
  const RiskScore = sequelize.define(
    'riskScore',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      profile:{
        type: DataTypes.STRING,
      },
      max_drawdown:{
        type: DataTypes.DOUBLE,
      },
      stocks:{
        type: DataTypes.DOUBLE,
      },
      etfs:{
        type: DataTypes.DOUBLE,
      },
      funds:{
        type: DataTypes.DOUBLE
      }
    }
  )
  RiskScore.get_record = async (query_condition) => {
    const record_found = await RiskScore.findOne({
      where: query_condition,
    });
    return record_found;
  };

  RiskScore.create_new = async (data) => {
    const new_risk_score ={
  profile: data.profile ,
  max_drawdown:data.max_drawdown ,
  stocks: data.stocks,
  etfs: data.etfs,
  funds:data.funds,
  customer_id:data.id
    
}

    const query = { customer_id: data.id };
    const found = await RiskScore.get_record(query);

    if (found === null) {
      await RiskScore.create(new_risk_score);
      return 'Risk score created successfully';
    } else throw new client_error('Customer already has Risk score');
  };
  return RiskScore
}