import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'


export class Cart extends Component {


  ComponentDidMount() {
  this.props.fetchData();
  }



  render() {


    return(
      <div>
      EMPTY SHOPPING CART!
      </div>
    )
  }


}

// const mapDispatch = (dispatch, ownProps) => (
//   {
//     fetchData: () => {
//       const id
//     }
//   }
// )



export default connect(null, null)(Cart);
