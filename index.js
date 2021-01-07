const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());


app.post('/events', async (req, res) => {
  const {
    type,
    data,
  } = req.body;

  switch (type) {
    case 'CommentCreated': {
      const {
        id,
        postId,
        content,
      } = data;

      const status = content.includes('orange') ? 'rejected' : 'approved';

      await axios.post('http://localhost:4005/events', {
        data: {
          id,
          postId,
          content,
          status,
        },
      });
    }
  }

  res.send({});
});

app.listen(4003, () => console.log('Listening to port 4003'));
