export function generateUsername(firstName: string, lastName: string): string {
  if (!firstName || !lastName) return "";
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}`.replace(/\s+/g, "");
}