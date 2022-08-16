import React, { useContext, useState } from "react";
import SearchContext from "./searchContext";

const SearchState = (props) => {
  const [search, setSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  // const state={
  //     searchValue:""
  // }
  return (
    <SearchContext.Provider
      value={{ search, setSearch, categorySearch, setCategorySearch }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
