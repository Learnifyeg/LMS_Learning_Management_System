import api from "@/API/Config";
import Urls from "@/API/URL";
import useTokenStore from "../user";
import { useAppStore } from "../app";
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  fullName: string;
  phoneNumber: string;
  address: string;
  country: string;
  university: string;
  major: string;
  educationLevel: string;
  gender: "male" | "female";
}
class User {
  async login(data: LoginData) {
    try {
      useAppStore.setState({ isLoading: true });
      const response = await api.post(Urls.login, data);
      if (response.status === 200) {
        useTokenStore.setState({ token: response.data.token });
        useTokenStore.setState({ user: response.data.user });
        // useAppStore.commit({ type: "setToast", payload: "Login Success" });
        useAppStore.setState({ isLoading: false });
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  //   async register(data: RegisterData){

  //   };
  async logout() {}
}

export default User;
