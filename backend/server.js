const dotenv = require('dotenv');
dotenv.config();
const app= require('./src/app');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
