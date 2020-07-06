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
    desc: Joi.string().required()
  };
  return Joi.validate(content, schema);
}

// Router : Get All
router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM arccollection';
  mdb.read(queryString, function(content) {
    res.send(content.data);
  });
});

// Router : Get One
router.get('/:id', (req, res) => {
  const queryString = `SELECT * FROM arccollection WHERE codeAC='${req.params.id}'`;
  mdb.read(queryString, function (content) {
    res.send(content.data);
  });
});

// Router : Post
router.post('/', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [ 
    [ req.body.code, req.body.title, req.body.desc, getDateNow() ]
  ];
  const queryString = 'INSERT INTO arccollection (codeAC, titleAC, descAC, dateAC) VALUES (?)';
  mdb.insert(queryString, values, function(content) {
    res.send(content.data);
  });
});

// Router : Put
router.put('/:id', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [
    req.params.id, req.body.title, req.body.desc, getDateNow()
  ];
  const queryString = `UPDATE arccollection SET 
                      titleAC='${values[1]}', 
                      descAC='${values[2]}', 
                      dateAC='${values[3]}' 
                      WHERE codeAC='${values[0]}'`;
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
  const queryString = `DELETE FROM arccollection WHERE codeAC='${req.params.id}'`;
  mdb.delete(queryString, function (content) {
    res.send(content.data);
  });
});

module.exports = router;