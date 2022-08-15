import { Search } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import searchContext from "../app/context/searchContext";

const SearchQ = () => {
const {search,setSearch} = useContext(searchContext);
  
return (
    <div className="qHeader__input">
      <Search />
      <input
        type="text"
        value={search}
        placeholder="Search questions"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchQ;
