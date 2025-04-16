'use client'
import {useState, useEffect} from 'react'
import { getFavourites } from '@/lib/services'
import Heart from '@/public/heart-simple.svg'
import Template from '@/components/template'
import { useAuth } from '@/utils/supabase/context'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/loader'
import Delete from '@/public/minus-circle.svg'
import Image from 'next/image'
import { removeFavourite } from '@/lib/services'

const Page = () => {
    const { session } = useAuth()
    const router = useRouter()
    const [data, setData] = useState<any>(null)
    useEffect(()=>{
        refreshList()
       
    })

    const refreshList = async () => {
        session && getFavourites(session.user.id).then(d => setData(d))
    }

    const handleDelete = async (e:any,id:string) => {
        e.stopPropagation()
        session && await removeFavourite(id,session.user.id)
        refreshList()
    }

    return(
        <Template>
            <section className="main-section">
            <div className="section-title">Your Favourites</div>
            { !data ? <Spinner/> : data.length == 0 ? <div>You have not added any favourites as yet</div> : data.map((fav:any)=>{
                return <div key={fav.property_id} onClick={()=>router.push(`/property/${fav.property_id}`)} className="section-list">
                    <div className="section-list-section">
                        <Image alt="" width={20} height={20} src={Heart}/>{fav.description} {fav.address}
                    </div><Image alt="" width={20} height={20} src={Delete} className="delete-img" onClick={(event)=>handleDelete(event,fav.property_id)}/>

                    </div>
            })}
            </section>
        </Template>
    )
}

export default Page