import Stock from "../models/Stock.js";

export const createStock = async (req, res) => {
  try {
    const stock = await Stock.create({ quantity: req.body.quantity });
    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const updated = await Stock.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const deleted = await Stock.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.json({ message: "Stock deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
