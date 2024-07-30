export interface CustomerData {
    id:       number;
    name:     string;
    phone:    string;
    address:  string;
    memberId: string;
    cars:     Car[];
}

export interface Car {
    id:           number;
    licensePlate: string;
}