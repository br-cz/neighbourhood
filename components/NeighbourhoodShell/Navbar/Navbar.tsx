import { Text, UnstyledButton } from '@mantine/core';
import { NavbarProfileButton } from '@/components/NeighbourhoodShell/Navbar/NavbarProfileButton/NavbarProfileButton';
import { NavbarCommunityButton } from '@/components/NeighbourhoodShell/Navbar/NavbarCommunityButton/NavbarCommunityButton';
import classes from '@/components/NeighbourhoodShell/Navbar/Navbar.module.css';

import { SolarHomeSmileBold } from '@/public/icon/SolarHomeSmileBold';
import { SolarCalendarBold } from '@/public/icon/SolarCalendarBold';
import { SolarShop2Bold } from '@/public/icon/SolarShop2Bold';
import { SolarUsersGroupTwoRoundedBold } from '@/public/icon/SolarUsersGroupTwoRoundedBold';

const data = [
  { link: 'home', label: 'Home', icon: SolarHomeSmileBold },
  { link: 'events', label: 'Events', icon: SolarCalendarBold },
  { link: 'marketplace', label: 'Marketplace', icon: SolarShop2Bold },
  { link: 'people', label: 'People', icon: SolarUsersGroupTwoRoundedBold },
];

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const links = data.map((item) => (
    <UnstyledButton
      onClick={() => {
        setActiveTab(item.link);
      }}
      key={item.label}
      role="button"
      tabIndex={0}
      className={`${classes.link} ${activeTab === item.link ? classes.active : ''}`}
    >
      <item.icon className={classes.linkIcon} />
      <Text fz="sm">{item.label}</Text>
    </UnstyledButton>
  ));

  return (
    <nav className={classes.navbar} data-testid="navbar">
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <NavbarProfileButton active={activeTab === 'profile' && true} setActiveTab={setActiveTab} />
        <NavbarCommunityButton
          active={activeTab === 'communities' && true}
          setActiveTab={setActiveTab}
        />
      </div>
    </nav>
  );
}
