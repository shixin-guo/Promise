import fetcher from './fetcher'
import { handler as useCart } from './cart/use-cart'
import { handler as useAddItem } from './cart/use-add-item'
import { handler as useUpdateItem } from './cart/use-update-item'
import { handler as useRemoveItem } from './cart/use-remove-item'
import { handler as useSearch } from './product/use-search'
import { handler as useLogin } from './auth/use-login'
import { handler as useLogout } from './auth/use-logout'
import { handler as useSignup } from './auth/use-signup'
import { handler as useCheckout } from './checkout/use-checkout'
import { handler as useSubmitCheckout } from './checkout/use-submit-checkout'
import { handler as useCustomer } from './customer/use-customer'
import { handler as useCards } from './customer/card/use-cards'
import { handler as useAddCardItem } from './customer/card/use-add-item'
import { handler as useUpdateCardItem } from './customer/card/use-update-item'
import { handler as useRemoveCardItem } from './customer/card/use-remove-item'
import { handler as useAddresses } from './customer/address/use-addresses'
import { handler as useAddAddressItem } from './customer/address/use-add-item'
import { handler as useUpdateAddressItem } from './customer/address/use-update-item'
import { handler as useRemoveAddressItem } from './customer/address/use-remove-item'
import { firebaseApp, firebaseDb } from './firebase/clientApp'
// import { handler as useWishlist } from './wishlist/use-wishlist'
// import { handler as useWishlistAddItem } from './wishlist/use-add-item'
// import { handler as useWishlistRemoveItem } from './wishlist/use-remove-item'

export const localProvider = {
  locale: 'en-us',
  cartCookie: 'session',
  fetcher,
  auth: { useLogin, useLogout, useSignup },
  cart: { useCart, useAddItem, useUpdateItem, useRemoveItem },
  customer: {
    useCustomer,
    card: {
      useCards,
      useAddItem: useAddCardItem,
      useUpdateItem: useUpdateCardItem,
      useRemoveItem: useRemoveCardItem,
    },
    address: {
      useAddresses,
      useAddItem: useAddAddressItem,
      useUpdateItem: useUpdateAddressItem,
      useRemoveItem: useRemoveAddressItem,
    },
  },
  checkout: { useCheckout, useSubmitCheckout },
  products: { useSearch },
  // wishlist: {
  //   useWishlist,
  //   useAddItem: useWishlistAddItem,
  //   useRemoveItem: useWishlistRemoveItem,
  // },
}
export type LocalProvider = typeof localProvider
export { firebaseApp, firebaseDb }
