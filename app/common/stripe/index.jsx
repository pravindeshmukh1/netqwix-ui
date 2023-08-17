import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {useState} from 'react';
import { toast } from 'react-toastify';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe (
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = ({clientSecret, handlePaymentSuccess}) => {
  const stripe = useStripe ();
  const elements = useElements ();

  const [errorMessage, setErrorMessage] = useState (null);

  const handleSubmit = async event => {
    event.preventDefault ();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit ();
    if (submitError) {
      // Show error to your customer
      setErrorMessage (submitError.message);
      return;
    }

    const {error, paymentIntent} = await stripe.confirmPayment ({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'https://netquix-ui.vercel.app/dashboard',
      },
      redirect: 'if_required'
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage (error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success("Payment succeeded");
      handlePaymentSuccess();
    } else {
      console.log("Payment failed");
      // handleOther();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="btn btn-primary mt-4 w-100"
        type="submit"
        disabled={!stripe || !elements}
      >
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div className="error mt-3">{errorMessage}</div>}
    </form>
  );
};

const StripeCard = ({clientSecret, handlePaymentSuccess}) => {
  const options = {
    name: 'netquix',
    description: 'netquix trainer payment',
    // passing the client secret obtained from the server
    clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {/* <form  >
        <PaymentElement />
        <button className='btn btn-primary mt-4 w-100'>Submit</button>
      </form> */}
      <CheckoutForm clientSecret={clientSecret} handlePaymentSuccess={handlePaymentSuccess} />
    </Elements>
  );
};
export default StripeCard;
