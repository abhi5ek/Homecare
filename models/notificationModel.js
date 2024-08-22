const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notification: {
    type: String,
    required: true 
  }
});

module.exports = mongoose.model('notificat', notificationSchema);