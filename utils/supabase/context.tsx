"use client";
import { redirect, useRouter } from "next/navigation";
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
  login: (data: FormData, route: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthType | undefined>(undefined);

interface AuthTypeProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthTypeProps) => {
  //const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

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
          
          console.log('Test',sessionStorage.sess)
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
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      options: {
        data: {
          fullName: formData.get("fullName") as string,
        },
      },
    };
    try {
      const { error } = await supabase.auth.signUp(data);
      if (error) {
       alert('An error occured'+error)
      }
      router.replace('/signup/confirmation')
    } catch (error) {
      console.log("Error with sign up - ", error);
    }
  };

  // Sign in user to account
  const login = async (formData: FormData, route:string = '/manager'): Promise<void> => {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      const { error } = await supabase.auth.signInWithPassword(data);
      if (error) {

        alert('Error loggin you in. Please try again')
      }else{
        if(!sessionStorage.sess) sessionStorage.sess = 'yes'
        router.replace(route)
      }
      
    } catch (error) {
      console.log("Error with sign in - ", error);
    }
  };

  const logOut = async () => {
   
    const { error } = await supabase.auth.signOut()
    if(error){
      console.log(error.message)
    }else{
      sessionStorage.clear()
      router.replace('/')
      alert('You are logged out')
    }
  };

  const value: AuthType = {
    session,
    isLoading,
    signUp,
    login,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
