'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"
import HomeSearch from "@/public/home-search.svg"
import { searchProperty } from "@/lib/services"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SearchHome = () => {
    const [data, setData] =  useState<any>(null)
    const router = useRouter()
    const handleSearch = async (search:string) => {
        if(search != ""){
        if(search.length >= 2){ 
        searchProperty(search).then(d => setData(d))
        console.log(data)
        }
        }else{
            setData(null)
        }
    }

    return(
        <div className="max-w-xl mx-auto mb-12 relative">
                    <div className="relative">
                      <Input type="text" placeholder="Search" className="w-full pr-10" onChange={(e)=>handleSearch(e.target.value)}/>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        
                        <Button
                          asChild
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 bg-blue-700"
                        >
                          <Link href="/listings">
                          <Search className="h-4 w-4 text-white" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="search-results">
                        {
                            data && data.map((item:any,i:number)=>{
                                return <div className="search-result" onClick={()=>router.push(`/property/${item.property_id}`)} key={i}><Image src={HomeSearch} alt="" />{item.address}</div>
                            })
                        }
                    </div>
                  </div>
    )
}

export default SearchHome