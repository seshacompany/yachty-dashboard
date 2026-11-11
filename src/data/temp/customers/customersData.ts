import type { CustomerDetails } from "@/features/customers/types";

export const customers: CustomerDetails[] = [
    {
        id: "cus_001",
        fullName: "Ahmed Mohamed",
        governorate: "Sohag",
        gender: "male",
        category: "student",
        email: "ahmed@example.com",
        phone: "01012345678",
        status: "active",

        studentInformation: {
            university: "Sohag University",
            faculty: "Faculty of Computers and Information",
            academicYear: "Fourth Year",
        },

        graduateInformation: null,

        employeeNotes: [
            {
                note: "عميل ملتزم",
                createdAt: "2026-06-14T10:00:00.000Z",
            },
            {
                note: "مرشح لوظيفة جديدة",
                createdAt: "2026-06-18T12:00:00.000Z",
            },
        ],

        createdAt: "2026-06-14T10:00:00.000Z",
        updatedAt: "2026-06-20T12:30:00.000Z",
    },

    {
        id: "cus_002",
        fullName: "Sara Ali",
        governorate: "Cairo",
        gender: "female",
        category: "student",
        email: "sara@example.com",
        phone: "01123456789",
        status: "inactive",

        studentInformation: {
            university: "Cairo University",
            faculty: "Faculty of Commerce",
            academicYear: "Second Year",
        },

        graduateInformation: null,

        employeeNotes: [
            {
                note: "تم الحظر بسبب مخالفة الشروط",
                createdAt: "2026-06-16T09:00:00.000Z",
            },
        ],

        createdAt: "2026-06-16T09:00:00.000Z",
        updatedAt: "2026-06-22T11:00:00.000Z",
    },

    {
        id: "cus_003",
        fullName: "Mohamed Hassan",
        governorate: "Giza",
        gender: "male",
        category: "graduate",
        email: "mohamed@example.com",
        phone: "01234567890",
        status: "active",

        studentInformation: null,

        graduateInformation: {
            jobTitle: "Frontend Developer",
            educationLevel: "Bachelor Degree",
        },

        employeeNotes: [
            {
                note: "مرشح لوظيفة جديدة",
                createdAt: "2026-06-18T12:00:00.000Z",
            },
        ],

        createdAt: "2026-06-18T12:00:00.000Z",
        updatedAt: "2026-06-23T15:00:00.000Z",
    },

    {
        id: "cus_004",
        fullName: "Mona Adel",
        governorate: "Alexandria",
        gender: "female",
        category: "graduate",
        email: "mona@example.com",
        phone: "01512345678",
        status: "inactive",

        studentInformation: null,

        graduateInformation: {
            jobTitle: "UI/UX Designer",
            educationLevel: "Bachelor Degree",
        },

        employeeNotes: [
            {
                note: "تم إيقاف الحساب مؤقتًا",
                createdAt: "2026-06-19T08:30:00.000Z",
            },
        ],

        createdAt: "2026-06-19T08:30:00.000Z",
        updatedAt: "2026-06-24T10:15:00.000Z",
    },
];