const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save().then(()=>{
    res.redirect('/');
  })
  .catch((err)=>console.log(err));
  
};
exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  console.log(editMode);
  if(!editMode){
    return res.redirect('/');
  }
    const prodId=req.params.productId;
    console.log(prodId);
    Product.findById(prodId,product=>{
      res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing:true,
        product:product
      });
    });

};
exports.postEditProduct= (req,res,next)=>{
  const prodId=req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct=new Product(prodId,updatedTitle,updatedImageUrl,updatedDescription,updatedPrice);
  updatedProduct.save();
  res.redirect('/admin/products');
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  
};

exports.postDeleteProduct=(req,res,next)=>{
const prodId=req.body.productId;
Product.deleteById(prodId)
.then(()=>{
  res.redirect('/admin/products');
})
.catch((err)=>console.log(err));

};
