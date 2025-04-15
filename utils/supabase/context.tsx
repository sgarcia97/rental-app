"use client";
import { redirect, useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
//import { createClient } from '@/utils/supabase/server';
import { supabase } from "./client";
import { Session } from "@supabase/supabase-js";
import { ReactNode } from "react";
import { assignHardhatWallet } from "../walletUtils";
//import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

//const componentClient = createClientComponentClient();

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
<<<<<<< HEAD
=======
      if (!!session) {
        //router.replace('/manager')
      } else {
        //router.replace('/')
      }
>>>>>>> bf89a36 (supabase and context updates)
    });

    return () => {
      isMounted = false;
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Sign up user for an account
  const signUp = async (formData: FormData): Promise<void> => {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const signUpData = {
      email,
      password,
      options: {
        data: {
          fullName,
        },
      },
    };

    try {
      console.log("[signUp] Attempting signup with email:", email);

      const { data: sessionData, error } = await supabase.auth.signUp(
        signUpData
      );

      if (error) {
        console.error("[signUp] Supabase signup error:", error.message);
        alert("An error occurred: " + error.message);
        return;
      }

      console.log(
        "[signUp] Signup successful, waiting for session to establish..."
      );

      // Wait longer and refresh the session
      await new Promise((res) => setTimeout(res, 1500));
      await supabase.auth.refreshSession(); // Force session refresh
      const sessionCheck = await supabase.auth.getSession();
      console.log("Refreshed auth.uid():", sessionCheck.data.session?.user?.id);

      const user = sessionData.user;
      if (!user) {
        console.warn("[signUp] Signup succeeded, but user object is missing.");
        alert("User session missing after signup.");
        return;
      }

      console.log("[signUp] User ID from signup:", user.id);

      // const { data: sessionCheck } = await supabase.auth.getSession();
      // console.log(
      //   "[signUp] Session check - auth.uid():",
      //   sessionCheck?.session?.user?.id
      // );

      console.log("[signUp] Proceeding to update wallet info...");
      await assignHardhatWallet(user.id, fullName, supabase);

      console.log("[signUp] Wallet assignment complete. Redirecting...");
      router.replace("/signup/confirmation");
    } catch (error) {
      console.error("[signUp] Unexpected error:", error);
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
<<<<<<< HEAD

        alert('Error loggin you in. Please try again')
      }else{
        if(!sessionStorage.sess) sessionStorage.sess = 'yes'
        router.replace(route)
=======
        alert("Error loggin you in. Please try again");
      } else {
        router.push("/manager");
>>>>>>> bf89a36 (supabase and context updates)
      }
    } catch (error) {
      console.log("Error with sign in - ", error);
    }
  };

  const logOut = async () => {
<<<<<<< HEAD
   
    const { error } = await supabase.auth.signOut()
    if(error){
      console.log(error.message)
    }else{
      sessionStorage.clear()
      router.replace('/')
      alert('You are logged out')
=======
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
    } else {
      alert("You are logged out");
      router.replace("/login");
>>>>>>> bf89a36 (supabase and context updates)
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
