import { apiClient } from "./apiClient";

interface sendEnquiryParams {
  aid: string;
  enquiry: any; // Consider replacing 'any' with a more specific type
}

export const sendEnquiry = async ({ aid, enquiry }: sendEnquiryParams) => {
  const response = await apiClient.post(
    `/v1/landing/${aid}/new/inquiry/query`,
    enquiry
  );
  return response.data;
};
