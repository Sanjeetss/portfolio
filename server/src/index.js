import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import portfolioRoutes from './routes/portfolioRoutes.js';
import { getPool } from './config/db.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: clientUrl
  })
);
app.use(express.json());

app.get('/api/health', async (_req, res, next) => {
  try {
    await getPool().query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
});

app.use('/api', portfolioRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
