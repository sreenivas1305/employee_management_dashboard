export interface Employee {
  id: string;
  fullName: string;
  emp_no:number;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  state: string;
  profileImage: string;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  name: string;
}
