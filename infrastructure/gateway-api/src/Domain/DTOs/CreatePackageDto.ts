import { PackageStatus } from "../enums/PackageStatus";

export interface CreatePackageDto {
  name: string;
  storageId: string;
  perfumeIds: string[];
  status?: PackageStatus; 
}