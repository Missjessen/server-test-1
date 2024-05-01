const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { require } = require('module'); // Add this line
const process = require('process'); // Add this line

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

import dotenv from 'dotenv';
dotenv.config();

app.use(cors());
app.use(express.json());

app.post('/api/openai', async (req, res) => {
  const { prompt, model } = req.body;
  const headers = {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  };
  const data = {
    model: model,
    prompt: prompt,
    max_tokens: 150
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', data, { headers });
    res.json(response.data.choices[0].text);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch response from OpenAI', error });
  }
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});