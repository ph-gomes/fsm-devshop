const categoryModel = require("../models/category");
const productModel = require("../models/product");

const getCategory = db => async (req, res) => {
  const products = await productModel.getProductsByCategoryId(db)(
    req.params.id
  );
  const category = await categoryModel.getCategoryById(db)(req.params.id);
  res.render("category", {
    products,
    category
  });
};

const adminGetCategories = db => async (req, res) => {
  const categories = await categoryModel.getCategories(db)();
  res.render("admin/categories/index", {
    categories
  });
};

const adminCreateCategory = db => async (req, res) => {
  if (req.method === "GET") res.render("admin/categories/create");
  else {
    try {
      await categoryModel.createCategory(db)(req.body);
      res.send(req.body);
    } catch (err) {
      res.send(err);
    }
  }
};
module.exports = {
  getCategory,
  adminGetCategories,
  adminCreateCategory
};
