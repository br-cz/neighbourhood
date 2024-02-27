import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

export function Navbar() {
  const links = data.map((item) => (
    <Link
      href={item.link}
      key={item.label}
      role="button"
      tabIndex={0}
      className={`${classes.link} ${usePathname() === item.link ? classes.active : ''}`}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar} data-testid="navbar">
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <UserButton active={usePathname() === '/profile' && true} />
        <CommunityButton active={usePathname() === '/communities' && true} />
      </div>
    </nav>
  );
}
