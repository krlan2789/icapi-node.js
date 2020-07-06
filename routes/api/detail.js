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
    desc: Joi.string().required()
  };
  return Joi.validate(content, schema);
}

// Router : Get All
router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM detailcollection';
  mdb.read(queryString, function(content) {
    res.send(content.data);
  });
});

// Router : Get One
router.get('/:id', (req, res) => {
  const queryString = `SELECT * FROM detailcollection WHERE codeDC='${req.params.id}'`;
  mdb.read(queryString, function (content) {
    res.send(content.data);
  });
});

// Router : Post
router.post('/', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [ 
    [ req.body.code, req.body.desc, getDateNow() ]
  ];
  const queryString = 'INSERT INTO detailcollection (codeDC, descDC, dateDC) VALUES (?)';
  mdb.insert(queryString, values, function(content) {
    res.send(content.data);
  });
});

// Router : Put
router.put('/:id', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [
    req.params.id, req.body.title, getDateNow()
  ];
  const queryString = `UPDATE detailcollection SET 
                      descDC='${values[1]}', 
                      dateDC='${values[2]}' 
                      WHERE codeDC='${values[0]}'`;
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
  const queryString = `DELETE FROM detailcollection WHERE codeDC='${req.params.id}'`;
  mdb.delete(queryString, function (content) {
    res.send(content.data);
  });
});

module.exports = router;