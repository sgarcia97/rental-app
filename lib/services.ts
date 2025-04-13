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

export const addProperty = async (fd: FormData) => {
    
    const { data, error } = await supabase
    .from('properties')
    .insert([
    { address: fd.get('address'), description: fd.get('description') },
    ])
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

export const updateProperty = async (fd: FormData) => {
    
    const { data, error } = await supabase
    .from('properties')
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

export const addContract = async (fd: FormData) => {
    
    const { data, error } = await supabase
    .from('rentals')
    .insert([
    { 
      property_id: fd.get('property_id'),
      rent_amount: fd.get('rent_amount'), 
      deposit_amount: fd.get('deposit'), 
      late_fee: fd.get('late_fee'),
      rent_due_date: fd.get('rent_due_date'),
      rent_interval: fd.get('rent_interval'),
      status: fd.get('status')

    },
    ])
    .select()

    if(error){
        console.log(error)
        alert('Error adding listing'+error.message)
    }else{
        return data
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