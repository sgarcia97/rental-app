import Header from "./header"
import Footer from "./footer"

type TemplateType = {
    children:any;
}
const Template = ({children}:TemplateType) => {
    return(
     
        <div className="flex min-h-screen flex-col">
            <Header/>
            <main className="flex-1">{children}</main>
            <Footer/> 
        </div>
     
    )
}

export default Template