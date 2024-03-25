const mongoose= require('mongoose');
const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female','other'],
        required:true,
        message:"{VALUE}Please enter a valid genter male or female or other gender"
    },
    phone:{
        type:String,
        required:true
    },
    doctor:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Patient', patientSchema);
