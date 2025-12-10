export interface BranchManagerProfile {
    _id: string;
    nama: string;
    email: string;
    cabangId: {
        _id: string;
        namaCabang: string;
        kodeCabang: string;
        alamat: string;
        kontak: string;
        googleMapsLink: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ProfileResponse {
    message: string;
    branchManager: BranchManagerProfile;
}
