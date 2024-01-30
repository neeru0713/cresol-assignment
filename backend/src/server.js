const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/cresol', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
