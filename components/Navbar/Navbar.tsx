import { useState } from 'react';
import Link from 'next/link';
import { UserButton } from '@/components/UserButton/UserButton';
import { CommunityButton } from '@/components/CommunityButton/CommunityButton';
import classes from '@/components/Navbar/Navbar.module.css';

//Icons
import { SolarHomeSmileBold } from '@/public/icon/SolarHomeSmileBold';
import { SolarCalendarBold } from '@/public/icon/SolarCalendarBold';
import { SolarShop2Bold } from '@/public/icon/SolarShop2Bold';
import { SolarUsersGroupTwoRoundedBold } from '@/public/icon/SolarUsersGroupTwoRoundedBold';

const data = [
  { link: '/home', label: 'Home', icon: SolarHomeSmileBold },
  { link: '/events', label: 'Events', icon: SolarCalendarBold },
  { link: '/marketplace', label: 'Marketplace', icon: SolarShop2Bold },
  { link: '/people', label: 'People', icon: SolarUsersGroupTwoRoundedBold },
];

interface NavbarProps {
  user: User;
}

export function Navbar({ user }: NavbarProps) {
  const [active, setActive] = useState('Home');

  const links = data.map((item) => (
    <Link
      href={item.link}
      key={item.label}
      role="button"
      tabIndex={0}
      className={`${classes.link} ${active === item.label ? classes.active : ''}`}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <UserButton user={user} />
        <CommunityButton user={user} />
      </div>
    </nav>
  );
}
