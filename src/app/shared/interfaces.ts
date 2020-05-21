export interface User {
  id: string;
  name: string;
  password: string;
}


export class Risk {
  // id: string;
  // userID: string;
  // nameRisk: string;
  // description: string;
  // impactTime: number;
  // probability: number;

//   public setimpact(el: string){
//     this.impactTime = el;
// }
  constructor(
    public id: string,
    public userID: string,
    public nameRisk: string,
    public description: string,
    public impactTime: number,
    public probability: number) {
  }


}
