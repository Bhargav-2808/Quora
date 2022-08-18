import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
import React, { useContext } from "react";
import searchContext from "./context/searchContext";

const Category = () => {
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { setCategorySearch } = useContext(searchContext);

  const handleChange = (event) => {
    setCategory(event.target.value);
    setCategorySearch(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <FormControl style={{ width: "120px" }}>
        <div className="select-dropdown">

       
        <select value={category} onChange={handleChange} className="selectCat">
          <option selected value="General">
            General
          </option>
          <option value="Frontend">Frontend</option>
          <option value={"Backend"}>Backend</option>
          <option value={"Web Dev"}>Web Dev</option>
        </select>
         </div>
      </FormControl>
    </>
  );
};

export default Category;
