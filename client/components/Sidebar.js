import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Grid, Image, Icon, Button, Container, Sidebar, Menu, Header } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

const Categories = ({categories}) => {
  return (
    <div>
     {
       categories.length ?
       <Sidebar as={Menu} width='thin' visible='visible' vertical inverted>
       <Header as='h3' style={{color: 'white'}}>Categories</Header>
        {
          categories.map(category => {
            return (
              <Menu.Item key={category.id}>
                <NavLink to={`/categories/${category.id}`}>
                <h3>{category.name}</h3></NavLink>
              </Menu.Item>
            )
          })
        }
       </Sidebar>
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
