import {Routes, Route} from 'react-router';
import {HomePage} from "./pages/HomePage";
import './App.css';

function App() {
    return(
        <div>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="checkout" element={<div>checkout test page</div>} />
            </Routes>
        </div>
    );
}

export default App;