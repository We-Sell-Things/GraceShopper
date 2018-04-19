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
  }

  render() {
    const inputValue = this.state.inputValue;
    const filteredProducts = this.props.products.filter(product =>
      product.title.match(inputValue));
    const options = [];
    const { handleSubmit } = this.props;
    this.props.products.map(product =>
      options.push({ text: product.title, id: product.id })
    )

    return (
      <div>


        <Dropdown
        className="searchbar"
        placeholder="Select Product" fluid search selection options={options}
        key={options.id}
          onLabelClick={handleSubmit}
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
      console.log('hi', event.target.value);
    })
  }
}



export default connect(mapState, mapDispatch)(FilterSearchBar)
