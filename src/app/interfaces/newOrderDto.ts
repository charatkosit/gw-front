export interface newOrderDto {
    memberId: string;
    customer: Customer;
    car:      Car;
    order:    Order;
}

export interface Car {
    model:        string;
    brand:        string;
    year:         number;
    color:        string;
    licensePlate: string;
}

export interface Customer {
    name:    string;
    phone:   string;
    address: string;
}

export interface Order {
    sympthom:    string;
    description: string;
    km:          number;
}