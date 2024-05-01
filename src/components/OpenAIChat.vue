<template>
    <div>
      <h1>Chat with OpenAI</h1>
      <input v-model="prompt" placeholder="Enter your prompt" @keyup.enter="sendPrompt">
      <button @click="sendPrompt">Send</button>
      <p>Response: {{ response }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const prompt = ref('');
  const response = ref('');
  
  const sendPrompt = async () => {
    try {
      const result = await axios.post('http://localhost:3000/api/openai', {
        prompt: prompt.value,
        model: 'text-davinci-003' // Specify the model you want to use
      });
      response.value = result.data;
      prompt.value = ''; // Clear prompt after sending
    } catch (error) {
      console.error('Error fetching response:', error);
      response.value = 'Failed to get a response.';
    }
  };
  </script>