const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');

dotenv.config({ path: './.env' });

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});
