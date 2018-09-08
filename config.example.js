module.exports = {
  database: {
    type: 'mysql | sqlite',

    // for MySQL db, you should config things below.
    databaseName: 'homework_uploader',
    username: 'root',
    password: '',

    // url to your MySQL db or the file path to your SQLite db file.
    url: 'localhost | db.sqlite'
  }
};