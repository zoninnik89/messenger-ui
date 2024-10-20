
import { makeAutoObservable } from 'mobx';
import websocketService from '../services';

class UserStore {
  currentUser = null;

  constructor() {
    makeAutoObservable(this);

    const currentUnixTime = Math.floor(Date.now() / 1000);
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      if (parsedUserData['exp'] > currentUnixTime) {
        this.currentUser = parsedUserData;
      } else{
        this.resetUserData();
        };
    } else {
      this.resetUserData();
    } 
  }

  saveUserData(token) {
    const tokenPayload = parseToken(token);
    this.currentUser['token'] = token;
    this.currentUser['id'] = tokenPayload['uid'];
    this.currentUser['login'] = tokenPayload['login'];
    this.currentUser['exp'] = tokenPayload['exp']

    localStorage.setItem('userData', JSON.stringify(this.currentUser));
  }

  saveUserDataToStorage() {
    localStorage.setItem('userData', JSON.stringify(this.currentUser));
  }

  getUserID() {
    return this.currentUser.id;
  }

  removeUserData() {
    this.resetUserData();
    localStorage.removeItem('userData');
  }

  resetUserData() {
    this.currentUser = {
      token: '',
      id: '',
      login: '',
      exp: '',
    };
  }

  setWebSocketService(service) {
    this.websocketService = service;
  }

}

const parseToken = (token) => {
  try {
    // Split the token into its three parts
    const base64Url = token.split('.')[1]; // Payload is the second part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Decode the Base64 string to a JSON string
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    // Parse the JSON string and return the payload
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}

const userStore = new UserStore();
export default userStore;