import express from 'express';
import { zerodhaRouter } from './routes/zerodha';
export const app = express();

// For parsing application/json
app.use(express.json());

// ROUTES
app.use('/api/zerodha', zerodhaRouter);

if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist';
  app.use(express.static(frontendFiles));
  app.get('/*', (_, res) => {
    res.send(frontendFiles + '/index.html');
  });
  app.listen(process.env['PORT']);
}
