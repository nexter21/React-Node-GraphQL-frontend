import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { EDIT_ITEM_MUTATION, DELETE_ITEM_MUTATION } from "../GraphQL/Mutations";
import { LOAD_ITEM } from "../GraphQL/Queries";

// If we have a name conflict like "error", don't destruct the object and the problem will be solved
// Or rename as {error: deleteError}
const Items = ({ items, refetch }) => {
  const [updatePost, { errors }] = useMutation(EDIT_ITEM_MUTATION);
  const [deletePost, { error: deleteError }] =
    useMutation(DELETE_ITEM_MUTATION);
  const [postId, setPostId] = useState("");
  const [getPosta, { loading, error, data }] = useLazyQuery(LOAD_ITEM, {
    skip: true,
    variables: { id: postId },
  });
  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");

  useEffect(() => {
    postId !== "" && getPosta();
  }, [postId]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const editItem = (id, data) => {
    const editArea = document.getElementById("editBox");
    setEditText(data);
    setEditId(id);
    editArea.setAttribute("style", "display: block");
  };

  const editItemData = async (e) => {
    e.preventDefault();
    console.log(editId, editText);

    await updatePost({
      variables: {
        id: editId,
        newText: editText,
      },
    });

    refetch();

    const editArea = document.getElementById("editBox");
    editArea.removeAttribute("style");
    setEditText("");
  };

  const deleteItem = async (id) => {
    await deletePost({
      variables: {
        id,
      },
    });

    refetch();
  };

  return (
    <div className="listArea">
      <h1>{data && data.getPost.text}</h1>
      <div className="editBox" id="editBox">
        <i className="fa fa-times" aria-hidden="true"></i>
        <form onSubmit={editItemData}>
          <input
            type="text"
            placeholder="new item content"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            id="editInput"
          />
          <button id="editBtn">Submit</button>
        </form>
      </div>
      <ul className="lists">
        {items.map(({ id, text }) => {
          return (
            <li className="lists__item" key={id}>
              <div onClick={() => setPostId(id)}>{text}</div>
              <div className="buttons">
                <i
                  className="fa fa-pencil"
                  aria-hidden="true"
                  id="edit"
                  onClick={() => editItem(id, text)}
                ></i>
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  onClick={() => deleteItem(id)}
                ></i>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Items;
