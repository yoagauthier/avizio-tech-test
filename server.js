require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/create-zoom-meeting', async (req, res) => {
  let zoomResponse;
  try {
    zoomResponse = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        start_time: req.body.start_time,
        duration: req.body.duration,
        topic: req.body.topic,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.ZOOM_JWT}`,
        },
      },
    );
    console.log(zoomResponse);
  } catch (e) {
    console.log('Issue creating the meeting on the Zoom API', e);
    return res.status(500).send();
  }
  return res.status(200).send('Success');
});

app.listen(PORT);
console.log(`Server started on port ${PORT}`);
