const { Double, Decimal128 } = require('bson');
var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var paymentsinfoSchema = new Schema({
    communityid : {type: Schema.Types.ObjectId, ref: 'community',required: true},
    communityname :{type:String},

    apartmentid : {type: Schema.Types.ObjectId, ref: 'apartments',required: true},
    aptnum : {type:String},

    period: {type:String},
    category:{type:String},   
    createdat:{type:Date,required: true, default: Date.now},
    dueat:{type:Date,required: true},
    amt:{type:Number},
    fine:{type:Number,required: true, default: 0},
    totamt:{type:Number},
    status:{type: String,
        enum:  ['overdue', 'due', 'paid'],
        default: 'due'
    },
    paidon:{type:Date},
    paymentdetails:{
        type:{type: String},
        cardnumber:{type:String},
        accountnumber:{type:String}
    }
  
    
});

module.exports =mongoose.model('payments', paymentsinfoSchema );