import { PackageStatus } from "../enums/PackageStatus";

export interface PackageDTO {
  id: string;
  name: string;
  storageId: string;
  perfumeIds: string[];
  status: PackageStatus;
}