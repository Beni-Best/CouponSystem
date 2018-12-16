export class Coupon {
    constructor(public id?:number, public title?:string, public start_Date?:Date, public end_Date?:Date, public amount?:number, public type?:string,
        public message?:string, public price?:number, public image?:string){}
}