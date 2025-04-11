"use client";
import { redirect } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
//import { createClient } from '@/utils/supabase/server';
import { supabase } from "./client";
import { Session } from "@supabase/supabase-js";
import { ReactNode } from "react";

interface AuthType {
  // children:any;
  session: Session | null;
  isLoading: boolean;
  signUp: (data: FormData) => Promise<void>;
  login: (data: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthType | undefined>(undefined);

interface AuthTypeProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthTypeProps) => {
  //const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const initializeSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(session);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error retrieving session:", error);
        setIsLoading(false);
      }
    };

    initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, "Session present?", !!session);
      if (isMounted) setSession(session);
    });

    return () => {
      isMounted = false;
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Sign up user for an account
  const signUp = async (formData: FormData): Promise<void> => {
    //const supabase = await createClient()
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      const { error } = await supabase.auth.signUp(data);
      if (error) {
        redirect("/error");
      }
      //revalidatePath('/', 'layout')
      redirect("/");
    } catch (error) {
      console.log("Error with sign up - ", error);
    }
  };

  // Sign in user to account
  const login = async (formData: FormData): Promise<void> => {
    //const supabase = await createClient()
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      const { error } = await supabase.auth.signInWithPassword(data);
      if (error) {
        redirect("/error");
      }
      //revalidatePath('/', 'layout')
      redirect("/");
    } catch (error) {
      console.log("Error with sign in - ", error);
    }
  };

  const value: AuthType = {
    session,
    isLoading,
    signUp,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
