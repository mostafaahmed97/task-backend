// Applies the relations between models on the sequelize instance
function applyRelations(db) {
  const { models } = db;
  models.user.hasOne(models.cart, { onDelete: "cascade" });
  models.cart.belongsTo(models.user);

  models.cart.hasMany(models.cartitem, { onDelete: "cascade" });
  models.cartitem.belongsTo(models.cart);

  models.product.hasMany(models.cartitem, { onDelete: "cascade" });
  models.cartitem.belongsTo(models.product);
}

module.exports = applyRelations;
