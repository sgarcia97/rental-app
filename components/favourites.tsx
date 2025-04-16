import { useState, useEffect } from 'react'
import Heart from '@/public/heart.svg'
import HeartFill from '@/public/heart-filled.svg'
import Image from 'next/image'
import { useAuth } from '@/utils/supabase/context'
import { getFavourite, addFavourite, removeFavourite } from '@/lib/services'

type FavouritesType = {
    id:string;
}

const Favourites = ({id}:FavouritesType) => {
    const { session } = useAuth()
    const [fav, setFav] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)
    useEffect(()=>{
        session && getFavourite(id,session.user.id).then(d => setData(d) )
        data && console.log('Faves',data)
    },[])

    const handleFavourites = async () => {
        if(session){  
            //setFav(!fav)
        if(data && data.property_id == id){
            await removeFavourite(id,session.user.id)
        }else{
            await addFavourite(id,session.user.id)
        }
            getFavourite(id,session.user.id).then(d => setData(d))
        
        }else{
            alert('You need to be signed in to add favourites')
        }
    }

    return(

        <button onClick={data && data.property_id == id ? ()=>{setFav(false); handleFavourites();} : handleFavourites} className="fav-button"><Image alt="" src={fav || data && data.property_id == id ? HeartFill : Heart} className="fav-img"/></button>
    )
}

export default Favourites;