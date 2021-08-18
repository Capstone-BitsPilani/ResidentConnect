
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const paymentsRouter = require('./routes/paymentsRouter');




const app = express();
app.use(bodyParser.json());

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


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4012,()=>{
        console.log('****************************************Payment Request Info Service: Listening on 4012');
    });
  })
  .catch(err => {
    console.log(err);
  });