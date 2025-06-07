import mongoose from 'mongoose';
const stockSchema = new mongoose.Schema({ quantity: { type: Number, required: true } });
export default mongoose.model('Stock', stockSchema);
