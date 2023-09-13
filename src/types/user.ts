export interface UserInfoSummary {
    id: string;
    firstName: string;
    email: string;
    age: number;
    role: 'Admin' | 'Author' | 'Subscriber' 
}

export interface Address {
    Country: string;
    State: string;
    City: string;
    PostalCode: string;
    Line1: string;
    Line2: string;
}


export interface UserInfoDetails extends UserInfoSummary {
    lastName: string;
    address: Address;
    profilePicture: string;
}

export interface UsersSummaryResponseData {
    users: UserInfoSummary[],
    totalPages: number;
}

export type Order = 'asc' | 'desc' | '';

export type SortType = 'name' | 'age';