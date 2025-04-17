import { useState, useEffect } from 'react'
import { searchProperty, caDollar } from '@/lib/services'
import { useRouter } from 'next/navigation'

const Search = () => {
    const router = useRouter()
    const [search, setSearch] = useState<any>(null)
    const handleSearch = async (e:any) => {
        if(e.target.value != ''){
            if(e.target.value.length >= 2){
            await searchProperty(e.target.value).then(d => setSearch(d))
            }
        }else{
            setSearch(null)
        }
        
    }

    return(
        <div className="header-search-wrapper">
            <input type="search" placeholder="Search for properties" onChange={handleSearch}/>
            <div className="header-search-results">{search && search.map((s:any)=>(
                <div key={s.property_id} onClick={()=>{router.push(`/property/${s.property_id}`)}} className="header-search-result">{s.description}<div>{s.address}, {s.city} - {caDollar.format(s.rent)}</div></div>
            ))}</div>
        </div>
    )
}

export default Search