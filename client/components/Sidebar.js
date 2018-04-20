import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Sidebar, Menu, Header, Grid } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

const AppSidebar = ({categories}) => {
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
                <h3>{category.name}</h3></NavLink>
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

export default connect(mapState)(AppSidebar);

/**
 * PROP TYPES
 */
AppSidebar.propTypes = {
  categories: PropTypes.array.isRequired
}
