import User from './User.model';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Pendente',
    },
  }, {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  User.hasMany(Sale, { foreignKey: 'sellerId', as: 'sellerSales', onDelete: 'CASCADE' });
  User.hasMany(Sale, { foreignKey: 'userId', as: 'userSales', onDelete: 'CASCADE' });
  Sale.belongsTo(User, { foreignKey: 'sellerId', as: 'saleSeller', onDelete: 'CASCADE' });
  Sale.belongsTo(User, { foreignKey: 'userId', as: 'saleUser', onDelete: 'CASCADE' });

  return Sale;
};

