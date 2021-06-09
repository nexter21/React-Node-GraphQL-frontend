import React, { useState, useEffect } from "react";
import Items from "./Items";
import { LOAD_ITEMS } from "../GraphQL/Queries";
import { CREATE_ITEM_MUTATION } from "../GraphQL/Mutations";
import { useMutation, useQuery } from "@apollo/client";

const Navbar = () => {
  const { errors, loading, data, refetch } = useQuery(LOAD_ITEMS);
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [createPost, { error }] = useMutation(CREATE_ITEM_MUTATION);

  useEffect(() => {
    data && setItems(data.getAllPosts);
  }, [data]);

  const addNewItem = (e) => {
    e.preventDefault();

    createPost({
      variables: {
        text,
      },
    });

    setText("");
    refetch();
  };

  return (
    <div className="App">
      <div className="navbar">To-Dos</div>

      <div className="list">
        <form className="list-creator" onSubmit={addNewItem}>
          <input
            type="text"
            placeholder="List heading"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button>Add</button>
        </form>
        <Items items={items} refetch={refetch} />
      </div>
    </div>
  );
};

export default Navbar;
