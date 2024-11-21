const { DataTypes } = require('sequelize');
const { client_error } = require('../../utils/errors');
const ALLOWED_EXTENSIONS = ['jpg', 'pdf', 'png'];

module.exports = (sequelize) => {
  const Kyc = sequelize.define(
    'kyc',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar:{
        type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   isUrl: true,
      // },
      },
      surname: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 18,
          max: 80,
        },
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      document_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['C.C', 'P.A', 'C.E']],
          },
        },
      },
      document_file: {
        type: DataTypes.STRING /* BLOB / / manejar la subida y descarga de archivos en tu aplicación, lo cual implica el uso de librerías y/o servicios para el almacenamiento de archivos, como Amazon S3, Google Cloud Storage o un sistema de archivos local */,
        allowNull: false,
        validate: {
          isAllowedExtension(value) {
            const extension = value.split('.').pop();
            if (!ALLOWED_EXTENSIONS.includes(extension.toLowerCase())) {
              throw new Error('The file must be JPG, PDF o PNG.');
            }
          },
        },
      },

      cellphone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        /* validate: {
          len: [10, 10],
        }, */
      },
      country_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
    },
    { timestamps: true }
  );

  // funciones del modelo
  Kyc.list = async () => {
    const kyc_list = await Kyc.findAll();
    return kyc_list;
  };

  // Busca KYC porcustomer_id
  Kyc.get_record = async (query_condition) => {
    const record_found = await Kyc.findOne({
      where: query_condition,
    });
    return record_found;
  };

  // crea un nuevo KYC si no hay customer_id repetido
  Kyc.create_new = async (kyc_data) => {
    const { customer_id } = kyc_data;

    const query = { customer_id: customer_id };
    const kyc_found = await Kyc.get_record(query);

    // si kyc_found es null entonces puedo crear un nuevo KYC
    if (kyc_found === null) {
      await Kyc.create(kyc_data);
      return 'KYC created successfully';
    } else throw new client_error('Customer already has KYC');
  };

  Kyc.update_record = async (kyc) => {
    const { id } = kyc;
    const [num_updated] = await Kyc.update({ ...kyc }, { where: { id } });

    if (num_updated > 0) {
      return 'Kyc updated successfully';
    } else {
      throw new client_error('Error updating customer');
    }
  };

  Kyc.serch_by_customer_id = async (customer_id) => {
    let kyc = await Kyc.findOne({ customer_id: customer_id });
    return kyc;
  };
};
