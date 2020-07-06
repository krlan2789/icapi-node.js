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
    content: Joi.string().required(),
    order: Joi.string().required()
  };
  return Joi.validate(content, schema);
}

// Router : Get All
router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM chaptercollection';
  mdb.read(queryString, function(content) {
    res.send(content.data);
  });
});

// Router : Get One
router.get('/:id', (req, res) => {
  const queryString = `SELECT * FROM chaptercollection WHERE codeCC='${req.params.id}'`;
  mdb.read(queryString, function (content) {
    res.send(content.data);
  });
});

// Router : Post
router.post('/', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [ 
    [ req.body.code, req.body.title, req.body.content, req.body.order, getDateNow() ]
  ];
  const queryString = 'INSERT INTO chaptercollection (codeCC, titleCC, contentCC, orderCC, dateCC) VALUES (?)';
  mdb.insert(queryString, values, function(content) {
    res.send(content.data);
  });
});

// Router : Put
router.put('/:id', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [
    req.params.id, req.body.title, req.body.desc, req.body.order, getDateNow()
  ];
  const queryString = `UPDATE chaptercollection SET 
                      titleCC='${values[1]}', 
                      contentCC='${values[2]}', 
                      orderCC='${values[3]}', 
                      dateCC='${values[4]}' 
                      WHERE codeCC='${values[0]}'`;
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
  const queryString = `DELETE FROM chaptercollection WHERE codeCC='${req.params.id}'`;
  mdb.delete(queryString, function (content) {
    res.send(content.data);
  });
});

module.exports = router;