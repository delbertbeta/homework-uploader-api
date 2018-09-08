const Sequelize = require('sequelize');
const config = require('../config');

let sequelize;

if (config.database.type === 'mysql') {
  sequelize = new Sequelize(config.database.databaseName, config.database.username, config.database.password, {
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
} else if (config.database.type === 'sqlite') {
  sequelize = new Sequelize(config.database.databaseName, null, null, {
    dialect: 'sqlite',
    define: {
      timestamps: false
    },
    storage: config.database.url
  });
} else {
  throw "We do not support such type of db yet."
}


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

HomeworkList.hasMany(Upload, {
  foreignKey: 'target',
  targetKey: 'id'
})

module.exports = {
  HomeworkList: HomeworkList,
  Upload: Upload,
  Orignal: sequelize
};