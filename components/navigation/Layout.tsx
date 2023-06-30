import React, { ReactNode } from 'react';
import { HeaderMegaMenu } from './Header';
import { FooterLinks } from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const allLinks = [
    {
      title: 'About',
      links: [
        {
          label: 'Features',
          link: '/',
        },
        {
          label: 'Pricing',
          link: '/',
        },
        {
          label: 'News',
          link: '/',
        },
        {
          label: 'FAQ',
          link: '/',
        },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Twitter', link: '/' },
        { label: 'GitHub', link: '/' },
        { label: 'Discord', link: '/' },
      ],
    },
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
