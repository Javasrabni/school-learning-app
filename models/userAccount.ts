import mongoose from "mongoose";

const userAccounts = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }, grade: {
        type: String,
        required: true,
        default: '7'
    }
})

export default mongoose.models.User || mongoose.model("User", userAccounts)