import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/router';

dotenv.config();

const app = express();
const port = process.env.PORT;
const mongoDbUrl = process.env.CONNECTION_URL;

app.use(cors());
app.use(express.json());

app.use('/', router);

if (!mongoDbUrl) {
  console.error('⚡️ MongoDB URL is not defined. Please check your environment variables.');
  process.exit(1);
}

mongoose
  .connect(mongoDbUrl)
  .then(() => app.listen(port || 8000, () => console.log(`⚡️ Server is running at http://localhost:${port}`)))
  .catch((error) => console.log(`⚡️ ${error} did not connect`));
