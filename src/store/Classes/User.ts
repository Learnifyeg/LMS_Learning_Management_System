import api from "@/API/Config";
import Urls from "@/API/URL";
import useTokenStore from "../user";
import { useAppStore } from "../app";
export interface LoginData {
  email: string;
  password: string;
}

export interface StudentRegisterData extends LoginData {
  fullName: string;
  phoneNumber: string;
  address: string;
  country: string;
  university: string;
  major: string;
  educationLevel: string;
  gender: "male" | "female";
}

export interface InstructorRegisterData extends LoginData {
  fullName: string;
  phoneNumber: string;
  address: string;
  country: string;
  gender: "male" | "female";
  specialization: string;
  yearOfExperience: number;
  bio?: string;
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
        return response.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      useAppStore.setState({ isLoading: false });
    }
  }

  //   async register(data: RegisterData){

  //   };
  async logout() {
    try {
      useAppStore.setState({ isLoading: true });
      useTokenStore.setState({ token: null });
      useTokenStore.setState({ user: undefined });
      // useAppStore.commit({ type: "setToast", payload: "Logout Success" });
    } catch (err) {
      console.log(err);
    } finally {
      useAppStore.setState({ isLoading: false });
    }
  }

  async instructorRegister(data: InstructorRegisterData) {
    try {
      useAppStore.setState({ isLoading: true });
      const response = await api.post(Urls.instrctorRegister, data);
      if (response.status === 200) {
        // useAppStore.commit({ type: "setToast", payload: "Login Success" });
        return response.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      useAppStore.setState({ isLoading: false });
    }
  }

  async studentRegister(data: StudentRegisterData) {
    try {
      useAppStore.setState({ isLoading: true });
      const response = await api.post(Urls.studentRegister, data);
      if (response.status === 200) {
        // useAppStore.commit({ type: "setToast", payload: "Login Success" });
        return response.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      useAppStore.setState({ isLoading: false });
    }
  }

  async verifyEmail(email: string, code: string) {
    try {
      useAppStore.setState({ isLoading: true });
      const response = await api.post(Urls.verifyEmail, { email, code });
      if (response.status === 200) {
        useTokenStore.setState({ token: response.data.token });
        useTokenStore.setState({ user: response.data.user });
        // useAppStore.commit({ type: "setToast", payload: "Login Success" });
        return response.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      useAppStore.setState({ isLoading: false });
    }
  }

  async forgotPassword(email: string) {
    try {
      useAppStore.setState({ isLoading: true });
      const response = await api.post(Urls.forgotPassword, { email });
      if (response.status === 200) {
        // useAppStore.commit({ type: "setToast", payload: "Login Success" });
        return response.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      useAppStore.setState({ isLoading: false });
    }
  }

  async resetPassword(email: string, code: string, newPassword: string) {
    try {
      useAppStore.setState({ isLoading: true });
      const response = await api.post(Urls.resetPassword, {
        email,
        code,
        newPassword,
      });
      if (response.status === 200) {
        // useAppStore.commit({ type: "setToast", payload: "Login Success" });
        return response.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      useAppStore.setState({ isLoading: false });
    }
  }

  async refreshToken() {
    try {
      useAppStore.setState({ isLoading: true });
      const response = await api.post(Urls.refreshToken);
      if (response.status === 200) {
        // useAppStore.commit({ type: "setToast", payload: "Login Success" });
        return response.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      useAppStore.setState({ isLoading: false });
    }
  }
}

export default User;
