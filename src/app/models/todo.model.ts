export class Todo {
  isCompleted!: boolean;
  constructor(
    public id:number,
    public content:string,
    public isDeleted:boolean = false
  ){
  }
}
