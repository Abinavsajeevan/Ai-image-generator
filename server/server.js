require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { image, audio } = require('./controller/controller');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



app.post('/api/image', image);


// app.post('/api/audio', audio);

app.listen(PORT, () => console.log(`Server live on http://localhost:${PORT}`));