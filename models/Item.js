import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

export default mongoose.model('Item', itemSchema);
