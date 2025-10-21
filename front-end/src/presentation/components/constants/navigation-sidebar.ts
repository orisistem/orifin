import {
  LucideIcon,
  Home,
  BanknoteX,
  BanknoteArrowUp,
  PiggyBank,
  BadgeDollarSign,
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
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  {
    name: 'Transações',
    icon: BanknoteArrowUp,
    href: '/transactions',
  },
  {
    name: 'Contas',
    icon: PiggyBank,
    href: '/accounts',
  },
  {
    name: 'Orçamentos',
    icon: BadgeDollarSign,
    href: '/budgets',
  },
];
