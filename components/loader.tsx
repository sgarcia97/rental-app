import Logo from '@/public/logo.svg'
import Image from 'next/image'
import Spin from '@/public/spinner.svg'

const Loader = () => {
    return(
        <div className="loader"><Image src={Logo} alt="" width={50} height={50}/></div>
    )
}

export const Spinner = () => {
    return(
        <div className="loader-inset"><Image src={Spin} alt='' width={30} height={30}/></div>
    )
}

export default Loader