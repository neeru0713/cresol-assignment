const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;


let mongoURI;
if (process.env.NODE_ENV === "production") {
  mongoURI =
  "mongodb+srv://neerurani1307:%40Neeru1307@neerucluster.z4krrc9.mongodb.net/cresol?retryWrites=true&w=majority";
} else {
  mongoURI = "mongodb://localhost:27017/cresol";
}


mongoose.connect(mongoURI, {
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
