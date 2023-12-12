import  mongoose from "mongoose";
import { hash, compareHashes } from "../lib/crypto.js"


const {Schema, model} = mongoose;

const unique = true;
const required= true;
const timestamps = true

const LoginSchema = new Schema({
    email:{type:String, unique, required},
    password:{type:String}
}, { _id:false })


const userSchema = new Schema({
    loginInfo:{type:LoginSchema},
    role:{type:String, enum:["host", "user"]},
    firstName:{type:String},
}, { 
    timestamps,
    toJSON: {
        transform(doc, ret) {
        delete ret.loginInfo.password;
        delete ret.__v;
        },
    }, 
})

// This code creates a new User/Host and Hashes the 
// password for the database
userSchema.statics.register = async function(data) {
    const hashed = await hash(data.loginInfo.password)
    data.loginInfo.password = hashed
    const user = await User.create(data)
    return  user
}

userSchema.statics.login = async function(data) {

    const email = data.payload.email
    const password = data.payload.password
    const user = await User.findOne({"loginInfo.email":email})
    if (!user) { return false }

    const success = await compareHashes(password, user.loginInfo.password)

    return success ? user : false 
  }

/// This code runs before user is being deleted. 
//  makes a delete of Houses and reviews connected to the user
userSchema.pre('remove', async function() {
  console.log("User is being removed " + this._id)
  await House.deleteMany({ author: this._id })
  await Review.deleteMany({ author: this._id })
})

const User = model("user",userSchema);
export default User;