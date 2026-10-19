

export interface IStaffProfile {
  id: string;
  department: string;
  designation?: string;
  qualification?: string;
  isAvailable: boolean;
  joiningDate: string;
}

export interface IStaffData {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: string;
  emailVerified: boolean;
  needPasswordChange: boolean;
  createdAt: string;
  staffProfile: IStaffProfile;
}

export interface ICreateStaffResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IStaffData;
}

export interface ICreateStaffPayload {
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
  designation: string;
  qualification: string;
}