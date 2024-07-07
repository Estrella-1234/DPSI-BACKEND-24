const { Sequelize } = require('sequelize');

// Konfigurasi koneksi Sequelize
// const sequelize = new Sequelize(process.env.DB_URI);

const sequelize = new Sequelize('dpsi24', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});



const User = require('./user')(sequelize);


// Define associations



// Sinkronkan model dengan database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });


module.exports = {
    sequelize,
    User,
};