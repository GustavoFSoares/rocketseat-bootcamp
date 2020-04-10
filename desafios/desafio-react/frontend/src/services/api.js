import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;
export const Project = {
  list: () => {
    return new Promise((resolve, reject) => {
      api.get('repositories').then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  add: (data) => {
    return new Promise((resolve, reject) => {
      api.post('repositories', data).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      api.delete(`repositories/${id}`, ).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}