const User = require('../../models').User
const errorRes = require('../responses/error.response')

module.exports = async (req, res, next) => {
    try {
        if(!req.headers['x-access-token']) {
            return errorRes(res, 400, 'O header [x-access-token] deve ser informado.')
        }

        req.body.token = await User.verifyToken(req.headers['x-access-token'])
        req.body.userId = parseInt(req.body.token.id)
        req.body.user = await User.get(req.body.userId)

        if (!req.body.user) {
            return errorRes(res, 400, 'Usuário não encontrado.')
        }
        
        next()
    } catch (error) {
        console.log(error)
        return errorRes(res, 500, 'Não foi possivel validar o token de acesso.', error)
    }
}