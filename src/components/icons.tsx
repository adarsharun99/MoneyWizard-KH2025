import {
  LayoutDashboard,
  Target,
  ShieldCheck,
  PieChart,
  BookOpen,
  MessageCircle,
  Landmark,
  type LucideIcon,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  logo: Landmark,
  dashboard: LayoutDashboard,
  goals: Target,
  assessment: ShieldCheck,
  portfolio: PieChart,
  learn: BookOpen,
  chat: MessageCircle,
};
