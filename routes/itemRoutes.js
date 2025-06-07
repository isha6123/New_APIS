import express from 'express';
import multer from 'multer';
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
} from '../controllers/itemController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), createItem);
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.put('/:id', upload.single('image'), updateItem);
router.delete('/:id', deleteItem);

export default router;
