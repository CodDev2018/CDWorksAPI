const User = require('../../models').User
const ResourceController = require('./resource.controller')
const successResponse = require('../responses/success.response')
const errorResponse = require('../responses/error.response')

class UsersController extends ResourceController{
    constructor() {
        super()
        this.setModel(User)
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            console.log(req.body, email, password)
            const result = await User.verifyLogin(email, password)
            successResponse(res, 200, 'Usuário autenticado com sucesso', result)
        } catch (error) {
            console.log(error)
            errorResponse(res, 500, 'Não foi possivel autenticar.')
        }
    }


    async update(req, res, next) {
        if (req.file) {
            req.body.pic = req.protocol + '://' + req.headers.host + '/uploads/' + req.file.filename
        }
        return await super.update(req, res, next)
    }
}

module.exports = new UsersController