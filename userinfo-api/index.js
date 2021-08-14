
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');

const userRouter = require('./src/routes/user');




const app = express();
app.use(bodyParser.json());

app.use(userRouter);

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
  .connect('mongodb+srv://admin:admin@residentsconnect-cluste.r0t44.mongodb.net/usersinfo?retryWrites=true&w=majority')
  .then(() => {
    app.listen(4002,()=>{
        console.log('User Info Service: Listening on 4002');
    });
  })
  .catch(err => {
    console.log(err);
  });