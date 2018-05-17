const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database.databaseName, config.database.username, config.database.passwork, {
  host: config.database.url,
  dialect: 'mysql',
  pool: {
    max: 30,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});

const HomeworkList = sequelize.define('homework_list', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  multifile: {
    type: Sequelize.BOOLEAN
  },
  create_folder: {
    type: Sequelize.BOOLEAN
  },
  finished: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  ddl: {
    type: Sequelize.DATE
  },
  tip: {
    type: Sequelize.STRING
  }
}, {
  indexes: [{
    unique: false,
    fields: ['ddl']
  }]
})

const Upload = sequelize.define('upload', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  who: {
    type: Sequelize.STRING
  },
  student_number: {
    type: Sequelize.STRING
  },
  target: {
    type: Sequelize.INTEGER
  },
  originalFile: {
    type: Sequelize.STRING
  },
  storageFile: {
    type: Sequelize.STRING
  },
  fileSize: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  indexes: [{
    unique: false,
    fields: ['student_number']
  }]
})

Upload.belongsTo(HomeworkList, {
  foreignKey: 'target',
  targetKey: 'id'
})

module.exports = {
  HomeworkList: HomeworkList,
  Upload: Upload,
  Orignal: sequelize
};