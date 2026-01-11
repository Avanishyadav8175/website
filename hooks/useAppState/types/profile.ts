export type CustomerDetail = {
  name: string;
  mobileNumber?: string;
  mail?: string;
  gender?: "male" | "female" | "others";
  dateOfBirth?: string | Date;
  registeredAt?: string | Date;
};
