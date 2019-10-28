const UserSkill = require('../../models').UserSkill
const ResourceController = require('./resource.controller')

class UserSkillsController extends ResourceController{
    constructor() {
        super()
        this.setModel(UserSkill)
    }
}

module.exports = new UserSkillsController