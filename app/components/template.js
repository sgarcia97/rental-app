import Header from "./header"
import Footer from "./footer"

const Template = ({children}) => {
    return(
        <>
        <Header/>
        <main className="main">{children}
        </main>
        <Footer/>
        </>
    )
}

export default Template