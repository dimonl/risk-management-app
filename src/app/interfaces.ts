export interface User {
  id: string;
  name: string;
  password: string;
}


export interface Risk {
  id: string;
  userID: string;
  nameRisk: string;
  description: string;
  impactTime: number;
  probability: number;
}
