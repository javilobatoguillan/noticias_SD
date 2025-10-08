import { useEffect, useState } from 'react';

export default function Resultados({ search }) {
  const [resultados, setResultados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    fetch('https://laliganoticias.com/wp-json/wp/v2/posts?categories=12&_embed&per_page=10')
      .then(res => res.json())
      .then(data => setResultados(data));
  }, []);

  const filtered = resultados.filter(r =>
    r.title.rendered.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (post) => {
    setActivePost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setActivePost(null);
    setModalOpen(false);
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold text-primary mb-2'>Resultados</h2>
      <ul className='space-y-4'>
        {filtered.map(r => {
          const imgUrl = r._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
          const excerpt = r.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 100) + '...';
          return (
            <li key={r.id} className='p-2 border rounded shadow-sm flex flex-col md:flex-row gap-4 cursor-pointer' onClick={() => openModal(r)}>
              {imgUrl && <img src={imgUrl} alt={r.title.rendered} className='w-full md:w-48 h-32 object-cover rounded' />}
              <div>
                <h3 className='font-semibold' dangerouslySetInnerHTML={{__html: r.title.rendered}} />
                <p className='text-sm text-gray-700'>{excerpt}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {modalOpen && activePost && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded p-4 max-w-2xl w-full relative'>
            <button
  onClick={(e) => { e.stopPropagation(); closeModal(); }}
  className='absolute top-2 right-2 text-gray-600 font-bold text-xl'
>
  ×
</button>
            <h3 className='text-xl font-bold mb-2' dangerouslySetInnerHTML={{__html: activePost.title.rendered}} />
            <div dangerouslySetInnerHTML={{__html: activePost.content.rendered}} className='text-gray-700' />
          </div>
        </div>
      )}
    </div>
  );
}
