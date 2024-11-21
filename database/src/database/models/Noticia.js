const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Noticia = sequelize.define(
        'noticia', 
    {
        id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  titulo_ingles: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noticia_ingles: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  titulo_espanol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  noticia_espanol: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Symbol: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sentimiento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  relevancia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
 },
    { timestamps: true }
  );


// Método para buscar una noticia por el ID del cliente (parece que esto debería ser para Kyc en lugar de Noticia)
Noticia.search_by_customer_id = async (customer_id) => {
  throw new Error('This method is not applicable to Noticia model. Perhaps it should belong to Kyc model.');
};

// Método para obtener todas las noticias
Noticia.get_all_news = async () => {
  const noticias = await Noticia.findAll();
  return noticias;
};

// Método para obtener una noticia por su ID
Noticia.get_news_by_id = async (news_id) => {
  const noticia = await Noticia.findByPk(news_id);
  return noticia;
};

// Método para crear una nueva noticia
Noticia.create_news = async (news_data) => {
  await Noticia.create(news_data);
  return 'News created successfully';
};

// Método para actualizar una noticia existente
Noticia.update_news = async (news_id, news_data) => {
  const [num_updated] = await Noticia.update(news_data, { where: { id: news_id } });

  if (num_updated > 0) {
    return 'News updated successfully';
  } else {
    throw new Error('Error updating news');
  }
};

// Método para eliminar una noticia
Noticia.delete_news = async (news_id) => {
  const num_deleted = await Noticia.destroy({ where: { id: news_id } });

  if (num_deleted > 0) {
    return 'News deleted successfully';
  } else {
    throw new Error('Error deleting news');
  }
};

}