import type {Product} from "./types";

import React, {useEffect, useState} from "react";

import api from "./api";
import {useDebounce} from "./hooks/useDebounce";

/* ## Nivel 3
- [ ] Debemos poder agregar y quitar productos a favoritos clickeandolos, los productos en favoritos deben tener la clase "fav". */

const Recommended = React.memo(() => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.search().then(setProducts);
  }, []);

  return (
    <main>
      <h1>Productos recomendados</h1>
      <ul>
        {[...products]
          .sort(() => (Math.random() > 0.5 ? 1 : -1))
          .slice(0, 2)
          .map((product) => (
            <li key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
            </li>
          ))}
      </ul>
    </main>
  );
});

const initialProducts = () => JSON.parse(localStorage.getItem("products") as string) || [];

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState<string>("");
  const debounceQuery = useDebounce(query);

  useEffect(() => {
    api.search(debounceQuery).then((products) => {
      if (!localStorage.getItem("products")) {
        const productsWithFavs = products.map((prod) => ({
          ...prod,
          fav: false,
        }));

        return setProducts(productsWithFavs);
      }
    });
  }, [debounceQuery]);

  useEffect(() => {
    window.localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChangeFav = (id: number) => {
    const productsWithFav = products.map((prod) => ({
      ...prod,
      fav: prod.id === id ? !prod.fav : prod.fav,
    }));

    setProducts(productsWithFav);
  };

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className={`${product.fav ? "fav" : ""}`}
            style={{cursor: "pointer"}}
            onClick={() => handleChangeFav(product.id)}
          >
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>$ {product.price}</span>
          </li>
        ))}
      </ul>
      <hr />
      <Recommended />
    </main>
  );
}

export default App;
