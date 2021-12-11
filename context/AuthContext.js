import supabase from "@/services/supabase/init";
import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext({ user: null, session: null });

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const session = supabase().auth.session();

    setSession(session);
    setUser(session?.user ?? null);

    const { data: authListener } = supabase().auth.onAuthStateChange(
      async (event, session) => {
        console.log(event, session)
        setSession(session);
        setUser(session?.user ?? null);

        await axios.post("/api/auth", { event, session });
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, session }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;
