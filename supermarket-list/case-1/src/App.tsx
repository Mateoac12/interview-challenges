import type {Item} from "./types";

import {useEffect, useState} from "react";

import styles from "./App.module.scss";
import api from "./api";

/* 
## Nivel 2
- [] Nuestro input no se limpia al agregar elementos nuevos
*/
interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

const initialInputState = "";

function App() {
  const [input, setInput] = useState<string>(initialInputState);
  const [items, setItems] = useState<Item[]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  function handleToggle(id: Item["id"]) {
    setItems((items) =>
      items.map((item) => (item.id === id ? {...item, completed: !item.completed} : item)),
    );
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    // Should implement
    event.preventDefault();
    setInput(initialInputState);

    const newProd = {
      id: Math.max(...items.map((item) => item.id)) + 1,
      text: input,
      completed: false,
    };

    setItems((lastProds) => [...lastProds, newProd]);
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api.list().then((products) => {
      setItems(products);
      setLoader(false);
    });
  }, []);

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form className="center" onSubmit={handleAdd}>
        <input
          name="text"
          placeholder="Add a product! 💫"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Add</button>
      </form>
      {loader ? (
        <div className="center">
          <div className="loader" />
        </div>
      ) : (
        <ul>
          {items?.map((item) => (
            <li
              key={item.id}
              className={item.completed ? styles.completed : ""}
              onClick={() => handleToggle(item.id)}
            >
              {item.text} <button onClick={() => handleRemove(item.id)}>[X]</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
