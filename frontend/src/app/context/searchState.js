import React, { useContext, useState } from 'react'
import SearchContext from './searchContext';

const SearchState = (props) => {
     const [search, setSearch] = useState("");

    // const state={
    //     searchValue:""
    // }
  return (
    <SearchContext.Provider value={{search,setSearch}}>
        {props.children}
    </SearchContext.Provider>
  )
}

export default SearchState