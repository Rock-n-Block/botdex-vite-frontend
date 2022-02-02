import { ComingSoon, Exchange, Farms, Home, Staking } from 'pages';

import { ExchangeImg, FarmsImg, HomeImg, StakingImg } from 'assets/img';

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: <Home />,
    icon: HomeImg,
    menu: true,
  },
  {
    name: 'Exchange',
    path: '/exchange',
    component: <Exchange />,
    icon: ExchangeImg,
    menu: true,
  },
  {
    name: 'Farms',
    path: '/farms',
    component: <Farms />,
    icon: FarmsImg,
    menu: true,
  },
  {
    name: 'Staking',
    path: '/staking',
    component: <Staking />,
    icon: StakingImg,
    menu: true,
  },
  {
    name: 'Coming Soon',
    path: '/coming-soon',
    component: <ComingSoon />,
    icon: undefined,
    menu: false,
  },
];
