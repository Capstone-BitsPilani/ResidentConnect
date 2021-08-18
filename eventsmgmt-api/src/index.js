
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const eventRouter = require('./routes/event');




const app = express();
app.use(bodyParser.json());

//app.set('trust proxy',true);

//app.use(apartmentmodelsRouter);
app.use(eventRouter);

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


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4003,()=>{
        console.log('****************************************Events management Info Service: Listening on 4003');
    });
  })
  .catch(err => {
    console.log(err);
  });