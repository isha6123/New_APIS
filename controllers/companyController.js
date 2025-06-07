import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "Company name is required" });

    const newCompany = new Company({ name });
    await newCompany.save();

    res
      .status(201)
      .json({ message: "Company created successfully", company: newCompany });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name } = req.body;
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ message: "Company updated successfully", company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
