import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { Card } from 'semantic-ui-react'

const Reviews = ({ reviews }) => {
  return (
    <div>
      {
      reviews && reviews.length
      ? <Card.Group>
        { reviews.map( review => {
          return (<Card fluid color='blue' key={review.id}>
            <Card.Content>{review.score} / 5</Card.Content>
            <Card.Content>{review.review}</Card.Content>
          </Card>
          )
        })
        }
      </Card.Group>
      : <h4>There are no reviews for this product</h4>
      }
    </div>
  )

}

export default Reviews;
