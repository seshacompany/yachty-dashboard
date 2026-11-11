export type SelectOption = {
    label: string;
    value: string;
};

export const jobTitleEmployeeOptions: SelectOption[] = [
    {
        label: "مدير",
        value: "manager",
    },
    {
        label: "موظف مبيعات",
        value: "sales",
    },
    {
        label: "خدمة العملاء",
        value: "customer_service",
    },
    {
        label: "محاسب",
        value: "accountant",
    },
    {
        label: "مسوق",
        value: "marketer",
    },
];

export const statusEmployeeOptions: SelectOption[] = [
    {
        label: "نشط",
        value: "active",
    },
    {
        label: "موقوف",
        value: "inactive",
    },
];