import { useState, useEffect } from 'react'
import Heart from '@/public/heart.svg'
import HeartFill from '@/public/heart-filled.svg'
import Image from 'next/image'
import { useAuth } from '@/utils/supabase/context'
import { getFavourite, addFavourite } from '@/lib/services'

type FavouritesType = {
    id:string;
}

const Favourites = ({id}:FavouritesType) => {
    const { session } = useAuth()
    const [fav, setFav] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)
    useEffect(()=>{
        session && getFavourite(session.user.id).then(d => setData(d))
    },[])

    const handleFavourites = async () => {
        session ? setFav(!fav) : alert('You need to be signed in to add favourites')
        session && await addFavourite(id,session.user.id)
    }

    return(
        <button onClick={handleFavourites} className="fav-button"><Image alt="" src={fav ? HeartFill : Heart} className="fav-img"/></button>
    )
}

export default Favourites;