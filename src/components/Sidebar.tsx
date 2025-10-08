import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipTrigger, TooltipContent, Button } from './ui';
import { useSidebar } from '../contexts';

import {
  LucideIcon,
  Home,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  DollarSign,
} from 'lucide-react';

import { cn } from '../lib';

interface NavigationChild {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavigationItem {
  name: string;
  href?: string;
  icon: LucideIcon;
  isGroup?: boolean;
  children?: NavigationChild[];
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
];

export const Sidebar = () => {
  const location = useLocation();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    'Gestão Pedagógica',
    'Segurança e Compliance',
    'Comunicação',
  ]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((name) => name !== groupName)
        : [...prev, groupName]
    );
  };

  const isGroupExpanded = (groupName: string) =>
    expandedGroups.includes(groupName);

  const isActiveInGroup = (children: NavigationChild[]) => {
    return children.some(
      (child) =>
        location.pathname === child.href ||
        location.pathname.startsWith(child.href)
    );
  };

  const NavigationItemComponent = ({ item }: { item: NavigationItem }) => {
    if (item.isGroup && item.children) {
      const isExpanded = isGroupExpanded(item.name);
      const hasActiveChild = isActiveInGroup(item.children);

      if (isCollapsed) {
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='relative'>
                <button
                  className={cn(
                    'flex items-center justify-center w-full px-3 py-3 text-sm font-medium rounded-lg transition-colors mx-1',
                    hasActiveChild
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <item.icon className='h-5 w-5' />
                  {hasActiveChild && (
                    <div className='absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-700 rounded-full' />
                  )}
                </button>
                {/* Submenu for collapsed state */}
                {hasActiveChild && (
                  <div className='absolute left-full top-0 ml-2 bg-white shadow-lg rounded-lg border py-2 min-w-[160px] z-50'>
                    {item.children.map((child: NavigationChild) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className={cn(
                          'flex items-center px-3 py-2 text-sm hover:bg-gray-100 transition-colors',
                          location.pathname === child.href ||
                            location.pathname.startsWith(child.href)
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700'
                        )}
                      >
                        <child.icon className='h-4 w-4 mr-2' />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side='right' className='ml-2'>
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        );
      }

      return (
        <div>
          <button
            onClick={() => toggleGroup(item.name)}
            className={cn(
              'flex items-center justify-between w-full px-3 py-3 text-sm font-medium rounded-lg transition-colors mx-2',
              hasActiveChild
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <div className='flex items-center'>
              <item.icon className='h-5 w-5 mr-3' />
              <span className='truncate'>{item.name}</span>
            </div>
            {isExpanded ? (
              <ChevronUp className='h-4 w-4' />
            ) : (
              <ChevronDown className='h-4 w-4' />
            )}
            {hasActiveChild && (
              <div className='absolute right-0 top-0 bottom-0 w-1 bg-blue-700 rounded-l-full' />
            )}
          </button>

          {isExpanded && (
            <div className='ml-6 mt-1 space-y-1'>
              {item.children.map((child: NavigationChild) => (
                <Link
                  key={child.name}
                  to={child.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm rounded-lg transition-colors relative',
                    location.pathname === child.href ||
                      location.pathname.startsWith(child.href)
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <child.icon className='h-4 w-4 mr-3' />
                  <span className='truncate'>{child.name}</span>
                  {(location.pathname === child.href ||
                    location.pathname.startsWith(child.href)) && (
                    <div className='absolute right-0 top-0 bottom-0 w-1 bg-blue-700 rounded-l-full' />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Regular navigation item
    if (!item.href) return null;

    const isActive = location.pathname === item.href;

    const linkContent = (
      <Link
        to={item.href}
        className={cn(
          'flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors relative group',
          isActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
          isCollapsed ? 'justify-center mx-1' : 'mx-2'
        )}
      >
        <item.icon
          className={cn('h-5 w-5 flex-shrink-0', isCollapsed ? '' : 'mr-3')}
        />
        {!isCollapsed && <span className='truncate'>{item.name}</span>}
        {isActive && !isCollapsed && (
          <div className='absolute right-0 top-0 bottom-0 w-1 bg-blue-700 rounded-l-full' />
        )}
        {isActive && isCollapsed && (
          <div className='absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-700 rounded-full' />
        )}
      </Link>
    );

    if (isCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{linkContent}</div>
          </TooltipTrigger>
          <TooltipContent side='right' className='ml-2'>
            <p>{item.name}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex h-16 items-center border-b border-gray-200 px-4 flex-shrink-0',
          isCollapsed ? 'justify-center px-2' : 'justify-between'
        )}
      >
        {!isCollapsed && (
          <div className='flex items-center space-x-2 min-w-0'>
            <DollarSign className='h-8 w-8 text-blue-600 flex-shrink-0' />
            <span className='text-xl font-bold text-gray-900 truncate'>
              OriFin
            </span>
          </div>
        )}

        {isCollapsed && <DollarSign className='h-10 w-10 text-blue-600' />}

        {/* Toggle Button - sempre dentro do sidebar */}
        <Button
          variant='ghost'
          size='sm'
          onClick={toggleSidebar}
          className={cn(
            'p-2 hover:bg-gray-100 transition-colors flex-shrink-0',
            isCollapsed ? 'w-6 h-6' : 'w-8 h-8'
          )}
          title={isCollapsed ? 'Expandir sidebar' : 'Retrair sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className='h-4 w-4' />
          ) : (
            <ChevronLeft className='h-4 w-4' />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav
        className={cn(
          'flex-1 overflow-y-auto py-4',
          isCollapsed ? 'px-1' : 'px-2'
        )}
      >
        <ul className='space-y-1'>
          {navigation.map((item) => (
            <li key={item.name}>
              <NavigationItemComponent item={item} />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className='flex-shrink-0 p-4 border-t border-gray-200'>
          <div className='text-xs text-gray-500 text-center'>
            <p className='font-medium'>OriFin v1.0</p>
            <p>Sistema de Gestão Finanças</p>
          </div>
        </div>
      )}

      {/* Collapsed Footer - apenas ícone */}
      {isCollapsed && (
        <div className='flex-shrink-0 p-2 border-t border-gray-200 flex justify-center'>
          <div
            className='w-2 h-2 bg-green-500 rounded-full'
            title='Sistema Online'
          />
        </div>
      )}
    </div>
  );
};
