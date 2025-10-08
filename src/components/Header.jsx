import { useState } from 'react';

export default function Header({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <header className='bg-primary text-white p-4 flex flex-col md:flex-row items-center justify-between gap-4'>
      <h1 className='text-2xl font-bold'>Noticias SD Compostela</h1>
      <input
        type='text'
        value={query}
        onChange={handleChange}
        placeholder='Buscar noticias...'
        className='px-4 py-2 rounded text-gray-900 w-full md:w-1/3'
      />
    </header>
  );
}
