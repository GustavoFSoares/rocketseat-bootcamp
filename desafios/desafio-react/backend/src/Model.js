const { uuid } = require("uuidv4");

const Model = {
  repositories: [],
  getIndexById(id) {
    let index = Model.repositories.findIndex(repository => repository.id === id)
    if(index === -1) {
      return null
    }
  },
  getDataById(id) {
    return Model.repositories.find(repository => repository.id === id)
  },
  add(data) {
    data = { ...data, id: uuid() }
    Model.repositories.push({ ...data })

    return data
  },
  update(id, data) {
    let dataIndex = Model.getIndexById(id)
    Model.repositories[dataIndex] = { ...Model.repositories[dataIndex], ...data }

    return Model.repositories[dataIndex]
  },
  delete(id) {
    let dataIndex = Model.getIndexById(id)
    if(dataIndex === null) {
      return false
    }

    Model.repositories.splice(dataIndex, 1)
    return true
  }
}

module.exports = Model