'use strict';

const express = require('express');
const UserService = require('./users-service');

const userRouter = express.Router();
const jsonBodyParser = express.json();


userRouter
  .route('/')
  .get((req,res,next) => {
    UserService.getAllUsers(req.app.get('db'))
      .then(users => {
        res.json(UserService.serializeUsers(users));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { id } = req.body;
    const newUser = { id };

    if (newUser.id == null)
      return res.status(400).json({
        error: 'Missing ID in request body'
      });

    UserService.insertUser(
      req.app.get('db'),
      newUser
    )
      .then(user => {
        res
          .status(201)
          .json(UserService.serializeUser(user));
      })
      .catch(next);
  });

module.exports = userRouter;