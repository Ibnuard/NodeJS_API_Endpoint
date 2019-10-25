const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketinSchema = new Schema({
  author_id: {
    type: String,
    require: true
  },
  judul: {
    type: String,
    required: true
  },

  kategori: {
    type: String,
    required: true
  },

  lokasi: {
    type: String,
    required: true
  },

  isipengaduan: {
    type: String,
    required: true
  },
  
  pelapor: {
    type: String,
    required: true
  },
  
  status: {
    type: String,
    required: true
  },

  photo: {
    type: String,
    require: false
  },

  date: {
    type: String,
    require: true
  },

  uuid:{
    type: String,
    required: true
  }
  
});

mongoose.model('ticketing', ticketinSchema);