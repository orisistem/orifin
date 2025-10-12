import {
  LucideIcon,
  Home,
  BanknoteX,
  BanknoteArrowDown,
  HandCoins,
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
    name: 'Despesas',
    icon: BanknoteX,
    isGroup: true,
    children: [
      {
        name: 'Adicionar Despesa',
        href: '/despesas/adicionar',
        icon: BanknoteArrowDown,
      },
      {
        name: 'Lista de Despesas',
        href: '/despesas/lista',
        icon: HandCoins,
      },
    ],
  },
];
