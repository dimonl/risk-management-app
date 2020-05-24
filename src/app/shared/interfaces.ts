export interface User {
  id: string;
  name: string;
  password: string;
}


export class Risk {
  constructor(
    public id: string,
    public userID: string,
    public nameRisk: string,
    public description: string,
    public impactTime: number,
    public probability: number) {
  }
}
