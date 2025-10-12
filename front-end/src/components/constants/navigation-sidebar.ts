import {
  LucideIcon,
  Home,
  BanknoteX,
  BanknoteArrowDown,
  HandCoins,
  Diff,
} from 'lucide-react';

export interface NavigationChild {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface NavigationItem {
  name: string;
  href?: string;
  icon: LucideIcon;
  isGroup?: boolean;
  children?: NavigationChild[];
}

export const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  {
    name: 'Transações',
    icon: BanknoteX,
    isGroup: true,
    children: [
      {
        name: 'Adicionar',
        href: '/transactions/adicionar',
        icon: Diff,
      },
      {
        name: 'Lista',
        href: '/transactions/lista',
        icon: HandCoins,
      },
    ],
  },
];
