const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const md5 = require('md5');
const { ObjectId } = require('bson');

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
      })
);
app.use(bodyParser.json());

const db = 'mongodb+srv://aditya:adi@123@cluster0.izpgp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const Users = new Schema({
    _id: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const user = mongoose.model('user', Users);

const UsersProfile = new Schema({
    user_id: {
        type: String,
        required: true
    },
    dob : {
        type: String,
        required: true
    },
    Mobile_no : {
        type: String,
        required: true
    }
});
const userProfile = mongoose.model('userprofile', UsersProfile);
// let original_id1 = ObjectId();
// let original_id2 = ObjectId();
// let original_id3 = ObjectId();
// let original_id4 = ObjectId();
// let original_id5 = ObjectId();

let userData = [
    {_id: ObjectId(),fname: 'aditya', email:'adi@test.com', lname:'kumar', password:md5('12345')},
    {_id: ObjectId(),fname: 'john', email:'john@test.com', lname:'doe', password:md5('12345')},
    {_id: ObjectId(),fname: 'abcd', email:'abcd@test.com', lname:'kumar', password:md5('12345')},
    {_id: ObjectId(),fname: 'efgh', email:'adi@test.com', lname:'singh', password:md5('12345')},
    {_id: ObjectId(),fname: 'ijkl', email:'adi@test.com', lname:'mishra', password:md5('12345')},
];
user.insertMany(userData).then(function(){
    console.log("Data inserted");
}).catch(function(error){
    console.log(error);
});

let userProfileData = [
    {user_id: userData[0]._id, dob:new Date('1990-01-01'), Mobile_no: 123456},
    {user_id: userData[1]._id, dob:new Date('1995-01-01'), Mobile_no: 123457},
    {user_id: userData[2]._id, dob:new Date('1997-01-01'), Mobile_no: 123458},
    {user_id: userData[3]._id, dob:new Date('1998-01-01'), Mobile_no: 123459},
    {user_id: userData[4]._id, dob:new Date('1996-01-01'), Mobile_no: 123450}
];
userProfile.insertMany(userProfileData).then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));