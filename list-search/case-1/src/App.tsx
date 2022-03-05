import type {Product} from "./types";

import {useEffect, useMemo, useState} from "react";

import api from "./api";
import {getPrice} from "./utils/getPrice";

enum SortOptions {
  NAME = "name",
  PRICE = "price",
}

const initialQuery = () => localStorage.getItem("query") || "";
const initialSort = () => (localStorage.getItem("sort") as SortOptions) || SortOptions.NAME;

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(initialQuery);
  const [sort, setSort] = useState<SortOptions>(initialSort);

  useEffect(() => {
    api.search(query).then(setProducts);
  }, [query]);

  useEffect(() => {
    window.localStorage.setItem("query", query);
  }, [query]);

  useEffect(() => {
    window.localStorage.setItem("sort", sort);
  }, [sort]);

  const sortProducts = useMemo(() => {
    if (sort === SortOptions.NAME) products.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === SortOptions.PRICE) products.sort((a, b) => a.price - b.price);

    return products;
  }, [sort, products]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <div>
        <input
          name="text"
          placeholder="tv"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value as SortOptions)}>
          <option value={SortOptions.NAME}>📖 Nombre</option>
          <option value={SortOptions.PRICE}>💵 Precio</option>
        </select>
      </div>
      <ul>
        {sortProducts.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>{getPrice(product.price)}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
