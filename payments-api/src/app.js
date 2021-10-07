

const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const paymentsRouter = require('./routes/paymentsRouter');
const cron = require('node-cron');
const dueStatus = require('./tasks/dueStatus');
const reminders = require('./tasks/reminders');



const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.set('trust proxy',true);

//app.use(apartmentmodelsRouter);
app.use(paymentsRouter);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });  
  
  cron.schedule('0 1 * * *', () => {
  //cron.schedule('*/1 * * * *', () => {
    console.log('Update payment status from due to overdue  at  1 am IST on each day');
    dueStatus.updatePaymentStatus();
  }, {
    scheduled: true,
    timezone: "Asia/Calcutta"
  })

  cron.schedule('0 7 * * *', () => {
    console.log('send reminder mails for payment at 7 am IST  on each day');
    reminders.sendReminderMails();
  }, {
    scheduled: true,
    timezone: "Asia/Calcutta"
  })
  module.exports = app;
