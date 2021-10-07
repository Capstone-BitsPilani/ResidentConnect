const { validationResult } = require('express-validator');
const axios = require ('axios');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

const PaymentInfo = require('../models/payments-info');

exports.updatePaymentStatus = async function() {
  
    var cutoff = new Date();

    
    let payments=[];
    try{
        //increase fine amt to 1 for overdue payment
        payments=await PaymentInfo.find( {status:'overdue'} );
        console.log(payments);
        payments.map(payment=>{
            const update={fine:payment.fine+1,totamt:payment.totamt+1};
            //axios.put(`https://residentsconnect-stg.srscloudapps.link/api/payments/${payment._id}`,update)
            axios.put(`http://localhost:4012/api/payments/${payment._id}`,update)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            

        });
        //change status to due to overdue and fine=1
         payments=await PaymentInfo.find({$and:[{dueat:{$lt:cutoff}} , {status:'due'} ]});
        console.log(payments);
        payments.map(payment=>{
            const update={status:'overdue',fine:payment.fine+1,totamt:payment.totamt+1};
            //axios.put(`https://residentsconnect-stg.srscloudapps.link/api/payments/${payment._id}`,update)
            axios.put(`http://localhost:4012/api/payments/${payment._id}`,update)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            

        });
        
      
    }
    catch (err) {
      console.log(err);
      
      
      }
  
      
  
  
  }