import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ProyectosPage } from './pages/ProyectosPage';
import { SobreMiPage } from './pages/SobreMiPage';
import { ContactoPage } from './pages/ContactoPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen surface-page text-ink grain">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/proyectos" element={<ProyectosPage />} />
            <Route path="/sobre-mi" element={<SobreMiPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;