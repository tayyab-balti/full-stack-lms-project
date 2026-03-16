const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("myDB", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // stops showing testing in console
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connected successfully!");
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

testConnection();

// sequelize.sync({ force: false })
//   .then(() => console.log('Tables created!'))
//   .catch(err => console.log(err));

module.exports = sequelize;
