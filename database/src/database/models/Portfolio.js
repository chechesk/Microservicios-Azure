const { DataTypes } = require('sequelize');
const client_error = require('../../utils/errors/index');
const { query } = require('express');

module.exports = (sequelize) => {
  const Portfolio = sequelize.define(
    'portfolio', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        FECHA_CORTE: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        TIPO_ENTIDAD: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        NOMBRE_TIPO_ENTIDAD: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        CODIGO_ENTIDAD: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        NOMBRE_ENTIDAD: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        TIPO_NEGOCIO: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        NOMBRE_TIPO_PATRIMONIO: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        SUBTIPO_NEGOCIO: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        NOMBRE_SUBTIPO_PATRIMONIO: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        CODIGO_NEGOCIO: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        NOMBRE_PATRIMONIO: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        PRINCIPAL_COMPARTIMENTO: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        TIPO_PARTICIPACION: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        RENDIMIENTOS_ABONADOS: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        PRECIERRE_FONDO_DIA_T: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        NUMERO_UNIDADES_FONDO_CIERRE_OPER_DIA_T_ANTERIOR: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        VALOR_UNIDAD_OPERACIONES_DIA_T: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        APORTES_RECIBIDOS: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        RETIROS_REDENCIONES: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        ANULACIONES: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        VALOR_FONDO_CIERRE_DIA_T: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        NUMERO_INVERSIONISTAS: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        RENTABILIDAD_DIARIA: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        RENTABILIDAD_MENSUAL: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        RENTABILIDAD_SEMESTRAL: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        RENTABILIDAD_ANUAL: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        nom_lower: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fondo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        TIPOS_DE_FONDOS_DE_INVERSION_COLECTIVA: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        TIPO_DE_RIESGO: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        valor_min: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        plazo: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      });
    
    // funciones del modelo

    Portfolio.list = async () => {
        const portfolio_list = await Portfolio.findAll();
        return portfolio_list;
      };
  
      // se debe pasar un objeto con el nombre de la propiedad y el valor
      Portfolio.get_record = async (query_condition) => {
        const record_found = await Portfolio.findOne({
          where: query_condition,
        });
        return record_found;
      };
  
      Portfolio.create_new = async (portfolio) => {
        portfolio.user_name = portfolio.email;
  
  
      const new_portfolio = await Portfolio.create(portfolio);
      return new_portfolio.id;
    };
  
    Portfolio.activate_record = async (portfolio) => {
        await Portfolio.update({ where: { email } });
      };
  
      // update mediante id.
      Portfolio.update_record = async (portfolio) => {
        const { id } = customer;
        const [num_updated] = await Portfolio.update(
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
      Portfolio.serch_by_email = async (portfolio_email) => {
        const { email } = portfolio_email;
        let portfolio = await Portfolio.findOne({ where: { email } });
        return portfolio;
      };
    };
  