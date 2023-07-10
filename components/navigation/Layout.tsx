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
            link: '/all-notes',
          },
          {
            label:'Upload Notes',
            link: '/new-upload',
          },
        ]
      }
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeaderMegaMenu />
      <div style={{ flex: '1 0 auto' }}>{children}</div>
      <FooterLinks data={allLinks} />
    </div>
  );
};

export default Layout;
