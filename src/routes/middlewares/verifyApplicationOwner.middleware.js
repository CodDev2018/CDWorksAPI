const Application = require('../../models').Application
const errorRes = require('../responses/error.response')

module.exports = async (req, res, next) => {
    try {
        const application = await Application.get(req.params.id)

        if (application.userId !== req.body.user.id) {
            return errorRes(res, 400, 'Você não tem permissão para acessar esse recurso.')
        }

        next()
    } catch(error) {
        console.log(error)
        return errorRes(res, 404, 'Job não encontrado.', error)
    }
}