import { useEffect, useState } from 'react';

export default function Noticias({ search }) {
  const [noticias, setNoticias] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    fetch('https://laliganoticias.com/wp-json/wp/v2/posts?categories=1&_embed&per_page=10')
      .then(res => res.json())
      .then(data => setNoticias(data));
  }, []);

  const filtered = noticias.filter(n =>
    n.title.rendered.toLowerCase().includes(search.toLowerCase())
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
      <h2 className='text-xl font-bold text-primary mb-2'>Noticias</h2>
      <ul className='space-y-4'>
        {filtered.map(n => {
          const imgUrl = n._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
          const excerpt = n.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 100) + '...';
          return (
            <li key={n.id} className='p-2 border rounded shadow-sm flex flex-col md:flex-row gap-4 cursor-pointer' onClick={() => openModal(n)}>
              {imgUrl && <img src={imgUrl} alt={n.title.rendered} className='w-full md:w-48 h-32 object-cover rounded' />}
              <div>
                <h3 className='font-semibold' dangerouslySetInnerHTML={{__html: n.title.rendered}} />
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
