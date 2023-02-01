import { Schema, model } from 'mongoose'

const user = new Schema({

    id: { type: String, unique: true, required: true }

});

export const User = model("User", user)