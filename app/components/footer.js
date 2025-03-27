import Link from "next/link"

const Footer = () => {
    const d = new Date();
    return(
        <footer className="footer">
            <div className="footer-links">
                <Link className="footer-link" href="test">About us</Link>
                <Link className="footer-link" href="test">Contact us</Link>
                <Link className="footer-link" href="test">Privacy</Link>
                <Link className="footer-link" href="test">Terms and Conditions</Link>
            </div>
            <div className="footer-copyright">Copyright {d.getFullYear()} SecureHome Limited. All rights reserved </div>
        </footer>
    )
}

export default Footer