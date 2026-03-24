require('dotenv').config();
import express, { json } from 'express';
import cors from 'cors';

import productsRoutes from './routes/productsRoutes.js';

const app  = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(json());

app.get('/health', (_req, res) => {
  res.json({ service: 'products-service', status: 'OK', timestamp: new Date() });
});

app.use('/api/products', productsRoutes);

app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

app.use((err, _req, res, _next) => {
  console.error('[products-service] Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`✅ products-service corriendo en el puerto ${PORT}`);
});
