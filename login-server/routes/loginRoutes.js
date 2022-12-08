const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;

router
    .route("/")
    .get(async (req, res) => {
        
    });