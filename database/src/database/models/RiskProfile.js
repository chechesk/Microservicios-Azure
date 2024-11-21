const { DataTypes } = require('sequelize');
const { client_error } = require('../../utils/errors');

module.exports = (sequelize) => {
  const RiskProfile = sequelize.define(
    'RiskProfile',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      onthly_income: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      type_of_income: {
        type: DataTypes.STRING,
        //  DataTypes.ENUM(
        //   'inheritance',
        //   'investments',
        //   'salary',
        //   'savings',
        //   'other'
        // ),
      },
      capital_willing_to_invest: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      investment_horizon: {
        type: DataTypes.STRING,
        // DataTypes.ENUM(
        //   '3 months',
        //   '6 months',
        //   '12 months',
        //   '> 12 months'
        // ),
      },
      investment_experience_level: {
        type: DataTypes.STRING,
        //  DataTypes.ENUM('high', 'moderate', 'low'),
      },
      temporary_losses: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      high_or_moderate_returns: {
        type: DataTypes.STRING,
        // DataTypes.ENUM('high returns', 'moderate returns'),
      },
      capital_willing_to_lose: {
        type: DataTypes.STRING,
        //  DataTypes.ENUM(
        //   'less than 5%',
        //   'less than 10%',
        //   'less than 50%',
        //   'less than 70%',
        //   'less than 90%'
        // ),
      },
      risk_tolerance: {
        type: DataTypes.STRING,
        // DataTypes.ENUM('high', 'medium', 'low'),
      },
      reinvest_profits: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      temporary_loss_reaction: {
        type: DataTypes.STRING,
        // DataTypes.ENUM('sell', 'hold', 'buy'),
      },
      long_term_financial_goals: {
        type: DataTypes.STRING,
        //  DataTypes.ENUM(
        //   'preserve capital',
        //   'moderate growth',
        //   'achieve profitability and growth'
        // ),
      },
      max_loss_percentage_per_day: {
        type: DataTypes.STRING,
        // DataTypes.ENUM(
        //   'less than 1%',
        //   'less than 2%',
        //   'less than 5%',
        //   'less than 8%',
        //   'less than 10%'
        // ),
      },
      currencies: {
        type: DataTypes.ENUM('USD', 'EUR', 'COP', 'MXN'),
        allowNull: true,
      }
    },
    { timestamps: false }
  );
  RiskProfile.list = async () => {
    const RiskProfile_list = await RiskProfile.findAll();
    return RiskProfile_list;
  };

  RiskProfile.get_record = async (query_condition) => {
    const record_found = await RiskProfile.findOne({
      where: query_condition,
    });
    return record_found;
  };
  // crea un nuevo RiskProfile si no hay customer_id repetido
  RiskProfile.create_new = async (data) => {
    const { customer_id } = data;

    const query = { customer_id: customer_id };
    const risk_profile_found = await RiskProfile.get_record(query);

    // si RiskProfile_found es null entonces puedo crear un nuevo RiskProfile
    if (risk_profile_found === null) {
      await RiskProfile.create(data);
      return 'Risk Profile created successfully';
    } else throw new client_error('Customer already has Risk Profile');
  };
};
