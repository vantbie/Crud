const { Sequelize } = require('sequelize'); //exportamos la clase sequelize

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data.sqlite',
  logging: false
});

module.exports = sequelize;

/*db.serialize(() => {             
  //inicia una accion
  db.run(`
    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      votes INTEGER DEFAULT 0
    )
  `);
});

//exportamos
module.exports = db; */
