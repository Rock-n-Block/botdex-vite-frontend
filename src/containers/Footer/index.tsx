import { FC } from 'react';

import { links } from './mock';

import {
  Bsc,
  Discord,
  Github,
  Insta,
  LogoFooter,
  LogoFooterSm,
  LogoTextFooter,
  LogoTextFooterSm,
  Tg,
  Twitter,
} from 'assets/img';

import s from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <div className={s.footer_wrapper}>
      <div className={s.footer}>
        <div className={s.logo}>
          <LogoFooter className={s.desktop} />
          <LogoTextFooter className={s.desktop} />
          <LogoFooterSm className={s.mobile} />
          <LogoTextFooterSm className={s.mobile} />
        </div>
        <div className={s.links}>
          {links.map((linkBlock) => (
            <div className={s.link_block}>
              {linkBlock.map((link) => (
                <a key={link.name} href={link.path} className={s.link}>
                  {link.name}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className={s.join_wrapper}>
          <div className={s.title}>Join our community</div>
          <div className={s.subtitle}>We will keep you posted!</div>
          <div className={s.socials}>
            <Tg />
            <Twitter />
            <Discord />
            <Insta />
            <Github />
          </div>
        </div>
        <Bsc />
        <div className={s.policies}>
          <a href="/" className={s.link}>
            Privacy Policy
          </a>
          <a href="/" className={s.link}>
            Terms&Conditions
          </a>
        </div>
      </div>
      <div className={s.bg} />
    </div>
  );
};

export default Footer;
