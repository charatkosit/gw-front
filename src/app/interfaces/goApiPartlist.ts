export interface goApiPartlist {
    code:        number;
    message:     string;
    resultFound: number;
    data:        Partlist[];
}

export interface Partlist {
    id:          number;
    Brand:       string;
    ItemCode:    string;
    ItemCodeNew: string;
    ItemName:    string;
    Model:       string;
    RetailPrice: number;
}

export interface goApiPartlistNew {
    code:        number;
    message:     string;
    resultFound: number;
    data:        PartlistNew[];
}
export interface PartlistNew {
    id:          number;
    Brand:       string;
    ItemCode:    string;
    ItemCodeNew: string;
    ItemName:    string;
    Model:       string;
    RetailPrice: number;
    Qty:   number;  //onHandQty     
    Grade3D:     string;
    TimeStamp:   string;
}



export interface TablePartlist {
    Brand:       string;
    ItemCode:    string;
    ItemCodeNew: string;
    ItemName:    string;
    Model:       string;
    RetailPrice: number;
}


export interface goApiPreOrder {
    code:        number;
    message:     string;
    resultFound: number;
    data:        PreOrders[];
}
export interface PreOrders {
    id:          number;
    Brand:       string;
    ItemCode:    string;
    ItemCodeNew: string;
    ItemName:    string;
    Model:       string;
    RetailPrice: number;
    onHandQty:         number;  //onHandQty     
    Grade3D:     string;
    TimeStamp:   string;
}