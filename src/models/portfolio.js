
'use strict';
const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Op = Sequelize.Op

class Portfolio extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O userId deve ser informado.'
          },
          async isInUsers(value) {
            try {
              const user = await this.sequelize.models.User.get(value)
              if (!user) {
                throw new Error('Usuario associado não pode ser encontrado');
              }
            } catch (error) {
              throw error;
            }
          }
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O título deve ser informado.'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      pic: {
        type: DataTypes.STRING
      },
    }, {
      sequelize,
      underscored: true
    })
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'User'
    })
  }

  static async search(query, limit, offset) {
    let where = {}
    if (query.title) where.title = {
      [Op.like]: `%${query.title}%`
    }
    return await Portfolio.findAndCountAll({
      where: where,
      limit: limit < 100 && limit > 0 ? limit : 20,
      offset: offset
    })
  }

  static async get(id) {
    return await Portfolio.findByPk(id)
  }
}

module.exports = Portfolio