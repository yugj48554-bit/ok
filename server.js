const express = require('express');
const cors = require('cors');
const app = express();

// 1. ALLOW ALL ORIGINS (This fixes the 'Not Working' issue on GitHub)
app.use(cors({ origin: '*' }));
app.use(express.json());

const jobData = {
    "frontend": { "React": 90, "TypeScript": 80, "CSS": 70 },
    "data": { "Python": 95, "SQL": 85, "Stats": 80 }
};

// Health Check Route (To see if backend is actually alive)
app.get('/', (req, res) => res.send("Backend is Running!"));

app.post('/api/analyze', (req, res) => {
    const { role } = req.body;
    const requirements = jobData[role] || jobData["frontend"];
    
    // Logic to calculate gap
    const analysis = Object.keys(requirements).map(skill => ({
        skill,
        gap: Math.floor(Math.random() * 50) + 10 // Mock gap for demo
    }));

    res.json({ analysis });
});

// 2. USE PROCESS.ENV.PORT (Required for Render/Heroku)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server active on port ${PORT}`));
