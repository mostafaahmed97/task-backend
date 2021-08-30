// Applies the relations between models on the sequelize instance
function applyRelations(db) {
  const { models } = db;
  models.user.hasOne(models.cart, { onDelete: "cascade" });
  models.cart.hasMany(models.cartitem);
  models.product.hasMany(models.cartitem, { onDelete: "cascade" });
}

module.exports = applyRelations;
