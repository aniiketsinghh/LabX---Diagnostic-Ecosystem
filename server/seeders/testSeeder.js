const mongoose = require("mongoose");
require("dotenv").config();

const Test = require("../models/Test");

const tests = [
  {
    title: "Complete Blood Count (CBC)",
    category: "Blood Tests",
    description: "Measures overall blood health and detects disorders.",
    price: 499,
    fastingRequired: false,
    reportTime: "24 hours",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
  },
  {
    title: "ESR Test",
    category: "Blood Tests",
    description: "Checks inflammation levels in the body.",
    price: 299,
    fastingRequired: false,
    reportTime: "12 hours",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  },
  {
    title: "Platelet Count Test",
    category: "Blood Tests",
    description: "Measures platelet levels in blood.",
    price: 399,
    fastingRequired: false,
    reportTime: "18 hours",
    image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322",
  },

  {
    title: "HbA1c Test",
    category: "Diabetes",
    description: "Checks average blood sugar levels.",
    price: 799,
    fastingRequired: false,
    reportTime: "24 hours",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
  },
  {
    title: "Fasting Blood Sugar",
    category: "Diabetes",
    description: "Measures fasting glucose level.",
    price: 199,
    fastingRequired: true,
    reportTime: "6 hours",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
  },
  {
    title: "Post Prandial Sugar Test",
    category: "Diabetes",
    description: "Checks sugar after meals.",
    price: 249,
    fastingRequired: false,
    reportTime: "8 hours",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
  },

  {
    title: "Thyroid Profile (T3 T4 TSH)",
    category: "Thyroid",
    description: "Comprehensive thyroid function test.",
    price: 899,
    fastingRequired: false,
    reportTime: "24 hours",
    image: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df",
  },
  {
    title: "TSH Test",
    category: "Thyroid",
    description: "Checks thyroid stimulating hormone.",
    price: 399,
    fastingRequired: false,
    reportTime: "12 hours",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  },

  {
    title: "Vitamin D Test",
    category: "Vitamin Tests",
    description: "Checks Vitamin D deficiency.",
    price: 1299,
    fastingRequired: false,
    reportTime: "48 hours",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514",
  },
  {
    title: "Vitamin B12 Test",
    category: "Vitamin Tests",
    description: "Measures Vitamin B12 levels.",
    price: 999,
    fastingRequired: false,
    reportTime: "24 hours",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
  },

  {
    title: "Lipid Profile",
    category: "Heart Tests",
    description: "Measures cholesterol and triglycerides.",
    price: 699,
    fastingRequired: true,
    reportTime: "24 hours",
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6",
  },
  {
    title: "ECG Test",
    category: "Heart Tests",
    description: "Records electrical activity of heart.",
    price: 599,
    fastingRequired: false,
    reportTime: "2 hours",
    image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe",
  },

  {
    title: "Kidney Function Test",
    category: "Kidney Tests",
    description: "Checks kidney performance.",
    price: 899,
    fastingRequired: false,
    reportTime: "24 hours",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
  },
  {
    title: "Creatinine Test",
    category: "Kidney Tests",
    description: "Measures creatinine level in blood.",
    price: 349,
    fastingRequired: false,
    reportTime: "10 hours",
    image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322",
  },

  {
    title: "Liver Function Test",
    category: "Liver Tests",
    description: "Evaluates liver health.",
    price: 799,
    fastingRequired: true,
    reportTime: "24 hours",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
  },
  {
    title: "Bilirubin Test",
    category: "Liver Tests",
    description: "Measures bilirubin in blood.",
    price: 299,
    fastingRequired: false,
    reportTime: "8 hours",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
  },

  {
    title: "Pregnancy Test",
    category: "Pregnancy",
    description: "Detects pregnancy hormone hCG.",
    price: 499,
    fastingRequired: false,
    reportTime: "4 hours",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514",
  },
  {
    title: "Beta hCG Test",
    category: "Pregnancy",
    description: "Measures exact hCG level.",
    price: 899,
    fastingRequired: false,
    reportTime: "12 hours",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  },

  {
    title: "Allergy Panel Test",
    category: "Allergy",
    description: "Checks common allergies.",
    price: 1499,
    fastingRequired: false,
    reportTime: "48 hours",
    image: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df",
  },
  {
    title: "Dust Allergy Test",
    category: "Allergy",
    description: "Detects dust allergy reactions.",
    price: 799,
    fastingRequired: false,
    reportTime: "24 hours",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
  },

  {
    title: "Basic Full Body Checkup",
    category: "Full Body Checkup",
    description: "General health screening package.",
    price: 1999,
    fastingRequired: true,
    reportTime: "48 hours",
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6",
  },
  {
    title: "Advanced Full Body Checkup",
    category: "Full Body Checkup",
    description: "Comprehensive health package.",
    price: 2999,
    fastingRequired: true,
    reportTime: "72 hours",
    image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe",
  },
];

const seedTests = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Test.deleteMany();

    await Test.insertMany(tests);

    console.log("✅ Tests Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Seeder Error:", error);
    process.exit(1);
  }
};

seedTests();