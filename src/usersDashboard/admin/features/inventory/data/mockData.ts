import type { ItemType, InventoryItem, SaleRecord } from "../types";

export const mockItemTypes: ItemType[] = [
  { id: "1",  name: "Stationery",    description: "Writing materials, paper, markers, and general office supplies used in classrooms and offices.",                      createdAt: "2025-09-01" },
  { id: "2",  name: "Furniture",     description: "Desks, chairs, cabinets, shelves, and other fixed or movable furnishings across the school.",                          createdAt: "2025-09-01" },
  { id: "3",  name: "Electronics",   description: "Projectors, computers, printers, and other electronic devices used for teaching and administration.",                   createdAt: "2025-09-01" },
  { id: "4",  name: "Cleaning",      description: "Detergents, mops, brooms, and sanitation products used to maintain hygiene on the premises.",                          createdAt: "2025-09-01" },
  { id: "5",  name: "Sports",        description: "Balls, cones, nets, uniforms, and equipment used during physical education and inter-house events.",                   createdAt: "2025-09-01" },
  { id: "6",  name: "Lab Equipment", description: "Microscopes, beakers, Bunsen burners, and other apparatus used in science laboratories.",                              createdAt: "2025-09-01" },
  { id: "7",  name: "Books",         description: "Textbooks, exercise books, reference materials, and library publications for students and staff.",                      createdAt: "2025-09-01" },
  { id: "8",  name: "Uniform",       description: "School shirts, trousers, skirts, ties, and branded apparel issued to students and support staff.",                     createdAt: "2025-09-01" },
  { id: "9",  name: "Kitchen",       description: "Cooking gas, utensils, and consumables for school kitchen and canteen operations.",                                     createdAt: "2025-09-01" },
  { id: "10", name: "Medical",       description: "First aid kits, medicines, and basic medical supplies kept in the school clinic for emergencies.",                     createdAt: "2025-09-01" },
  { id: "11", name: "Tools",         description: "Hammers, screwdrivers, measuring tapes, and equipment used by the maintenance team for repairs.",                      createdAt: "2025-09-01" },
];

export const mockInventoryItems: InventoryItem[] = [
  { id: "1",  name: "A4 Printing Paper (500-sheet ream)",      typeId: "1",  typeName: "Stationery",    quantity: 42, unitPrice: 4500,   addedAt: "2025-09-10" },
  { id: "2",  name: "Student Desk & Chair Set",                typeId: "2",  typeName: "Furniture",     quantity: 18, unitPrice: 22000,  addedAt: "2025-09-10" },
  { id: "3",  name: "Ceiling Projector — Epson EX3280",        typeId: "3",  typeName: "Electronics",   quantity: 4,  unitPrice: 185000, addedAt: "2025-09-10" },
  { id: "4",  name: "Liquid Floor Cleaner (5L)",               typeId: "4",  typeName: "Cleaning",      quantity: 12, unitPrice: 3800,   addedAt: "2025-09-10" },
  { id: "5",  name: "Football (size 5)",                       typeId: "5",  typeName: "Sports",        quantity: 7,  unitPrice: 8500,   addedAt: "2025-09-10" },
  { id: "6",  name: "Bunsen Burner",                           typeId: "6",  typeName: "Lab Equipment", quantity: 3,  unitPrice: 14000,  addedAt: "2025-09-10" },
  { id: "7",  name: "English Language Textbook (JSS1)",        typeId: "7",  typeName: "Books",         quantity: 60, unitPrice: 2200,   addedAt: "2025-09-10" },
  { id: "8",  name: "School Uniform Shirt (M)",                typeId: "8",  typeName: "Uniform",       quantity: 25, unitPrice: 3500,   addedAt: "2025-09-10" },
  { id: "9",  name: "Cooking Gas Cylinder (12.5 kg)",          typeId: "9",  typeName: "Kitchen",       quantity: 2,  unitPrice: 18000,  addedAt: "2025-09-11" },
  { id: "10", name: "First-Aid Kit (Standard)",                typeId: "10", typeName: "Medical",       quantity: 5,  unitPrice: 11500,  addedAt: "2025-09-11" },
  { id: "11", name: "Hammer & Nail Set",                       typeId: "11", typeName: "Tools",         quantity: 8,  unitPrice: 4200,   addedAt: "2025-09-11" },
  { id: "12", name: "Whiteboard Marker Set (4 colours)",       typeId: "1",  typeName: "Stationery",    quantity: 30, unitPrice: 950,    addedAt: "2025-09-11" },
  { id: "13", name: "Steel Filing Cabinet (4-drawer)",         typeId: "2",  typeName: "Furniture",     quantity: 2,  unitPrice: 65000,  addedAt: "2025-09-11" },
  { id: "14", name: "Laptop — Lenovo IdeaPad 3",               typeId: "3",  typeName: "Electronics",   quantity: 6,  unitPrice: 420000, addedAt: "2025-09-12" },
  { id: "15", name: "Microscope (Binocular 40×–1000×)",        typeId: "6",  typeName: "Lab Equipment", quantity: 4,  unitPrice: 65000,  addedAt: "2025-09-12" },
];

const today = new Date().toISOString().split("T")[0];
const d = (offset: number) => {
  const dt = new Date();
  dt.setDate(dt.getDate() - offset);
  return dt.toISOString().split("T")[0];
};

export const mockSales: SaleRecord[] = [
  { id: "1",  itemId: "7",  itemName: "English Language Textbook (JSS1)",   typeName: "Books",       quantity: 5,  amount: 11000, date: today   },
  { id: "2",  itemId: "12", itemName: "Whiteboard Marker Set (4 colours)",  typeName: "Stationery",  quantity: 10, amount: 9500,  date: today   },
  { id: "3",  itemId: "8",  itemName: "School Uniform Shirt (M)",           typeName: "Uniform",     quantity: 3,  amount: 10500, date: d(1)    },
  { id: "4",  itemId: "1",  itemName: "A4 Printing Paper (500 sheets ream)",typeName: "Stationery",  quantity: 2,  amount: 9000,  date: d(2)    },
  { id: "5",  itemId: "5",  itemName: "Football (size 5)",                  typeName: "Sports",      quantity: 2,  amount: 17000, date: d(3)    },
  { id: "6",  itemId: "10", itemName: "First-Aid Kit (Standard)",           typeName: "Medical",     quantity: 1,  amount: 11500, date: d(4)    },
  { id: "7",  itemId: "4",  itemName: "Liquid Floor Cleaner (5L)",          typeName: "Cleaning",    quantity: 4,  amount: 15200, date: d(5)    },
  { id: "8",  itemId: "11", itemName: "Hammer & Nail Set",                  typeName: "Tools",       quantity: 1,  amount: 4200,  date: d(6)    },
  { id: "9",  itemId: "3",  itemName: "Ceiling Projector — Epson EX3280",   typeName: "Electronics", quantity: 1,  amount: 185000,date: d(10)   },
  { id: "10", itemId: "14", itemName: "Laptop — Lenovo IdeaPad 3",          typeName: "Electronics", quantity: 1,  amount: 420000,date: d(15)   },
];

// Report chart data
export const weeklyMovementData = [
  { week: "Wk 1", units: 26 },
  { week: "Wk 2", units: 20 },
  { week: "Wk 3", units: 13 },
  { week: "Wk 4", units: 15 },
];

export const weeklyRevenueData = [
  { week: "Wk 1", revenue: 0       },
  { week: "Wk 2", revenue: 512700  },
  { week: "Wk 3", revenue: 380000  },
  { week: "Wk 4", revenue: 20000   },
];

// Report breakdown — per-item sold totals
export interface ReportRow {
  id: string;
  name: string;
  typeName: string;
  qtyAvailable: number;
  qtySold: number;
  revenue: number;
  isLow: boolean;
}

export const mockReportRows: ReportRow[] = [
  { id: "1",  name: "A4 Printing Paper (500-sheet ream)",    typeName: "Stationery",    qtyAvailable: 42, qtySold: 5,  revenue: 22500,  isLow: false },
  { id: "2",  name: "Student Desk & Chair Set",              typeName: "Furniture",     qtyAvailable: 18, qtySold: 2,  revenue: 44000,  isLow: false },
  { id: "3",  name: "Ceiling Projector — Epson EX3280",      typeName: "Electronics",   qtyAvailable: 4,  qtySold: 1,  revenue: 185000, isLow: true  },
  { id: "4",  name: "Liquid Floor Cleaner (5L)",             typeName: "Cleaning",      qtyAvailable: 12, qtySold: 6,  revenue: 22800,  isLow: false },
  { id: "5",  name: "Football (size 5)",                     typeName: "Sports",        qtyAvailable: 7,  qtySold: 3,  revenue: 25500,  isLow: false },
  { id: "6",  name: "Bunsen Burner",                         typeName: "Lab Equipment", qtyAvailable: 3,  qtySold: 0,  revenue: 0,      isLow: true  },
  { id: "7",  name: "English Language Textbook (JSS1)",      typeName: "Books",         qtyAvailable: 60, qtySold: 25, revenue: 55000,  isLow: false },
  { id: "8",  name: "School Uniform Shirt (M)",              typeName: "Uniform",       qtyAvailable: 25, qtySold: 12, revenue: 42000,  isLow: false },
  { id: "9",  name: "Cooking Gas Cylinder (12.5 kg)",        typeName: "Kitchen",       qtyAvailable: 2,  qtySold: 0,  revenue: 0,      isLow: true  },
  { id: "10", name: "First-Aid Kit (Standard)",              typeName: "Medical",       qtyAvailable: 5,  qtySold: 1,  revenue: 11500,  isLow: false },
  { id: "11", name: "Hammer & Nail Set",                     typeName: "Tools",         qtyAvailable: 8,  qtySold: 1,  revenue: 4200,   isLow: false },
  { id: "12", name: "Whiteboard Marker Set (4 colours)",     typeName: "Stationery",    qtyAvailable: 30, qtySold: 16, revenue: 15200,  isLow: false },
  { id: "13", name: "Steel Filing Cabinet (4-drawer)",       typeName: "Furniture",     qtyAvailable: 2,  qtySold: 0,  revenue: 0,      isLow: true  },
  { id: "14", name: "Laptop — Lenovo IdeaPad 3",             typeName: "Electronics",   qtyAvailable: 6,  qtySold: 1,  revenue: 420000, isLow: false },
  { id: "15", name: "Microscope (Binocular 40×–1000×)",      typeName: "Lab Equipment", qtyAvailable: 4,  qtySold: 1,  revenue: 65000,  isLow: true  },
];

export const TYPE_COLORS: Record<string, string> = {
  Stationery:     "bg-blue-50 text-blue-600 border-blue-100",
  Furniture:      "bg-purple-50 text-purple-600 border-purple-100",
  Electronics:    "bg-green-50 text-green-700 border-green-100",
  Cleaning:       "bg-yellow-50 text-yellow-700 border-yellow-100",
  Sports:         "bg-orange-50 text-orange-600 border-orange-100",
  "Lab Equipment":"bg-cyan-50 text-cyan-700 border-cyan-100",
  Books:          "bg-emerald-50 text-emerald-700 border-emerald-100",
  Uniform:        "bg-pink-50 text-pink-600 border-pink-100",
  Kitchen:        "bg-lime-50 text-lime-700 border-lime-100",
  Medical:        "bg-red-50 text-red-600 border-red-100",
  Tools:          "bg-amber-50 text-amber-700 border-amber-100",
};


export const timeRangeOptions = [
  { label: "This Month (Last 30 days)", value: "month" },
  { label: "This Week",                 value: "week"  },
  { label: "Last 3 Months",            value: "3month"},
  { label: "This Term",                 value: "term"  },
];