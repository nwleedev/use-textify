import {
  BarChart3,
  BookOpen,
  Briefcase,
  Code,
  Component,
  DollarSign,
  FileCheck,
  FileText,
  Gamepad2,
  GraduationCap,
  Handshake,
  Heart,
  HelpCircle,
  Lightbulb,
  LucideIcon,
  LucideProps,
  MapPin,
  Megaphone,
  Palette,
  PenTool,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

export interface CategoryIconProps extends LucideProps {
  iconKey?: string;
}

export const CategoryIcon = (props: CategoryIconProps) => {
  const { iconKey, ...others } = props;
  const Icon = iconKey && icons[iconKey] ? icons[iconKey] : Component;

  return <Icon {...others} />;
};

const icons: Record<string, LucideIcon> = {
  "writing-assistance": PenTool,
  "creative-writing": FileText,
  copywriting: Megaphone,
  "marketing-strategy": TrendingUp,
  "sales-support": Handshake,
  "business-operations": Briefcase,
  "financial-advice": DollarSign,
  "educational-content": BookOpen,
  "study-assistance": GraduationCap,
  "software-development": Code,
  "data-analysis": BarChart3,
  "creative-arts": Palette,
  "idea-generation": Lightbulb,
  "travel-planning": MapPin,
  "personal-development": User,
  "relationship-advice": Heart,
  "entertainment-prompts": Gamepad2,
  "role-playing": Users,
  "general-inquiry": HelpCircle,
  "information-summary": FileCheck,
  "human-resources": Users,
  "legal-advices": Briefcase,
  seo: TrendingUp,
};
