import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Grid, Image, Icon, Button, Container } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

const Categories = ({categories}) => {
  return (
    <div>
      <h1>Categories</h1>
     {
       categories.length ?
        <Grid columns={1} style={{margin: '30px', float: 'left'}}>
        {categories.map(category => {
          return (
            <Grid.Column key={category.id} style={{border: '3px blue'}}>
              <div>
              <NavLink to={`/categories/${category.id}`}>
                <h3>{category.name}</h3>
              </NavLink>
              </div>
            </Grid.Column>
          )
        })}
        </Grid>
      : <h4>There are no categories in the database!</h4>
     }
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

export default connect(mapState)(Categories);

/**
 * PROP TYPES
 */
Categories.propTypes = {
  categories: PropTypes.array.isRequired
}
