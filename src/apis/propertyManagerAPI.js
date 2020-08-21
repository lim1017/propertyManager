import axios from 'axios';

export default axios.create({
  baseURL: 'https://tomproperty-api.herokuapp.com/api'
})