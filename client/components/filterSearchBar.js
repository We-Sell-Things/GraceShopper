import React, { Component } from 'react';
import FilterInput from './FilterInput';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react'


export class FilterSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange (evt) {
    const value = evt.target.value;
    console.log(value)
    this.setState({
      inputValue: value
    });
  }


  render() {
    const inputValue = this.state.inputValue;
    const filteredProducts = this.props.products.filter(product =>
      product.title.match(inputValue));
    const options = [];
    this.props.products.map(product =>
      options.push({ text: product.title, key: product.id })
    )
    return (
      <div>
      <FilterInput
      handleChange={this.handleChange}
      inputValue={inputValue}
    />
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit: (event => {
      event.preventDefault();
    })
  }
}



export default connect(mapState, mapDispatch)(FilterSearchBar)


// return (
//   <div>
//   <FilterInput
//   handleChange={this.handleChange}
//   inputValue={inputValue}
//   />
//   <select>
//   {filteredProducts.map(product =>
//   <option key={product.id}>{product.title}</option>
//   )}
//   </select>
//   </div>
// )
// }
// }



// <VirtualizedSelect
//           options={this.props.products}
//           simpleValue
//           clearable
//           name="select-product"
//           searchable
//           labelkey="name"
//           valueKey="name"
//         />


// <FilterInput
// handleChange={this.handleChange}
// inputValue={inputValue}
// />
// <select>
// {filteredProducts.map(product =>
//   <option key={product.id}>{product.title}</option>
// )}
// </select>


// this.handleChange = this.handleChange.bind(this);

//
