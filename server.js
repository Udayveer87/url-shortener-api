const app = require('./app');
const connectDB = require('./config/db');
const { PORT } = require('./config/env');

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`URL shortener running on http://localhost:${PORT}`);
  });
});
