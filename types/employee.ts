export interface EmployeeBranch {
    _id: string;
    namaCabang: string;
    kodeCabang: string;
}

export interface Employee {
    _id: string;
    cabangId: EmployeeBranch;
    nama: string;
    email: string;
    telepon: string;
    alamat: string;
    gaji: number;
    tanggalMasuk: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface EmployeesResponse {
    success: boolean;
    data: Employee[];
}
