import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Historico from './components/Historico';
import Noticias from './components/Noticias';
import Resultados from './components/Resultados';

export default function App() {
  const [tab, setTab] = useState('Noticias');
  const [search, setSearch] = useState('');

  return (
    <div className='min-h-screen bg-primaryLight text-gray-900'>
      <Header onSearch={setSearch} />

      <div className='p-4'>
        <div className='flex space-x-2 mb-4'>
          {['Historico', 'Noticias', 'Resultados'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                tab === t
                  ? 'px-4 py-2 rounded font-semibold bg-primary text-white'
                  : 'px-4 py-2 rounded font-semibold bg-white text-primary'
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className='bg-white rounded p-4 shadow'>
          {tab === 'Historico' && <Historico search={search} />}
          {tab === 'Noticias' && <Noticias search={search} />}
          {tab === 'Resultados' && <Resultados search={search} />}
        </div>
      </div>

      <Footer />
    </div>
  );
}
