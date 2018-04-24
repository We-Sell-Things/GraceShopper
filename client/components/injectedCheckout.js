import React from 'react';
import {injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement} from 'react-stripe-elements';

class CheckoutForm extends React.Component {
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    const name = ev.target.name.value;
    const email = ev.target.email.value;

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name, email}).then((token) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="StripeElement">
      <label>
        Name
        <input type="text" name="name" placeholder="Name" className="StripeElement" />
      </label>
      <label>
      Email
      <input type="text" name="email" placeholder="Email" className="StripeElement" />
    </label>
        <label>
        Card number
        <CardNumberElement

        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement

        />
      </label>
      <label>
        CVC
        <CardCVCElement
        />
      </label>
      <label>
        Postal code
        <PostalCodeElement

        />
        </label>
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
