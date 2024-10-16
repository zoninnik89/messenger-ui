import { makeAutoObservable } from 'mobx';

class UserStore {
  currentUser = {
    'token': '',
    'id': '',
    'login': '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  saveUserData(token) {
    const tokenPayload = parseToken(token);
    this.currentUser['token'] = token
    this.currentUser['id'] = tokenPayload['uid']
    this.currentUser['login'] = tokenPayload['login']
  }

  getUserID() {
    if (this.currentUser.id !== '') {
      return this.currentUser.uid;
    }
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