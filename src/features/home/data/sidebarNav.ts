import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Anchor,
  Award,
  BarChart3,
  Building2,
  Cog,
  CreditCard,
  FileText,
  HelpCircle,
  Mail,
  MessageCircleCheck,
  MessageSquare,
  Percent,
  ShieldCheck,
  Ship,
  ShoppingBag,
  Star,
  UserCheck,
  Users,
} from "lucide-react";
import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { StaffPermission } from "@/features/employees/types";

const Analysis = lazy(() =>
  import("../pages/Analysis").then((m) => ({ default: m.Analysis })),
);

const ReviewsPage = lazy(() =>
  import("@/features/reviews/pages/ReviewsPage").then((m) => ({ default: m.ReviewsPage })),
);

const MessagesPage = lazy(() =>
  import("@/features/messages/pages/MessagesPage").then((m) => ({ default: m.MessagesPage })),
);

const FrequentlyAskedQuestionsPage = lazy(() =>
  import("@/features/faq/pages/FrequentlyAskedQuestionsPage").then((m) => ({ default: m.FrequentlyAskedQuestionsPage })),
);

const TermsConditionsPage = lazy(() =>
  import("@/features/termsConditions/pages/TermsConditionsPage").then((m) => ({ default: m.TermsConditionsPage })),
);

const EmployeesPage = lazy(() =>
  import("@/features/employees/pages/EmployeesPage").then((m) => ({ default: m.EmployeesPage })),
);

const CustomersPage = lazy(() =>
  import("@/features/customers/pages/CustomersPage").then((m) => ({ default: m.CustomersPage })),
);

export type SidebarNavItemConfig = {
  id: string;
  label: string;
  title?: string;
  description?: string;
  Children?: ComponentType | LazyExoticComponent<ComponentType>;
  endpoint?: string;
  to: string;
  icon: LucideIcon;
  permission?: StaffPermission;
};

export const PERMISSION_ROUTES: Record<StaffPermission, string> = {
  users: "/users",
  staff: "/staff",
  notifications: "/messages/leads",
  boat_sales: "/yachts/sales",
  rentals: "/yachts/rental",
};

export const SIDEBAR_NAV_ITEMS: SidebarNavItemConfig[] = [
  {
    id: "analytics",
    label: "التحليلات",
    title: "لوحة التحليلات والإحصائيات",
    description: "متابعة مؤشرات الأداء العامة، حجم المعاملات المالية، ونشاط المنصة اللحظي.",
    to: "/",
    Children: Analysis,
    icon: BarChart3,
  },
  {
    id: "rental-yachts",
    label: "اليخوت (الإيجار)",
    title: "إدارة يخوت الإيجار",
    description: "مراجعة واعتماد عروض اليخوت المخصصة للتأجير، جداول الحجوزات والأسعار.",
    to: "/yachts/rental",
    icon: Anchor,
  },
  {
    id: "sales-yachts",
    label: "اليخوت (البيع)",
    title: "إدارة يخوت البيع",
    description: "إدارة ومراجعة إعلانات بيع اليخوت والمراكب والتحقق من وثائق الملكية.",
    to: "/yachts/sales",
    icon: Ship,
  },
  {
    id: "users",
    label: "المستخدمين",
    title: "إدارة حسابات المستخدمين",
    description: "إدارة الحسابات المسجلة بالمنصة، سجل النشاطات، وحالات الحسابات.",
    to: "/users",
    Children: CustomersPage,
    icon: Users,
  },
  {
    id: "boat-owners",
    label: "المُلاك",
    title: "إدارة الملاك والمؤجرين",
    description: "إدارة حسابات الملاك الأفراد، مؤجري المراكب، وبائعي اليخوت والمعدات المستعملة.",
    to: "/merchants/owners",
    icon: UserCheck,
  },
  {
    id: "marine-companies",
    label: "الشركات",
    title: "إدارة الشركات والوكلاء",
    description: "إدارة حسابات شركات تصنيع وتوريد اليخوت والمراكب الجديدة والوكلاء المعتمدين.",
    to: "/merchants/companies",
    icon: Building2,
  },
  {
    id: "employees",
    label: "الموظفين",
    title: "إدارة فريق العمل والصلاحيات",
    description: "إدارة حسابات موظفي لوحة التحكم وتوزيع الأدوار والصلاحيات الإدارية.",
    to: "/staff",
    Children: EmployeesPage,
    icon: ShieldCheck,
  },
  {
    id: "marketplace-direct",
    label: "المتجر المباشر",
    title: "أدوات البيع ومستلزمات الصيد",
    description: "إدارة مستلزمات الصيد والقطع الخفيفة التي تتم عمليات بيعها وشحنها عبر المنصة.",
    to: "/marketplace/direct",
    icon: ShoppingBag,
  },
  {
    id: "marketplace-heavy",
    label: "المعدات الثقيلة",
    title: "إدارة المعدات والمحركات البحرية",
    description: "متابعة عروض وطلبات المعدات والمحركات البحرية الثقيلة التي تُنفذ صفقاتها خارج المنصة.",
    to: "/marketplace/heavy-equipment",
    icon: Cog,
  },
  {
    id: "payment-transactions",
    label: "عمليات الدفع",
    title: "سجل المدفوعات والمعاملات",
    description: "تتبع كافة المدفوعات الإلكترونية، الحجوزات، المحافظ المالية وحالات السداد.",
    to: "/finance/transactions",
    icon: CreditCard,
  },
  {
    id: "lead-messages",
    label: "الرسائل",
    title: "رسائل واستفسارات الموقع",
    description: "استعراض وإدارة الرسائل والاستفسارات الواردة من نماذج الاتصال والـ CTA بالموقع.",
    to: "/messages/leads",
    Children: MessagesPage,
    icon: Mail,
  },
  {
    id: "rental-chats",
    label: "محادثات الإيجار",
    title: "مراقبة محادثات التأجير",
    description: "متابعة وتدقيق المحادثات المباشرة بين المؤجرين والمستأجرين لمنع التجاوزات.",
    to: "/messages/rental-chats",
    icon: MessageSquare,
  },
  {
    id: "platform-reviews",
    label: "آراء المنصة",
    title: "تقييمات وآراء الموقع",
    description: "مراجعة آراء وتقييمات العملاء حول تجربة استخدام منصة Yachty ومستوى الخدمة.",
    to: "/reviews/platform",
    Children: ReviewsPage,
    icon: Star,
  },
  {
    id: "rental-reviews",
    label: "تقييمات الإيجار",
    title: "تقييمات رحلات التأجير",
    description: "استعراض تقييمات المستأجرين لليخوت والملاك، وتقييم الملاك للعملاء بعد الرحلة.",
    to: "/reviews/rentals",
    icon: Award,
  },
  {
    id: "product-reviews",
    label: "تقييمات المتجر",
    title: "تقييمات منتجات الماركت بليس",
    description: "إدارة ومراجعة تقييمات المشترين على منتجات ومعدات ومستلزمات المتجر.",
    to: "/reviews/products",
    icon: MessageCircleCheck,
  },
  {
    id: "owner-reports",
    label: "إبلاغات الملاك",
    title: "شكاوى وإبلاغات المؤجرين",
    description: "متابعة بلاغات وشكاوى الملاك بخصوص التلفيات أو مخالفات المستأجرين أثناء التأجير.",
    to: "/reports/owners",
    icon: AlertTriangle,
  },
  {
    id: "terms-and-conditions",
    label: "الشروط والأحكام",
    title: "إدارة السياسات والشروط",
    description: "تحرير وتحديث سياسات الخصوصية، شروط التأجير، إخلاء المسؤولية، وحقوق المنصة.",
    to: "/cms/terms",
    Children: TermsConditionsPage,
    icon: FileText,
  },
  {
    id: "frequently-asked-questions",
    label: "الأسئلة الشائعة",
    title: "إدارة الأسئلة الشائعة",
    description: "إضافة وتعديل الأسئلة الأكثر تكراراً وإجاباتها لتسهيل وصول المستخدمين للمعلومات.",
    to: "/frequently-asked-questions",
    icon: HelpCircle,
    Children: FrequentlyAskedQuestionsPage,
  },
  {
    id: "commission-fees",
    label: "النسب والعمولات",
    title: "إعدادات نسب المعاملات المالية",
    description: "التحكم في تحديد وتعديل نسب العمولات ورسوم العمليات على حجوزات التأجير والمبيعات.",
    to: "/finance/commissions",
    icon: Percent,
  },
];
