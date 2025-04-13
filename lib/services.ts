import { supabase } from "../utils/supabase/client";


// PROPERTIES
export const getProperties = async () => {
    try{
        const { data: properties_test, error } = await supabase
        .from('properties_test')
        .select('*')
        if(error){
            console.log(error)
            return
        }
        console.log(properties_test)
        return properties_test
    
    }catch(error){
        console.log(error)
    }
        
}

export const addProperty = async (fd: FormData) => {
    
    const { data, error } = await supabase
    .from('properties_test')
    .insert([
    { address: fd.get('address'), description: fd.get('description') },
    ])
    .select()

    if(error){
        console.log(error)
        alert('Error adding listing')
    }
    return data
        
}

export const updateProperty = async (fd: FormData) => {
    
    const { data, error } = await supabase
    .from('properties_test')
    .update({ other_column: 'otherValue' })
    .eq('id', fd.get('id'))
    .select()

    if(error){
        console.log(error)
        alert('Error adding listing')
    }
    return data
        
        
}


// CONTRACTS
export const getContracts = async () => {
    try{
        const { data: properties_test, error } = await supabase
        .from('properties_test')
        .select('*')
        if(error){
            console.log(error)
            return
        }
        console.log(properties_test)
        return properties_test
    
    }catch(error){
        console.log(error)
    }
        
}

export const addContract = async (fd: FormData) => {
    
    const { data, error } = await supabase
    .from('properties_test')
    .insert([
    { address: fd.get('address'), description: fd.get('description') },
    ])
    .select()

    if(error){
        console.log(error)
        alert('Error adding listing')
    }
    return data
        
}

