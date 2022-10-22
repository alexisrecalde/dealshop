import React, { useState } from "react";
import { ImSearch } from "react-icons/im";

const SearchInputMobile = () => {


  return (
    <div class="searchbox">
      <input
        class="search-txt"
        type="text"
        name=""
        placeholder="Type to search"
      />
      <a class="searchbutton" href="#" />
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  );
};

export default SearchInputMobile;
