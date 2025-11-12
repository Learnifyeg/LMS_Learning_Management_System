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
  appStore = useAppStore.getState();
  tokenStore = useTokenStore.getState();

  async login(data: LoginData) {
    try {
      this.appStore.setIsLoading(true);

      const response = await api.post(Urls.login, data);
      if (response.status === 200) {
        this.tokenStore.setToken(response.data.token);
        this.tokenStore.setUser(response.data.user);
        // this.appStore.setToast("Login Success");
        return response.data;
      }
    } catch (err: any) {
      this.appStore.setError(err.message || "Login failed");
      // this.appStore.setToast("Login failed");
      throw err;
    } finally {
      this.appStore.setIsLoading(false);
    }
  }

  async logout() {
    try {
      this.appStore.setIsLoading(true);
      this.tokenStore.setToken(null);
      this.tokenStore.setUser(undefined);
      // this.appStore.setToast("Logout Success");
    } catch (err: any) {
      this.appStore.setError(err.message || "Logout failed");
    } finally {
      this.appStore.setIsLoading(false);
    }
  }

  async instructorRegister(data: InstructorRegisterData) {
    try {
      this.appStore.setIsLoading(true);
      const response = await api.post(Urls.instrctorRegister, data);
      if (response.status === 200) {
        // this.appStore.setToast("Instructor Registered Successfully");
        return response.data;
      }
    } catch (err: any) {
      this.appStore.setError(err.message || "Instructor registration failed");
    } finally {
      this.appStore.setIsLoading(false);
    }
  }

  async studentRegister(data: StudentRegisterData) {
    try {
      this.appStore.setIsLoading(true);
      const response = await api.post(Urls.studentRegister, data);
      if (response.status === 200) {
        // this.appStore.setToast("Student Registered Successfully");
        return response.data;
      }
    } catch (err: any) {
      this.appStore.setError(err.message || "Student registration failed");
    } finally {
      this.appStore.setIsLoading(false);
    }
  }

  async verifyEmail(email: string, code: string) {
    try {
      this.appStore.setIsLoading(true);
      const response = await api.post(Urls.verifyEmail, { email, code });
      if (response.status === 200) {
        this.tokenStore.setToken(response.data.token);
        this.tokenStore.setUser(response.data.user);
        // this.appStore.setToast("Email Verified Successfully");
        return response.data;
      }
    } catch (err: any) {
      this.appStore.setError(err.message || "Email verification failed");
    } finally {
      this.appStore.setIsLoading(false);
    }
  }

  async forgotPassword(email: string) {
    try {
      this.appStore.setIsLoading(true);
      const response = await api.post(Urls.forgotPassword, { email });
      if (response.status === 200) {
        // this.appStore.setToast("Password reset link sent");
        return response.data;
      }
    } catch (err: any) {
      this.appStore.setError(err.message || "Forgot password failed");
    } finally {
      this.appStore.setIsLoading(false);
    }
  }

  async resetPassword(email: string, code: string, newPassword: string) {
    try {
      this.appStore.setIsLoading(true);
      const response = await api.post(Urls.resetPassword, {
        email,
        code,
        newPassword,
      });
      if (response.status === 200) {
        // this.appStore.setToast("Password Reset Successfully");
        return response.data;
      }
    } catch (err: any) {
      this.appStore.setError(err.message || "Reset password failed");
    } finally {
      this.appStore.setIsLoading(false);
    }
  }

  async refreshToken() {
    try {
      this.appStore.setIsLoading(true);
      const response = await api.post(Urls.refreshToken);
      if (response.status === 200) {
        this.tokenStore.setToken(response.data.token);
        this.tokenStore.setUser(response.data.user);
        // this.appStore.setToast("Token refreshed");
        return response.data;
      }
    } catch (err: any) {
      this.appStore.setError(err.message || "Token refresh failed");
    } finally {
      this.appStore.setIsLoading(false);
    }
  }
}

export default User;
