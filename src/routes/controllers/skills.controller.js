const Skill = require('../../models').Skill
const ResourceController = require('./resource.controller')

class SkillController extends ResourceController{
    constructor() {
        super()
        this.setModel(Skill)
    }
}

module.exports = new SkillController