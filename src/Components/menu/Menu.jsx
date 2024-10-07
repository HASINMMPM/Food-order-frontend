import React from 'react'
import MenuBanner from './MenuBanner'
import Foodshow from './Foodshow'
import CoupenBanner from './CoupenBanner'

const Menu = () => {
  return (
    <div>
      <CoupenBanner/>
      <MenuBanner/>
      <Foodshow/>
    </div>
  )
}

export default Menu