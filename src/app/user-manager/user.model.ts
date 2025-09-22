export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface UserStatistics {
  total: number;
  active: number;
  inactive: number;
}
