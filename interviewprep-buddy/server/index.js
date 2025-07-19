const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/dsa', require('./routes/dsa'));
app.use('/api/hr', require('./routes/hr'));
app.use('/api/company', require('./routes/company'));

app.get('/', (req, res) => {
  res.send("API is working");
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
