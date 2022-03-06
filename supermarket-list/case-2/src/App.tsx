import type {Item} from "./types";

import {useEffect, useState} from "react";

import styles from "./App.module.scss";
import api from "./api";

/* 
## Nivel 1
- [] Podemos agregar elementos vacíos
*/
interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

const initialInputState = "";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState<string>(initialInputState);
  const [isLoading, toggleLoading] = useState<boolean>(true);

  function handleToggle(id: Item["id"]) {
    // Should implement
    const newItems = items.map((item) => ({
      ...item,
      completed: item.id === id ? !item.completed : item.completed,
    }));

    setItems(newItems);
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault();

    if (input.trim() === "") return;

    setItems((items) =>
      items.concat({
        id: +new Date(),
        completed: false,
        text: input,
      }),
    );

    event.target.text.value = "";
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    const time = setTimeout(() => {
      api
        .list()
        .then(setItems)
        .finally(() => toggleLoading(false));
    }, 1000);

    return () => clearTimeout(time);
  }, []);

  if (isLoading) return "Loading...";

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input name="text" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button>Add</button>
      </form>
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
    </main>
  );
}

export default App;
