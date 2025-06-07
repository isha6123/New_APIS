import Item from '../models/Item.js';

export const createItem = async (req, res) => {
  try {
    const { name, category, stock, unit, company } = req.body;
    const image = req.file?.path || '';

    const item = new Item({ name, image, category, stock, unit, company });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate('category')
      .populate('stock')
      .populate('unit')
      .populate('company');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('category')
      .populate('stock')
      .populate('unit')
      .populate('company');
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { name, category, stock, unit, company } = req.body;
    const image = req.file?.path;

    const updatedData = { name, category, stock, unit, company };
    if (image) updatedData.image = image;

    const item = await Item.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
