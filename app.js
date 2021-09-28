const express = require('express');

const callcrawler = require('./crawler/crawler_client'); //crawler client

const app = express();

app.use(express.urlencoded({ extended: false, limit: '50mb' }))

app.get('/api/add/:uname', async (req, res, next) => {
  try {
    const uname = req.params.uname;

    const reposse = await callcrawler(uname, true);

    res.status(200).send({ success: true, data: reposse });

  } catch (err) {
    res.status(500).send({ success: false, msg: 'Internal server error', error: err });
  }

})

module.exports = app;