const crud = require('../../handlers/area1/crud')

module.exports = {
    create: (req, res) => {
      crud.create(req.query.time).then(resp => res.send(resp)).catch(resp => res.send(resp))
    },
    get: (req, res) => {
      crud.get().then(resp => res.send(resp)).catch(resp => res.send(resp))
    },
    nuke: (req, res) => {
      crud.nuke().then(resp => res.send(resp)).catch(resp => res.send(resp))
    },
};