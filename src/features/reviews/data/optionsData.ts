type Option = {
    label: string;
    value: string;
};

export const statusOptions: Option[] = [
    {
        label: "نشط",
        value: "active"
    },
    {
        label: "مخفي",
        value: "inactive"
    },
    {
        label: "تحت المراجعة",
        value: "pending"
    },
    {
        label: "معلق",
        value: "suspended"
    },
    {
        label: "محذوف",
        value: "deleted"
    },
]