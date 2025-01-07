const baseUrl = 'http://slc.selectoptimus.com:43508/RestService.svc';
import axios from 'axios';

export default {
  login(userName, password) {
    const body = {User: userName, Password: password}; // For Test
    console.log('Login input : ', body); // For Test
    return axios.get(
      `${baseUrl}/Login?userName=${userName}&password=${password}`,
    );
  },
};
