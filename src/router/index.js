import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/chatgpt',
      name: 'chatgpt',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChatgptView.vue')
    },
    {
      path: '/navguard',
      name: 'navguard',
      component: () => import('../views/NavGuardView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})


router.beforeEach(async(to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    }
    else {
      next({ path: '/login' })
    }
  }
  else {
    next()
  }
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    console.log("test currentUser", getCurrentUser)
    const removeListener = onAuthStateChanged(
      getAuth(),
      user => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}




/* 
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/fetch-response', async (req, res) => {
    const { prompt } = req.body;
    const params = {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100
    };
    const headers = {
        'Authorization': "sk-proj-2LiIWht9AZEFOsqSvV77T3BlbkFJf5yf0RQp00u1rsgmvZSA", // Securely stored API key
        'Content-Type': 'application/json'
    };

    try {
        const result = await axios.post('https://api.openai.com/v1/completions', params, { headers });
        res.json({ response: result.data.choices[0].text });
    } catch (error) {
        console.error('Error from OpenAI API:', error);
        res.status(500).json({ message: 'Failed to fetch response' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

 */

export default router

