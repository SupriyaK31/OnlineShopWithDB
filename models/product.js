const db=require('../util/database');
const Cart=require('./card');



module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   return db.execute('Insert into products(title,price,imageUrl,description) values(?,?,?,?)',[this.title,this.price,this.imageUrl,this.description]);
  }
  static deleteById(id){
    return db.execute('delete from products Where products.id=?',[id]);
  }
  static fetchAll() {
      return db.execute('select * from products');
  }
  static findById(id){
    return db.execute('Select * from products Where products.id=?',[id]);
  }

};