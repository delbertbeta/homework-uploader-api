const express = require('express');
const app = express();
const logger = require('./middlewares/logger');

app.use(logger.logVisitInfo);

app.get('/api/get_all_info', require('./routes/getAllInfo'));
app.get('/api/get_homework_list', require('./routes/getHomeworkList'));
app.get('/api/verify_student_number', require('./routes/verifyStudentNumber'));
app.post('/api/add_homework', require('./routes/addHomework'));
app.get('/api/toggle_finish_state', require('./routes/toggleFinishState'));
app.post('/api/upload', require('./routes/upload'));

logger.logger.info("Starting server at http://localhost:4000/");
app.listen(4000);