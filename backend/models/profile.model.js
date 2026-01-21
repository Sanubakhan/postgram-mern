const mongoose = require('mongoose');
const { Schema } = mongoose;
const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
        unique: true
    },
    bio: {
        type: String,
        default: ''
    },
    avatarUrl: {
        type: String,   
        default: ''
    },
    username: {
  type: String,
  unique: true
},
followersCount: {
  type: Number,
  default: 0
},
followingCount: {
  type: Number,
  default: 0
}

}, { timestamps: true });   
module.exports = mongoose.model('Profile', profileSchema);