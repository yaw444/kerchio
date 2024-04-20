const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = '402e6a4e9f7a4a4eb990fa57da03604e';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// Middleware to serve static files
app.use(express.static('public'));

// Route to fetch news articles
app.get('/news', async (req, res) => {
    try {
        const response = await axios.get(NEWS_API_URL, {
            params: {
                domains: 'cnn.gr,metropolis.gr,news247.com,naftemporiki.gr,protothema.gr,newsit.gr',
                apiKey: API_KEY
            }
        });
        const articles = response.data.articles;
        // Filter out articles without images
        const articlesWithImages = articles.filter(article => article.urlToImage);
        res.json(articlesWithImages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news articles' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
