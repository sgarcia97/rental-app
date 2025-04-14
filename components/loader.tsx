import Logo from '@/public/logo.svg'
import Image from 'next/image'

const Loader = () => {
    return(
        <div className="loader"><Image src={Logo} alt="" width={50} height={50}/></div>
    )
}

export default Loader