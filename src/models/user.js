'use strict';
const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Op = Sequelize.Op
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET = 'DSFGSD453435sdgfhdfg%&¨*#¨$%#sdgfsd'

class User extends Model {

  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "O nome deve ser informado"
          }
        }
      },
      description: DataTypes.STRING,
      pic: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "O email deve ser informado"
          },
          isEmail: {
            msg: "Não é uma email válido"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "A senha deve ser informada"
          }
        }
      }
    }, {
      sequelize,
      underscored: true,
      hooks: {
        beforeSave: (user, options) => {
          try {
            bcrypt.getRounds(user.password)
          } catch (error) {
            user.password = bcrypt.hashSync(user.password, 10)
          }
        }
      }
    })
  }

  static associate(models) {
    this.hasMany(models.UserSkill, {
      as: 'UserSkills'
    })
  }

  static async search(query) {
    const limit = query.limit ? parseInt(query.limit) : 20
    const offset = query.offset ? parseInt(query.offset) : 0
    let where = {}
    if (query.name) where.name = {
      [Op.like]: `%${query.name}%`
    }
    if (query.email) where.email = q.query.email

    const entities = await User.findAndCountAll({
      where: where,
      limit: limit,
      offset: offset
    })

    return {
      entities: entities.rows,
      meta: {
        count: entities.count,
        limit: limit,
        offset: offset
      }
    }

  }

  static async get(id) {
    return await User.findByPk(id, {
      include: [{
        model: this.sequelize.models.UserSkill,
        as: 'UserSkills',
        include: [{
          model: this.sequelize.models.Skill,
          as: 'Skill',
        }]
      }]
    })
  }

  static async verifyLogin(email, password) {
    try {
      let user = await User.findOne({
        where: {
          email: email
        },
      })

      if (!user) {
        throw new Error('Email não encontrado.')
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Senha não confere.')
      }

      let token = jwt.sign({
        id: user.id
      }, SECRET, {
        expiresIn: '1d'
      })

      return {
        user: user,
        token: token
      }

    } catch (error) {
      throw error
    }
  }

  static async verifyToken(token) {
    return await jwt.verify(token, SECRET)
  }

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }

}

module.exports = User