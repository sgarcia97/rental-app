import Image from "next/image"
import Shareicon from '@/public/share.svg'


type ShareType = {
    data:any;
}

const Share = ({data}:ShareType) => {
    const handleShare = async () => {
        const da = {
          title: data.description,
          description: data.address,
          url: 'https://securehome.com'
        }
        await navigator.share(da)
      }

    return(
        <button onClick={handleShare} className="fav-button"><Image alt="" src={Shareicon} className="fav-img"/></button>
    )
}

export default Share