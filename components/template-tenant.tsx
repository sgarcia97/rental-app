import Footer from "./footer"
import Header from "./header"
import Navigation from "./tenant-navigation"

type TemplateTenantType = {
    children:any;
}
const TemplateTenant = ({children}:TemplateTenantType) => {
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

export default TemplateTenant