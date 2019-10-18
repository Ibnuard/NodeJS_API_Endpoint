const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
var multer  =   require('multer');
const model = require('../models/ticketing.model');
const ticketing = mongoose.model('ticketing');
const response = require('../helper/wrapper');
const { ERROR: httpError } = require('../helper/httpError');
/*
const files  = require('../helper/files');
const fs = require('fs');
*/

/*
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
*/

const ticketingController = {
  getHandler : (req, res) => {
    ticketing.find((err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      if (value.length > 0) {
        response.wrapper_success(res, 200, 'Request has been proceseed', value);
      } else {
        response.wrapper_error(res, httpError.NOT_FOUND, 'Data pengaduan tidak ditemukan');
      }

    });
  },
  postHandler : (req, res) => {
    const date = Math.floor(Date.now() / 1000);

    let payload = {
      author_id: uuidv4(),
      judul: req.body.judul,
      kategori: req.body.kategori,
      lokasi: req.body.lokasi,
      isipengaduan: req.body.isipengaduan,
      pelapor: req.body.pelapor,
      status: req.body.status,
      photo: req.body.photo,
      date: req.date()
    }



    ticketing.create(payload, (err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      response.wrapper_success(res, 201, 'Pengaduan Telah masuk', value);
    });
  },


  putHandler : (req, res) => {
    let payload = {
      author_id: req.params.id
    }

    ticketing.findOneAndUpdate(payload, req.body, (err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }
      
      if (value != null) {
        response.wrapper_success(res, 202, 'Pengaduanmu sudah di edit', value);
      } else {
        response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Failed to update author');
      }

    });
  },

  deleteHandler : (req, res) => {
    let payload = {
      author_id: req.params.id
    }

    ticketing.findOneAndRemove(payload, (err, value) => {
      if (err) {
        return response.wrapper_error(res, httpError.INTERNAL_ERROR, 'An error has occurred');
      }

      if (value != null) {
        res.send({
          'code': 204,
          'success': 'true',
          'message': `pengaduan ${value.judul} telah di hapus`
        });
      } else {
        response.wrapper_error(res, httpError.INTERNAL_ERROR, 'Failed to delete author');
      }

    });
  }
}

module.exports = ticketingController;