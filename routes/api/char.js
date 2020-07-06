const Joi = require('joi');
const express = require('express');
const { query } = require('express');
const router = express.Router();
const mdb = require('../../models/db_used').db;

// Validate
const validate = function(content) {
  const schema = {
    code: Joi.string().min(8).max(8).required(),
    name: Joi.string().required(),
    birth: Joi.string().required(),
    gender: Joi.string().required(),
    born: Joi.string().required()
  };
  return Joi.validate(content, schema);
}

// Router : Get All
router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM charcollection';
  mdb.read(queryString, function(content) {
    res.send(content.data);
  });
});

// Router : Get One
router.get('/:id', (req, res) => {
  const queryString = `SELECT * FROM charcollection WHERE codeChar='${req.params.id}'`;
  mdb.read(queryString, function (content) {
    res.send(content.data);
  });
});

// Router : Post
router.post('/', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [ 
    [ req.body.code, req.body.name, req.body.birth, req.body.gender, req.body.born ]
  ];
  const queryString = 'INSERT INTO charcollection (codeChar, nameChar, birthChar, genderChar, bornChar) VALUES (?)';
  mdb.insert(queryString, values, function(content) {
    res.send(content.data);
  });
});

// Router : Put
router.put('/:id', (req, res) => {
  const {error} = validate(req.body);  //  result.error
  if (error) return res.status(400).send(error.details[0].message);
  const values = [
    req.params.id, req.body.name, req.body.birth, req.body.gender, req.body.born
  ];
  const queryString = `UPDATE charcollection SET 
                      nameChar='${values[1]}', 
                      birthChar='${values[2]}', 
                      genderChar='${values[3]}', 
                      bornChar='${values[4]}' 
                      WHERE codeChar='${values[0]}'`;
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
  const queryString = `DELETE FROM charcollection WHERE codeChar='${req.params.id}'`;
  mdb.delete(queryString, function (content) {
    res.send(content.data);
  });
});

module.exports = router;