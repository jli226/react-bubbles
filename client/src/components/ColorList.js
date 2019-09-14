import React, { useState } from "react";
import { axiosWithAuth } from "./../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getData }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: { hex: "" }
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(result => {
        console.log("✅ ColorList axiosWithAuth edit color: ", result);
        getData();
      })
      .catch(error =>
        console.log("❌ ColorList axiosWithAuth edit color: ", error)
      );
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
      .then(result => {
        console.log("✅ ColorList axiosWithAuth delete color: ", result);
        getData();
      })
      .catch(error =>
        console.log("❌ ColorList axiosWithAuth delete color: ", error)
      );
  };

  const addColorChangeHandler = event => {
    setNewColor({
      ...newColor,
      color: event.target.value
    });
  };

  const addColorHexHandler = event => {
    setNewColor({
      ...newColor,
      code: {
        hex: event.target.value
      }
    });
  };

  const addColor = event => {
    event.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, newColor)
      .then(result => {
        console.log("✅ ColorList axiosWithAuth add color: ", result);
        getData();
        setNewColor({
          color: "",
          code: { hex: "" }
        });
      })
      .catch(error =>
        console.log("❌ ColorList axiosWithAuth add color: ", error)
      );
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            name="color"
            value={newColor.color}
            onChange={addColorChangeHandler}
          />
        </label>
        <label>
          hex code:
          <input
            name="hex"
            value={newColor.code.hex}
            onChange={addColorHexHandler}
          />
        </label>
        <div className="button-row">
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
