import { Header } from "../components/Header";
import './UrlNotFoundPage.css';


export function UrlNotFoundPage() {
    return (
        <>
            <Header />
            <div className="error-message-container">
                <p className="error-message ">"Page not found"</p>
            </div>
        </>
    );
}