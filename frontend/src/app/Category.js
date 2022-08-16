import { InputLabel, MenuItem, Select, FormControl } from "@material-ui/core";
import React, { useContext } from "react";
import searchContext from "./context/searchContext";


const Category = () => {
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const {setCategorySearch} = useContext(searchContext);

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
    
        <FormControl style={{  width: "120px" }}>
          <InputLabel id="demo-controlled-open-select-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            name="category"
            onClose={handleClose}
            onOpen={handleOpen}
            value={category}
            onChange={handleChange}
          >
            <MenuItem selected value="General">General</MenuItem>
            <MenuItem value="Frontend">Frontend</MenuItem>
            <MenuItem value={"Backend"}>Backend</MenuItem>
            <MenuItem value={"Web Dev"}>Web Dev</MenuItem>
          </Select>
        </FormControl>
      
    </>
  );
};

export default Category;
