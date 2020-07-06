const Joi = require('joi');
const express = require('express');
const { query } = require('express');
const router = express.Router();
const mdb = require('../../models/db_used').db;
const getDateNow = require('../../models/db_used').GetDateNow;

// Validate
const validate = function(content) {
  const schema = {
    code: Joi.string().min(8).max(8).required(),
    title: Joi.string().required(),
    creator: Joi.string().required()
  };
  return Joi.validate(content, schema);
}

// Router : Read All
router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM titlecollection';
  mdb.read(queryString, function(content) {
    res.send(content.data);
  });
});

// Router : Read One
router.get('/:id', (req, res) => {
  const queryString = `SELECT * FROM titlecollection WHERE codeTC='${req.params.id}'`;
  mdb.read(queryString, function (content) {
    res.send(content.data);
  });
});

// Router : Insert
router.post('/', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [ 
    [ req.body.code, req.body.title, req.body.creator, getDateNow() ]
  ];
  const queryString = 'INSERT INTO titlecollection (codeTC, titleTC, creatorTC, dateTC) VALUES (?)';
  mdb.insert(queryString, values, function(content) {
    res.send(content.data);
  });
});

// Router : Update
router.put('/:id', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [
    req.params.id, req.body.title, req.body.creator, getDateNow()
  ];
  const queryString = `UPDATE titlecollection SET 
                      titleTC='${values[1]}', 
                      creatorTC='${values[2]}', 
                      dateTC='${values[3]}' 
                      WHERE codeTC='${values[0]}'`;
  mdb.update(queryString, function(content) {
    if (content.error == null) {
      res.send(content.data);
    }
    else {
      res.send(content.error);
    }
  });
});

// Router : Delete
router.delete('/:id', (req, res) => {
  const queryString = `DELETE FROM titlecollection WHERE codeTC='${req.params.id}'`;
  mdb.delete(queryString, function (content) {
    res.send(content.data);
  });
});

module.exports = router;