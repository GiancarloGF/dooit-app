import React from "react";

import { useStorageState } from "@/hooks/useStorageState";

const AuthContext = React.createContext<{
  signIn: (token: string, userId: string) => void;
  signOut: () => void;
  token?: string | null;
  userId?: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  token: null,
  userId: null,
  isAuthenticated: false,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[tokenLoading, token], setToken] = useStorageState("token");
  const [[userIdLoading, userId], setUserId] = useStorageState("userId");

  return (
    <AuthContext.Provider
      value={{
        signIn: (token, userId) => {
          // Perform sign-in logic here
          setToken(token);
          setUserId(userId);
        },
        signOut: () => {
          setToken(null);
          setUserId(null);
        },
        token,
        userId,
        isAuthenticated: !!token && !!userId,
        isLoading: tokenLoading || userIdLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
