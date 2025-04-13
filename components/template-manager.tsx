import Footer from "./footer"
import Header from "./header"
import Navigation from "./navigation"

type TemplateManagerType = {
    children:any;
}
const TemplateManager = ({children}:TemplateManagerType) => {
    return(
        <div className="flex min-h-screen flex-col">
            <Header showUsername={true} />
            <main className="flex-1 bg-gray-50">
                <div className="container mx-auto px-4 py-6">
                    <Navigation/>
                    {children}
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default TemplateManager