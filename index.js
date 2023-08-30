const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const config = require('./config/config');

const app = express();

app.use(express.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
