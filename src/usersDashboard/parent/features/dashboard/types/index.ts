export interface Child {
  id: string;
  admissionNo: string;
  fullName: string;
  gender: "Male" | "Female";
  class: string;
}

export interface ParentDetails {
  name: string;
  gender: "Male" | "Female";
  address: string;
  email: string;
  phone: string;
}