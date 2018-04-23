import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Header, Grid } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import { fetchSingleCategory } from '../store';

const AppSidebar = ({categories, handleCategory}) => {
  return (
    <div style={{width: '10vw', float: 'left', margin: '1vw', height: '100vh'}}>
    <Grid columns={1}>
      <Header as='h3'>Categories</Header>
      {
        categories.length ?
          categories.map(category => {
            return (
              <Grid.Column key={category.id}>
                <NavLink to={`/categories/${category.id}`}>
                <h3 onClick={() => handleCategory(category.id)}>{category.name}</h3></NavLink>
              </Grid.Column>
            )
          })
      : <h4>There are no categories in the database!</h4>
      }
    </Grid>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    categories: state.categories
  }
};

const mapDispatch = dispatch => {
  return {
    handleCategory: function(categoryId){
      dispatch(fetchSingleCategory(categoryId));
    }
  }
}



export default connect(mapState, mapDispatch)(AppSidebar);

/**
 * PROP TYPES
 */
AppSidebar.propTypes = {
  categories: PropTypes.array.isRequired
}
