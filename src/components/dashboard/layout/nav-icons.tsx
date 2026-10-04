import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  users: UsersIcon,
} as Record<string, Icon>;
