import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Noticias = ({ search }) => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch("https://laliganoticias.com/wp-json/wp/v2/posts?categories=1&_embed")
      .then((res) => res.json())
      .then(setNoticias);
  }, []);

  const filteredNoticias = noticias.filter((n) =>
    n.title.rendered.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredNoticias.map((n) => (
        <Link
          key={n.id}
          to={`/noticia/${n.id}`}
          className="block bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
        >
          {n._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={n._embedded["wp:featuredmedia"][0].source_url}
              alt={n.title.rendered}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3
              className="text-lg font-semibold mb-2 text-gray-800"
              dangerouslySetInnerHTML={{ __html: n.title.rendered }}
            />
            <p
              className="text-gray-600"
              dangerouslySetInnerHTML={{
                __html: n.excerpt.rendered.substring(0, 100) + "...",
              }}
            />
          </div>
        </Link>
      ))}

      {filteredNoticias.length === 0 && (
        <p className="text-center text-gray-500 w-full col-span-full">
          No hay resultados para “{search}”
        </p>
      )}
    </div>
  );
};

export default Noticias;

