export interface ActiveProfile {
    customerId: number;
    carId:      number;
    orderId:    number;
}

export interface GlobalProfile {
    customerId: number;
    carId:      number;
    orderId:    number;
    lp:         string;
    status:     string;
}

export interface MemberProfile{
    memberId: string;
    role: string;
}