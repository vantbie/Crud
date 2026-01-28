const { DataTypes } = require('sequelize');
const sequelize = require('../data/db'); 

//definimos el modelo "Topic"
const Topic = sequelize.define("Topic", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0 
    }
},{
  // CONFIGURACIÓN CLAVE:
  timestamps: false, // Le dice a Sequelize: "No busques createdAt ni updatedAt"
  tableName: 'topics' // Asegura el nombre de la tabla
});

module.exports = Topic;

/*function createTopic(title) {
  return {
    id: Date.now(),
    title,
    votes: 0,
    //links: []
  };
}*/
