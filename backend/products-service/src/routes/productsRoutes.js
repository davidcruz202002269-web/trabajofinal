import { Router } from 'express';
const router  = Router();

import { getAll, getById, create, update, remove } from '../controllers/productsController.js';
import { verifyToken, requireAdmin } from '../middlewares/verifyToken.js';

// Rutas públicas (solo lectura)
router.get('/',    getAll);
router.get('/:id', getById);

// Rutas protegidas — solo admin puede modificar
router.post('/',    verifyToken, requireAdmin, create);
router.put('/:id',  verifyToken, requireAdmin, update);
router.delete('/:id', verifyToken, requireAdmin, remove);

export default router;
