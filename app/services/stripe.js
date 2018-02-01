import stripe from 'tipsi-stripe'

stripe.init({
  publishableKey: __DEV__ ? 'pk_test_S8LaqXK0DDyLfhyVoHr8ERsA': 'pk_live_vev4Dm6AXgNWcfx1UD3DIKx9',
  merchantId:     'merchant.com.unicorn.dating',
})

export default stripe
