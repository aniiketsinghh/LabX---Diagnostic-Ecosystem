import {
  Droplet, HeartPulse, Activity, Brain, Microscope, Baby, ShieldAlert,
  Stethoscope, FlaskConical, Pill } from
"lucide-react";










export const categories = [
{ slug: "blood-tests", title: "Blood Tests", icon: Droplet, startingPrice: 199, count: 84, tint: "from-rose-100 to-rose-50" },
{ slug: "diabetes", title: "Diabetes", icon: Activity, startingPrice: 299, count: 22, tint: "from-amber-100 to-amber-50" },
{ slug: "thyroid", title: "Thyroid", icon: FlaskConical, startingPrice: 449, count: 16, tint: "from-violet-100 to-violet-50" },
{ slug: "vitamin", title: "Vitamin Tests", icon: Pill, startingPrice: 599, count: 12, tint: "from-orange-100 to-orange-50" },
{ slug: "heart", title: "Heart Tests", icon: HeartPulse, startingPrice: 899, count: 18, tint: "from-red-100 to-red-50" },
{ slug: "kidney", title: "Kidney Tests", icon: Microscope, startingPrice: 549, count: 14, tint: "from-sky-100 to-sky-50" },
{ slug: "liver", title: "Liver Tests", icon: Stethoscope, startingPrice: 499, count: 11, tint: "from-emerald-100 to-emerald-50" },
{ slug: "pregnancy", title: "Pregnancy", icon: Baby, startingPrice: 349, count: 9, tint: "from-pink-100 to-pink-50" },
{ slug: "allergy", title: "Allergy", icon: ShieldAlert, startingPrice: 1299, count: 7, tint: "from-yellow-100 to-yellow-50" },
{ slug: "full-body", title: "Full Body Checkup", icon: Brain, startingPrice: 1499, count: 6, tint: "from-fuchsia-100 to-fuchsia-50" }];



















export const tests = [
{ id: "cbc", title: "Complete Blood Count (CBC)", category: "Blood Tests", categorySlug: "blood-tests", price: 299, mrp: 599, reportIn: "6 hrs", fasting: false, rating: 4.8, reviews: 2103, popular: true,
  description: "A CBC measures multiple components of your blood to evaluate overall health and detect infections, anemia and other disorders.",
  parameters: ["Hemoglobin", "RBC count", "WBC count", "Platelets", "Hematocrit", "MCV / MCH / MCHC"],
  benefits: ["Detects infections early", "Screens for anemia", "Monitors overall health"] },
{ id: "hba1c", title: "HbA1c — Diabetes", category: "Diabetes", categorySlug: "diabetes", price: 449, mrp: 799, reportIn: "8 hrs", fasting: false, rating: 4.9, reviews: 1841, popular: true,
  description: "Reflects your average blood glucose over the last 2–3 months. Essential for diabetes screening and management.",
  parameters: ["Glycated hemoglobin (%)", "Estimated Average Glucose"],
  benefits: ["Long-term sugar control", "No fasting needed", "Diabetes risk profile"] },
{ id: "thyroid", title: "Thyroid Profile Total (T3, T4, TSH)", category: "Thyroid", categorySlug: "thyroid", price: 499, mrp: 999, reportIn: "10 hrs", fasting: false, rating: 4.7, reviews: 1502, popular: true,
  description: "Comprehensive thyroid function panel to evaluate hyperthyroidism or hypothyroidism.",
  parameters: ["T3", "T4", "TSH"],
  benefits: ["Energy & weight insights", "Hormone balance", "Recommended yearly"] },
{ id: "vitd", title: "Vitamin D (25-OH)", category: "Vitamin Tests", categorySlug: "vitamin", price: 699, mrp: 1399, reportIn: "24 hrs", fasting: false, rating: 4.8, reviews: 980, popular: true,
  description: "Measures Vitamin D levels — crucial for bone health, immunity, and mood regulation.",
  parameters: ["25-Hydroxyvitamin D"],
  benefits: ["Bone & joint health", "Immunity boost", "Mood support"] },
{ id: "lipid", title: "Lipid Profile", category: "Heart Tests", categorySlug: "heart", price: 549, mrp: 999, reportIn: "8 hrs", fasting: true, rating: 4.8, reviews: 1320,
  description: "Evaluates risk of cardiovascular disease by measuring cholesterol and triglycerides.",
  parameters: ["Total Cholesterol", "HDL", "LDL", "VLDL", "Triglycerides"],
  benefits: ["Heart risk insights", "Tracks cholesterol", "Lifestyle guidance"] },
{ id: "kft", title: "Kidney Function Test (KFT)", category: "Kidney Tests", categorySlug: "kidney", price: 599, mrp: 1099, reportIn: "10 hrs", fasting: false, rating: 4.7, reviews: 712,
  description: "Assesses kidney health by measuring urea, creatinine, and electrolytes.",
  parameters: ["Urea", "Creatinine", "Uric Acid", "Sodium", "Potassium", "Chloride"],
  benefits: ["Early kidney issues", "Electrolyte balance", "Hydration insights"] },
{ id: "lft", title: "Liver Function Test (LFT)", category: "Liver Tests", categorySlug: "liver", price: 549, mrp: 999, reportIn: "8 hrs", fasting: false, rating: 4.7, reviews: 654,
  description: "Comprehensive panel to evaluate liver health and detect damage.",
  parameters: ["SGPT/ALT", "SGOT/AST", "Bilirubin", "Albumin", "Globulin", "ALP"],
  benefits: ["Liver health screen", "Detects fatty liver", "Tracks function"] },
{ id: "full-body", title: "Full Body Checkup — Advanced", category: "Full Body Checkup", categorySlug: "full-body", price: 1799, mrp: 3499, reportIn: "24 hrs", fasting: true, rating: 4.9, reviews: 4210, popular: true,
  description: "85+ tests covering heart, kidney, liver, thyroid, diabetes, vitamins and minerals.",
  parameters: ["CBC", "Lipid", "KFT", "LFT", "Thyroid", "HbA1c", "Vit D", "Vit B12", "Iron Studies"],
  benefits: ["Whole body insights", "Best value", "Annual checkup"] },
{ id: "vitb12", title: "Vitamin B12", category: "Vitamin Tests", categorySlug: "vitamin", price: 549, mrp: 999, reportIn: "12 hrs", fasting: false, rating: 4.6, reviews: 420,
  description: "Measures B12 — vital for nerve and red blood cell function.",
  parameters: ["Vitamin B12"], benefits: ["Energy levels", "Nerve health", "Memory support"] },
{ id: "preg", title: "Beta hCG — Pregnancy", category: "Pregnancy", categorySlug: "pregnancy", price: 399, mrp: 699, reportIn: "6 hrs", fasting: false, rating: 4.8, reviews: 312,
  description: "Quantitative beta hCG to confirm pregnancy and monitor early progress.",
  parameters: ["Beta hCG (quantitative)"], benefits: ["Early detection", "Highly accurate", "Tracks progression"] },
{ id: "allergy", title: "Allergy Panel — Comprehensive", category: "Allergy", categorySlug: "allergy", price: 2499, mrp: 4499, reportIn: "48 hrs", fasting: false, rating: 4.7, reviews: 198,
  description: "Screens for common food, dust, pollen and pet allergies.",
  parameters: ["IgE total", "36 common allergens"], benefits: ["Identify triggers", "Plan diet", "Lifestyle control"] },
{ id: "iron", title: "Iron Studies", category: "Blood Tests", categorySlug: "blood-tests", price: 649, mrp: 1199, reportIn: "10 hrs", fasting: true, rating: 4.6, reviews: 290,
  description: "Evaluates iron stores in the body — useful for anemia and fatigue workup.",
  parameters: ["Serum Iron", "TIBC", "Ferritin", "Transferrin saturation"], benefits: ["Anemia workup", "Energy levels", "Iron deficiency"] }];





export const statusFlow = [
{ key: "pending", label: "Booked" },
{ key: "accepted", label: "Accepted" },
{ key: "assigned", label: "Technician Assigned" },
{ key: "collected", label: "Sample Collected" },
{ key: "testing", label: "Testing in Lab" },
{ key: "uploaded", label: "Report Uploaded" },
{ key: "completed", label: "Completed" }];













export const mockOrders = [
{ id: "LBX-10241", date: "2026-05-14", patient: "Aarav Sharma", slot: "Tomorrow • 8–10 AM", status: "uploaded", technician: "Rakesh K.",
  items: [{ id: "full-body", title: "Full Body Checkup — Advanced", price: 1799, qty: 1 }], total: 1799 },
{ id: "LBX-10238", date: "2026-05-12", patient: "Aarav Sharma", slot: "Today • 7–9 AM", status: "testing", technician: "Priya S.",
  items: [{ id: "thyroid", title: "Thyroid Profile Total", price: 499, qty: 1 }, { id: "vitd", title: "Vitamin D", price: 699, qty: 1 }], total: 1198 },
{ id: "LBX-10233", date: "2026-05-09", patient: "Aarav Sharma", slot: "May 09 • 6–8 AM", status: "completed", technician: "Vinay R.",
  items: [{ id: "cbc", title: "Complete Blood Count", price: 299, qty: 1 }], total: 299 },
{ id: "LBX-10229", date: "2026-05-05", patient: "Aarav Sharma", slot: "May 05 • 9–11 AM", status: "assigned", technician: "Rakesh K.",
  items: [{ id: "lipid", title: "Lipid Profile", price: 549, qty: 1 }], total: 549 }];


export const mockReports = [
{ id: "RPT-9912", orderId: "LBX-10241", title: "Full Body Checkup — Advanced", uploaded: "2026-05-15", size: "1.2 MB" },
{ id: "RPT-9908", orderId: "LBX-10233", title: "Complete Blood Count", uploaded: "2026-05-10", size: "320 KB" },
{ id: "RPT-9901", orderId: "LBX-10210", title: "Vitamin D", uploaded: "2026-04-28", size: "280 KB" }];