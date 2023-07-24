import { Customer } from "./customer.model";
import { TrainingItem } from "./training-item.model";
import { Training } from "./training.model";

export class Order {
    id : number;
    date : Date;
    trainingItems : Array<TrainingItem>;
    customer : Customer;
    amount : number;

    constructor(id:number, date : Date, trainingItems : Array<TrainingItem>, customer : Customer, amount : number) {
        this.id = id;
        this.date = date;
        this.trainingItems = trainingItems;
        this.customer = customer;
        this.amount = amount;
    }
};