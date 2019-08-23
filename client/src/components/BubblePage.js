import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getData = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(result => {
        console.log("✅ BubblePage axiosWithAuth result: ", result);
        setColorList(result.data);
      })
      .catch(error =>
        console.log("❌ BubblePage axiosWithAuth get colors: ", error)
      );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
