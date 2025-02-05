/* eslint-disable react/prop-types */
import React, { useState } from "react";
//import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems);

  function handleSubmit(item) {
    setItems((x) => x.concat(item));
  }
  function handleDelete(id) {
    setItems((x) => x.filter((x) => x.id != id));
  }

  function handlePackedToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item)
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onSubmit={handleSubmit} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onToggle={handlePackedToggle}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🥥 Far Away 🌴</h1>;
}

function Form(props) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    props.onSubmit({ description, quantity, packed: false, id: Date.now() });
    setDescription("");
    setQuantity(1);
  }

  function handlequantity() {
    console.log(quantity);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😎 trip?</h3>
      <select
        onChange={(e) => {
          setQuantity(e.target.value);
          handlequantity();
        }}
        value={quantity}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ items, onDelete, onToggle }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDelete, onToggle }) {
  function handleClick() {
    onDelete(item.id);
  }

  function handleCheck() {
    onToggle(item.id);
  }

  return (
    <li>
      <input type="checkbox" checked={item.packed} onChange={handleCheck} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={handleClick}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const packed = items.filter((x) => x.packed);
  const packedPer100 = (packed.length / items.length).toPrecision(4) * 100;

  return (
    <footer className="stats">
      <em>
        You have {items.length} items on your list, and you already packed{" "}
        {packed.length} ({packedPer100}%)
      </em>
    </footer>
  );
}
export default App;
