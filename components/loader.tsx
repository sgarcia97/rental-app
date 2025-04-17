import Logo from '@/public/logo.svg'
import Image from 'next/image'
import Spin from '@/public/spinner.svg'
import Placeholder from '@/public/property1.png'

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

export const SlideLoader = () => {
    return (
        <div className="slide-loader-wrapper">
        <div className="rounded-lg overflow-hidden shadow-md home-list w-[300px]" >
                <Image
                  src={Placeholder}
                  alt="House"
                  className="w-full h-[180px] object-cover"
                />
                <div className="home-list-content">
                    <div>
                        <div className="home-list-subtitle"></div>
                        <div className="home-list-title"></div>
                    </div>
                    <div>
                        <div className="home-list-desc"></div>
                        <div className="home-list-desc"></div>
                        <div className="list-button-wrapper">
                      </div>
                    </div>
                </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md home-list w-[300px]" >
            <Image
              src={Placeholder}
              alt="House"
              className="w-full h-[180px] object-cover"
            />
            <div className="home-list-content">
                <div>
                    <div className="home-list-subtitle"></div>
                    <div className="home-list-title"></div>
                </div>
                <div>
                    <div className="home-list-desc"></div>
                    <div className="home-list-desc"></div>
                    <div className="list-button-wrapper">
                  </div>
                </div>
            </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-md home-list w-[300px]" >
        <Image
          src={Placeholder}
          alt="House"
          className="w-full h-[180px] object-cover"
        />
        <div className="home-list-content">
            <div>
                <div className="home-list-subtitle"></div>
                <div className="home-list-title"></div>
            </div>
            <div>
                <div className="home-list-desc"></div>
                <div className="home-list-desc"></div>
                <div className="list-button-wrapper">
              </div>
            </div>
        </div>
    </div>
    <div className="rounded-lg overflow-hidden shadow-md home-list w-[300px]" >
    <Image
      src={Placeholder}
      alt="House"
      className="w-full h-[180px] object-cover"
    />
    <div className="home-list-content">
        <div>
            <div className="home-list-subtitle"></div>
            <div className="home-list-title"></div>
        </div>
        <div>
            <div className="home-list-desc"></div>
            <div className="home-list-desc"></div>
            <div className="list-button-wrapper">
          </div>
        </div>
    </div>
</div>
      </div>      
    )
}

export default Loader