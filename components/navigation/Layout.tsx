import React, { ReactNode } from 'react';
import { HeaderMegaMenu } from './Header';
import { FooterLinks } from './Footer';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const allLinks = [
      {
        title: 'Features',
        links: [
          {
            label:'View All Notes',
            link: '/pages/all-notes/index.tsx',
          },
          {
            label:'Upload Notes',
            link: '/',
          },
        ]
      }
  ];
  return (
    <div>
      <HeaderMegaMenu />
      {children}
      <FooterLinks data={allLinks} />
    </div>
  );
};

export default Layout;
