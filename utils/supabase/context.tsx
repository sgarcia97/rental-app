'use client'
import { redirect } from 'next/navigation'
import { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/server';


const AuthContext = createContext<any>('');

type AuthType = {
    children:any;
}

export const AuthContextProvider = ({children}:AuthType) => {
    const [user, setUser] = useState<any>(null)

    useEffect(()=>{
      const getUser = async () => {
        const supabase = await createClient()
        try{
        const { data, error } = await supabase.auth.getUser()
        if(error){
          console.log(error)
        }else{
          setUser(data)
        }
        }catch(error){
          console.log(error)
        }
      }
      getUser()
     
    },[user])
   
    // Sign up user for an account
    const signUp = async (formData: FormData) => {
        const supabase = await createClient()
        const data = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        }
        try{
        const { error } = await supabase.auth.signUp(data)
        if (error) {
          redirect('/error')
        }
        //revalidatePath('/', 'layout')
        redirect('/')
      }catch(error){
        console.log('Error with sign up - ', error)
      }
    }

    // Sign in user to account
    const login = async (formData: FormData) => {
        const supabase = await createClient()
        const data = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        }
        try{
        const { error } = await supabase.auth.signInWithPassword(data)
        if (error) {
          redirect('/error')
        }
        //revalidatePath('/', 'layout')
        redirect('/')
      }catch(error){
        console.log('Error with sign in - ', error)
      }
      }

    return (
        <AuthContext.Provider value={{user, signUp, login}}>
        {children}
        </AuthContext.Provider>
    )
}



export const auth = () => { return useContext(AuthContext)}

