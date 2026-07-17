import type { Child, ParentDetails } from "../types";

export const mockParentDetails: ParentDetails = {
  name: "Mrs. Amber Felix",
  gender: "Female",
  address: "12 Adeola Odeku Street, Victoria Island, Lagos",
  email: "amber.92@email.com",
  phone: "+234 803 456 7890",
};

export const mockChildren: Child[] = [
  { id: "c1", admissionNo: "ADM/2024/001", fullName: "Chukwuemeka Felix", gender: "Male", class: "JSS 3A" },
  { id: "c2", admissionNo: "ADM/2024/002", fullName: "Adaeze Felix", gender: "Female", class: "Primary 5B" },
];

export const childOptions = mockChildren.map((c) => ({
  value: c.id,
  label: `${c.fullName} (${c.admissionNo})`,
}));