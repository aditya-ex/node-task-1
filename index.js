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

const db = 'mongodb+srv://aditya:adi@12345@cluster0.eil7d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const Users = new Schema({
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
let ne =
user.insertMany([
    {fname: 'aditya', email:'adi@test.com', lname:'kumar', password:md5('12345')},
    {fname: 'john', email:'john@test.com', lname:'doe', password:md5('12345')},
    {fname: 'abcd', email:'abcd@test.com', lname:'kumar', password:md5('12345')},
    {fname: 'efgh', email:'adi@test.com', lname:'singh', password:md5('12345')},
    {fname: 'ijkl', email:'adi@test.com', lname:'mishra', password:md5('12345')},
]).then(function(){
    console.log("Data inserted");
}).catch(function(error){
    console.log(error);
});

userProfile.insertMany([
    {user_id: 1, dob:1-01-1990, Mobile_no: 123456},
    {user_id: 2, dob:2-02-1995, Mobile_no: 123457},
    {user_id: 3, dob:3-03-1998, Mobile_no: 123458},
    {user_id: 4, dob:4-04-2000, Mobile_no: 123459},
    {user_id: 5, dob:5-05-2001, Mobile_no: 123450}
]).then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));