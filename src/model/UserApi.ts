import Axios, { AxiosInstance } from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com/';

const axiosInstance = Axios.create({ baseURL, timeout: 5000 });

export interface UserData {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string,
  },
}

class UserApi {
  axiosInstance: AxiosInstance;
  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getUsers(): Promise<UserData[]> {
    return (await this.axiosInstance.get('users')).data as UserData[];
  }
}

export default new UserApi(axiosInstance);