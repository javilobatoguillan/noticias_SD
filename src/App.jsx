import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Historico from './components/Historico';
import Noticias from './components/Noticias';
import Resultados from './components/Resultados';
import NoticiaDetalle from './pages/NoticiaDetalle';

function Tabs({ search }) {
  const location = useLocation();
  return (
    <div className='p-4'>
      <div className='flex space-x-2 mb-4'>
        <Link
          to="/historico"
          className={`px-4 py-2 rounded font-semibold ${location.pathname === '/historico' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
        >
          Historico
        </Link>
        <Link
          to="/"
          className={`px-4 py-2 rounded font-semibold ${location.pathname === '/' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
        >
          Noticias
        </Link>
        <Link
          to="/resultados"
          className={`px-4 py-2 rounded font-semibold ${location.pathname === '/resultados' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
        >
          Resultados
        </Link>
      </div>

      <div className='bg-white rounded p-4 shadow'>
        <Routes>
          <Route path="/" element={<Noticias search={search} />} />
          <Route path="/historico" element={<Historico search={search} />} />
          <Route path="/resultados" element={<Resultados search={search} />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState('');

  return (
    <Router>
      <div className='min-h-screen bg-primaryLight text-gray-900'>
        <Header onSearch={setSearch} />
        <Tabs search={search} />
        <Routes>
          <Route path="/noticia/:id" element={<NoticiaDetalle />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
