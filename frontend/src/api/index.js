import axios from 'axios';
import baseURL from './config.js'
import { NotificationContainer, NotificationManager } from 'react-notifications';


console.log(baseURL)

const token = window.localStorage.getItem('token')
let t = token ? token.substring(0, 15) : null

console.log('TOKEN', t, 'NODE_ENV', process.env.NODE_ENV)


let resetHead = () => {
  return { headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` } }
}

const API = axios.create({ withCredentials: true, baseURL, headers: { Authorization: `Bearer ${token}` } });


const actions = {
  getUser: async () => {
    return await API.get(`/user`, resetHead())
  },
  signUp: async (user) => {
    let res = await API.post('/signup', user, resetHead())
    window.localStorage.setItem('token', res?.data?.token)
    return res
  },
  logIn: async (user) => {
    let res = await API.post('/login', user, resetHead())
    window.localStorage.setItem('token', res?.data?.token)
    return res
  },
  logOut: async () => {
    window.localStorage.removeItem('token')
    return await API.get('/logout', resetHead())
  },
  addPost: async (post) => {
    console.log(post)
    let res = await API.post('/addpost', post, resetHead())
    return res
  },

  addKata: async (kata) => {

    console.log(kata)

    let res = await API.post('/addkata', kata, resetHead())

    return res



  },



  addComment: async (comment) => {
    let res = await API.post('/addcomment', comment, resetHead())
    return res
  },

  getPosts: async (query) => {
    console.log(query)
    let res = await API.get(`/getposts`, { params: JSON.stringify(query) }, resetHead())
    console.log(res)
    return res
  },

  getKatas: async (data) => {
    console.log(data)
    let res = await API.get(`getkatas`, data, resetHead())
    console.log(res)
    return res
  },


  showDetails: async (data) => {
    console.log(data)
    let res = await API.post('/showDetails', data, resetHead())
    console.log(res)
    return res
  }


};

API.interceptors.response.use((response) => response, (error) => {
  console.error(error?.response?.data)
  if (error?.response?.data.name !== "JsonWebTokenError")
    NotificationManager.error(String(error?.response?.data.message))
  else
    NotificationManager.error("Please signup or login")

})

export default actions;
