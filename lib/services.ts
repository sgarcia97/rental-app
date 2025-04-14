import { supabase } from "../utils/supabase/client";


// PROPERTIES
export const getProperties = async () => {
    try{
        const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        if(error){
            console.log(error)
            return
        }
        return properties
    
    }catch(error){
        console.log(error)
    }
        
}

export const getProperty = async (id:string) => {
    try{
        const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .eq('property_id',id)
        if(error){
            console.log(error)
            return
        }
        return properties
    
    }catch(error){
        console.log(error)
    }
        
}

export const searchProperty = async (search:string) => {
    try{
        const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .or(`description.ilike.%${search}%, address.ilike.%${search}%`)
        

        if(error){
            console.log(error)
            return
        }
        return properties
    
    }catch(error){
        console.log(error)
    }
        
}

export const addProperty = async (fd: any) => {
    
    const { data, error } = await supabase
    .from('properties')
    .insert([fd])
    .select()

    if(error){
        console.log(error)
        alert('Error adding listing')
    }else{
        alert('Added'+data[0].address)
        console.log(data)
        return data
    }
    
        
}

export const updateProperty = async (updates:any,id:string) => {
   
    const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('property_id', id)
    .select()
    if(error){
        console.log(error.message)
        alert('Error updating listing')
    }else{
        alert('Successfully updated')
    }
    
        
        
}


// CONTRACTS
export const getContracts = async () => {
    try{
        const { data: rentals, error } = await supabase
        .from('rentals')
        .select('*')
        if(error){
            console.log(error)
            return
        }
        return rentals
    
    }catch(error){
        console.log(error)
    }
        
}

export const getContract = async (id:string) => {
    try{
        const { data: rentals, error } = await supabase
        .from('rentals')
        .select('*')
        .eq('property_id',id)
        if(error){
            console.log(error)
            return
        }
        return rentals
    
    }catch(error){
        console.log(error)
    }
        
}

export const updateContract = async (updates:any,id:string) => {
   
    const { data, error } = await supabase
    .from('rentals')
    .update(updates)
    .eq('property_id', id)
    if(error){
        console.log(error.message)
        alert('Error updating contract')
    }else{
        alert('Successfully updated contract')
    }
    
        
        
}

export const getExpiredContracts = async (id='') => {
    try{
        const { data: rentals, error } = await supabase
        .from('rentals')
        .select('*')
        .eq('status','Expired')
        if(error){
            console.log(error)
            return
        }
        return rentals
    
    }catch(error){
        console.log(error)
    }
        
}

export const addContract = async (fd:any) => {
    
    const { data, error } = await supabase
    .from('rentals')
    .insert([fd])
    .select()

    if(error){
        console.log(error)
        alert('Error adding listing'+error.message)
    }else{
        alert('Contract added for '+data)
    }
    
        
}


// DISPLUTES

export const getDisputes = async () => {
    try{
        const { data: disputes, error } = await supabase
        .from('disputes')
        .select('*')
        if(error){
            console.log(error)
            return
        }
        return disputes
    
    }catch(error){
        console.log(error)
    }
        
}

export const addDispute = async (fd: FormData) => {
    
    const { data, error } = await supabase
    .from('disputes')
    .insert([
     { 
        property_id: fd.get('property'), 
        raised_by: fd.get('raised_by'),
        description: fd.get('description'), 
        resolved: false,
        resolution_date: null
     },
    ])
    .select()

    if(error){
        console.log(error)
        alert('Error adding listing: '+error.message)
    }else{
        return data
    }
    
        
}


export const caDollar = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
});