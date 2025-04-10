'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createContext, useContext, useState } from 'react'
import { createClient } from '@/utils/supabase/server';


const AuthContext = createContext<any>('');

type AuthType = {
    children:any;
}

export const AuthContextProvider = async ({children}:AuthType) => {
    const [user, setUser] = useState<any>(null)

    const supabase = await createClient()
   
    // Sign up user for an account
    const signUp = async (formData: FormData) => {
      
        const data = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        }
        try{
        const { error } = await supabase.auth.signUp(data)
        if (error) {
          redirect('/error')
        }
        revalidatePath('/', 'layout')
        redirect('/')
      }catch(error){
        console.log('Error with sign up - ', error)
      }
    }

    // Sign in user to account
    const login = async (formData: FormData) => {
     
        const data = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        }
        try{
        const { error } = await supabase.auth.signInWithPassword(data)
        if (error) {
          redirect('/error')
        }
        revalidatePath('/', 'layout')
        redirect('/')
      }catch(error){
        console.log('Error with sign in - ', error)
      }
      }

    return (
        <AuthContext.Provider value={{signUp, login}}>
        {children}
        </AuthContext.Provider>
    )
}



export const auth = useContext(AuthContext)

