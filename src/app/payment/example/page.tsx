// pages/checkout.tsx
import StripeCheckoutButton from '../../../components/payment/page';

export default function CheckoutPage() {
  const priceId = "price_1O6G0FCceWTJxIdXdOxK0Z95"; // replace with your actual Stripe price ID
  const productId = "prod_Ou48YQX7pvw6aM";

  return (
    <div>
      <h1>Checkout Page</h1>
      <StripeCheckoutButton priceId={priceId} productId={productId} />
    </div>
  );
}
