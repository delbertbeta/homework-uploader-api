const express = require('express');
const app = express();
const logger = require('./middlewares/logger');
const sequelize = require('./tools/sequelize');

sequelize.Orignal.sync();

app.use(logger.logVisitInfo);
app.set('trust proxy', 'loopback');

app.get('/api/get_all_info', require('./routes/getAllInfo'));
app.get('/api/get_homework_list', require('./routes/getHomeworkList'));
app.get('/api/verify_student_number', require('./routes/verifyStudentNumber'));
app.post('/api/add_homework', require('./routes/addHomework'));
app.get('/api/toggle_finish_state', require('./routes/toggleFinishState'));
app.post('/api/upload', require('./routes/upload'));
app.get('/api/download', require('./routes/download'));
app.get('/api/get_uploaded_list', require('./routes/getUploadedList'));

logger.logger.info("Starting server at http://localhost:4000/");
app.listen(4000);