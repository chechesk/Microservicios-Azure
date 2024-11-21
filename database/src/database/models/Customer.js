  const { DataTypes } = require('sequelize');
  const client_error = require('../../utils/errors/index');
  const { query } = require('express');

  module.exports = (sequelize) => {
    const Customer = sequelize.define(
      'customer',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        user_name: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(319),
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false, 
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        verification_code: {
          type: DataTypes.STRING,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'customer',
          validate: {
            isIn: [['customer', 'moderador', 'administrador']],
          },
        },
      },
      { timestamps: true }
    );

    // funciones del modelo

    Customer.list = async () => {
      const customers_list = await Customer.findAll();
      return customers_list;
    };

    // se debe pasar un objeto con el nombre de la propiedad y el valor
    Customer.get_record = async (query_condition) => {
      const record_found = await Customer.findOne({
        where: query_condition,
      });
      return record_found;
    };

    Customer.create_new = async (customer) => {
      customer.user_name = customer.email;


    const new_customer = await Customer.create(customer);
    return new_customer.id;
  };

    Customer.activate_record = async (customer) => {
      await Customer.update({ where: { email } });
    };

    // update mediante id.
    Customer.update_record = async (customer) => {
      const { id } = customer;
      const [num_updated] = await Customer.update(
        { ...customer },
        { where: { id } }
      );

      if (num_updated > 0) {
        return 'Customer updated successfully';
      } else {
        throw new client_error('Error updating customer');
      }
    };
    // update mediante id. contraseña requiriendo la contraseña antigua para validar
Customer.update_recordp = async (customer) => {
  const { id, password } = customer; // Asumiendo que customer tiene una propiedad password

  // Validar que se proporcionó una contraseña
  if (!password) {
    throw new client_error('La contraseña es requerida para la actualización.');
  }

  const [num_updated] = await Customer.update(
    { password }, // Actualizar solo la contraseña
    { where: { id } }
  );

  if (num_updated > 0) {
    return 'Contraseña actualizada correctamente';
  } else {
    throw new client_error('Error actualizando la contraseña del cliente');
  }
};

    //busca el usuario por email
    Customer.serch_by_email = async (customer_email) => {
      const { email } = customer_email;
      let customer = await Customer.findOne({ where: { email } });
      return customer;
    };
  };


