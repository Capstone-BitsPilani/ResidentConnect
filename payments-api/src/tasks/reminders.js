const { validationResult } = require('express-validator');
const axios = require ('axios');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

const PaymentInfo = require('../models/payments-info');
sendMail =async (recipient,dueamt)=>{
    const subject=req.body.subject;
    const body=`maintenance due=Rs ${req.body.amt}`;
    var email={
        "subject":subject,
         "body":body,
         "recipient":recipient
    }
    //await axios.post('https://zl4i20n7s8.execute-api.ap-south-1.amazonaws.com/dev/sendMail', email)
    await axios.post(`${process.env.NOTIFICATION_URI}/sendMail`,email)
        .then(res => {}
        )
        .catch(err=>{
            //console.log(err);
            const error = new HttpError(
                `Something went wrong, could not send emails`,
                500
              );
              return next(error);
        })
    res.status(200).json(email);
}
exports.sendReminderMails = async function() {
    let payments=[];
    try{
        payments=await PaymentInfo.find({status:'due'});
        console.log(payments);
        payments.map(payment=>{
            const searchquery={'apartments.apartmentid':payment.apartmentid};
            
           // axios.post(`https://residentsconnect-stg.srscloudapps.link/api/users/search`,searchquery)

            axios.post(`http://localhost:4002/api/users/search`,searchquery)
            .then(response => {
                const users=response.data.users;
                const emails=[];
                users.map(user=>{
                    emails.push(user.email)
                });
                if(emails.length!=0)
                {
                    //sendMail(emails,payment.amt);
                    console.log('send email');
                }
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
