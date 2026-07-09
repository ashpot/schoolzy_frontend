export interface Classmate {
  id: string;
  name: string;
  className: string;
  gender: "Male" | "Female";
  role: string;
  isCurrentUser?: boolean;
}