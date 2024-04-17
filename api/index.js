const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// Middlewares
// permet llegir contingut json en posts
app.use(express.json());
// cors necessari quan api/front son a servidors diferents
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// permet llegir les cookies
app.use(cookieParser());

// Routes
//app.use('/api', routes);

// Read all route files and import them
fs.readdirSync(path.join(__dirname, 'routes')).forEach(file => {
    // Only include js files (you might also want to exclude index.js if present)
    if (file.endsWith('.js')) {
      const route = require(`./routes/${file}`);
      app.use('/api', route); // use them with a common prefix or individually
    }
  });

// iniciem servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});