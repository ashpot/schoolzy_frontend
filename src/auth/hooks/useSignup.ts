import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/shared/lib/apiClient";
import { AUTH_ENDPOINTS } from "../api";
import type { SignupFormData } from "../schema/signupSchema";

export interface RegisterSchoolResponse {
  success: boolean;
  message: string;
  data: {
    school_name: string;
    tenant: string;
    domain: string;
    login_url: string;
  };
}

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: SignupFormData) => {
      // TODO: Confirm field mapping with backend once register-school is live
      return apiRequest<RegisterSchoolResponse>(AUTH_ENDPOINTS.REGISTER_SCHOOL, {
        method: "POST",
        skipAuth: true,
        body: JSON.stringify({
          school_name: data.schoolName,
          school_slug: data.schoolSlug,
          owner_first_name: data.first_name,
          owner_last_name: data.last_name,
          owner_email: data.email,
          owner_phone: data.phoneNumber,
          address: data.streetAddress,
          city: data.city,
          state: data.state,
          expected_student_capacity: Number(data.schoolSize),
          password: data.password,
          confirm_password: data.confirm_password,
        }),
      });
    },
  });
};