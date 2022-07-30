import Cookies, { CookieAttributes } from 'js-cookie'

export const CUSTOMER_TOKEN_COOKIE = 'gallery_customerToken'

export const COOKIE_EXPIRE = 30

export const getCustomerToken = () => Cookies.get(CUSTOMER_TOKEN_COOKIE)

export const setCustomerToken = (
  token: string | null,
  options?: CookieAttributes
) => {
  if (!token) {
    Cookies.remove(CUSTOMER_TOKEN_COOKIE)
  } else {
    Cookies.set(
      CUSTOMER_TOKEN_COOKIE,
      token,
      options ?? {
        expires: COOKIE_EXPIRE,
      }
    )
  }
}
