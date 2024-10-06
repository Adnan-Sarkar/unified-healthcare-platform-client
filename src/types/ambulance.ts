export type TAmbulance = {
    id?: string;
    ambulanceCategoryId: string;
    categoryName?: string;
    ownerName: string;
    area: string;
    location: string;
    district: string;
    pricePerKm: number;
    contactNumber: string;
};

export type TAmbulanceCategory = {
    id?: string;
    categoryName: string;
};
