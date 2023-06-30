import React, { ReactNode } from 'react'
import {HeaderMegaMenu} from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <HeaderMegaMenu />
      {children}
    </div>
  )
}

export default Layout;