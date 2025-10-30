import * as jwt_decode from "jwt-decode";
import useTokenStore from "@/store/user";
import { useEffect, useState } from "react";

interface ITokenPayload {
  sub: string; // email
  userId: string;
  role: string;
  exp: number;
  iss: string;
  aud: string;
}

function useAuth() {
  const { token } = useTokenStore();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (token) {
      console.log("Token:", token);
      try {
        const decoded = (jwt_decode as any).default(token);
        console.log("Decoded Token:", decoded);
        setUser({
          email: decoded.sub,
          userId: decoded.userId,
          role:
            decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
            decoded.role,
        });
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [token]);

  return { token, user };
}

export default useAuth;
