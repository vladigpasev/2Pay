// pages/checkout.tsx
import StripeCheckoutButton from '../../../components/payment/page';

export default function CheckoutPage() {
  const priceId = "price_1O5msoCceWTJxIdX3szH5BZm"; // replace with your actual Stripe price ID
  const productId = "prod_Ota24zQptZxmYh";

  return (
    <div>
      <h1>Checkout Page</h1>
      <StripeCheckoutButton priceId={priceId} productId={productId} />
    </div>
  );
}
