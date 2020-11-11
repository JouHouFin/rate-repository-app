import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`,
    );

    return accessToken ? accessToken : null;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`, accessToken
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;