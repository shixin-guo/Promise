import cn from 'clsx'
import Link from 'next/link'
import s from './UserNav.module.css'
import useCart from '@framework/cart/use-cart'
import { useUI } from '@components/ui/context'
import { Heart, Bag, Menu } from '@components/icons'
import CustomerMenuContent from './CustomerMenuContent'
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ConnectKitButton } from 'connectkit'
import useLogin from '@framework/auth/use-login'

import {
  Dropdown,
  DropdownTrigger as DropdownTriggerInst,
  Button,
} from '@components/ui'

import type { LineItem } from '@commerce/types/cart'

const countItem = (count: number, item: LineItem) => count + item?.quantity || 0

const UserNav: React.FC<{
  className?: string
}> = ({ className }) => {
  const { data: cart } = useCart()
  const { toggleSidebar, closeSidebarIfPresent, setSidebarView, openSidebar } =
    useUI()
  const itemsCount = cart?.lineItems.reduce(countItem, 0) ?? 0
  const { isConnected = false } = useAccount()
  const DropdownTrigger = isConnected ? DropdownTriggerInst : React.Fragment
  const login = useLogin()
  useEffect(() => {
    // todo remove after demo
    isConnected &&
      login({
        email: 'guo@12.com',
        password: 'Pass@123',
      })
  }, [isConnected, login])
  const onClickKitButton = (open: () => void) => {
    !isConnected ? open() : null
  }
  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        {/* {isConnected && (
          <li className={cn(s.item, s.createButton)}>
            <Link href="/create">
              <a onClick={closeSidebarIfPresent} aria-label="Create a new NFT">
                Create
              </a>
            </Link>
          </li>
        )} */}
        {process.env.COMMERCE_CART_ENABLED && (
          <li className={s.item}>
            <Button
              className={s.item}
              variant="naked"
              onClick={() => {
                setSidebarView('CART_VIEW')
                toggleSidebar()
              }}
              aria-label={`Cart items: ${itemsCount}`}
            >
              <Bag />
              {itemsCount > 0 && (
                <span className={s.bagCount}>{itemsCount}</span>
              )}
            </Button>
          </li>
        )}
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <li className={s.item}>
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
        )}
        {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
          <li className={s.item}>
            <Dropdown>
              <DropdownTrigger>
                <span aria-label="Menu" className={s.avatarButton}>
                  <ConnectKitButton onClick={onClickKitButton} />
                </span>
              </DropdownTrigger>
              <CustomerMenuContent />
            </Dropdown>
          </li>
        )}
        <li className={s.mobileMenu}>
          <Button
            className={s.item}
            aria-label="Menu"
            variant="naked"
            onClick={() => {
              openSidebar()
              setSidebarView('MOBILE_MENU_VIEW')
            }}
          >
            <Menu />
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
