import React from 'react';


const FilterInput = (props) => {

  const handleChange = props.handleChange;
  const inputValue = props.inputValue;



return (
  <form>
  <input
  onChange={handleChange}
  value={inputValue}
  placeholder="Search"
  />
  </form>
)
}

export default FilterInput;
