import Unit from "../models/Unit.js";

export const createUnit = async (req, res) => {
  try {
    const unit = await Unit.create({ name: req.body.name });
    res.status(201).json(unit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find();
    res.json(units);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUnitById = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);
    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }
    res.json(unit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUnit = async (req, res) => {
  try {
    const updated = await Unit.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Unit not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    const deleted = await Unit.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Unit not found" });
    }
    res.json({ message: "Unit deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
