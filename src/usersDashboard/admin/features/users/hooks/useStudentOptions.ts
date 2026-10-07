import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import type { UserResponse, ClassGroupListItem } from "../types";
import type { AssignedChild } from "../schemas";
import { USERS_ENDPOINTS } from "../api";
import { toStudent } from "../utils/userMappers";

export interface StudentOption extends AssignedChild {
  admissionNumber: string;
}

const FIVE_MINUTES = 5 * 60 * 1000;

/**
 * Background-loads every student so a parent can be linked to children.
 * - ?role= is broken server-side, so we fetch /users/ and filter client-side.
 * - Key starts with ["users", "students"], so createUserMutation("Student", "students")
 *   invalidates it automatically when a new student is added.
 */
export const useStudentOptions = () =>
  useQuery({
    queryKey: ["users", "students", "options"],
    staleTime: FIVE_MINUTES,
    queryFn: async (): Promise<StudentOption[]> => {
      const [users, classGroups] = await Promise.all([
        apiRequest<UserResponse[]>(USERS_ENDPOINTS.LIST_ALL),
        apiRequest<ClassGroupListItem[]>(USERS_ENDPOINTS.LIST_CLASS_GROUPS),
      ]);

      return users
        .filter((u) => u.role === "Student")
        .map((u) => {
          const s = toStudent(u, classGroups);
          return {
            id: s.id, // string in form state, converted to Number at submit
            name: `${s.firstName} ${s.lastName}`,
            classLabel: s.classLabel,
            admissionNumber: s.admission_number,
          };
        });
    },
  });