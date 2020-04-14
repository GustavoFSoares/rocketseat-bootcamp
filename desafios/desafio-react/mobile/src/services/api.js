import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.0.106:3333",
});

export default api;
export const Repository = {
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
  },
  like: (id) => {
    return new Promise((resolve, reject) => {
      api.post(`repositories/${id}/like`).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  dislike: (id) => {
    return new Promise((resolve, reject) => {
      api.post(`repositories/${id}/dislike`).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}