import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch("https://www.elprogreso.es/wp-json/wp/v2/posts?_embed&per_page=20")
      .then((res) => res.json())
      .then(setNoticias);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {noticias.map((noticia) => (
        <Link key={noticia.id} to={`/noticia/${noticia.id}`} className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          {noticia._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={noticia._embedded["wp:featuredmedia"][0].source_url}
              alt={noticia.title.rendered}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2" dangerouslySetInnerHTML={{ __html: noticia.title.rendered }} />
            <p className="text-sm text-gray-600">Leer más </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
