import { Employee } from '@/types';

export const MOCK_USERS = [
  {
    email: 'admin@example.com',
    password: 'password123',
    name: 'Admin User'
  },
  {
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe'
  }
];

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    fullName: 'John Smith',
    gender: 'Male',
    dateOfBirth: '1990-05-15',
    state: 'California',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    isActive: true
  },
  {
    id: '2',
    fullName: 'Sarah Johnson',
    gender: 'Female',
    dateOfBirth: '1992-08-22',
    state: 'Texas',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    isActive: true
  },
  {
    id: '3',
    fullName: 'Mike Davis',
    gender: 'Male',
    dateOfBirth: '1988-12-10',
    state: 'New York',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    isActive: true
  },
  {
    id: '4',
    fullName: 'Emma Wilson',
    gender: 'Female',
    dateOfBirth: '1995-03-18',
    state: 'Florida',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    isActive: false
  },
  {
    id: '5',
    fullName: 'Robert Brown',
    gender: 'Male',
    dateOfBirth: '1991-07-25',
    state: 'Illinois',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    isActive: true
  },
  {
    id: '6',
    fullName: 'Lisa Anderson',
    gender: 'Female',
    dateOfBirth: '1993-11-30',
    state: 'Pennsylvania',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    isActive: true
  }
];

export const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];
