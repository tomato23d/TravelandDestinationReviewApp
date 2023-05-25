const Place = require('./place');
const Review = require('./review');

Place.hasMany(Review, {
  foreignKey: 'place_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(Place, {
  foreignKey: 'place_id',
});

module.exports = { Place, Review };
