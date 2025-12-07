import { LoginUserDTO } from "../DTOs/LoginUserDTO";
import { RegistrationUserDTO } from "../DTOs/RegistrationUserDTO";
import { AuthResponseType } from "../types/AuthResponse";
import { UserDTO } from "../DTOs/UserDTO";

import { CreatePlantDto } from "../DTOs/CreatePlantDto";
import { PlantDTO } from "../DTOs/PlantDTO";

import { ProcessRequestDto } from "../DTOs/ProcessRequestDto";
import { ParfumDTO } from "../DTOs/ParfumDTO";

import { CreatePackageDto } from "../DTOs/CreatePackageDto";
import { PackageDTO } from "../DTOs/PackageDTO";

import { OrderPerfumeDto } from "../DTOs/OrderPerfumeDto";
import { ReceiptDTO } from "../DTOs/ReceiptDTO";

import { GenerateReportDto } from "../DTOs/GenerateReportDto";
import { ReportDTO } from "../DTOs/ReportDTO";

import { SimulationResultDto } from "../DTOs/SimulationResultDto";

import { AuditLogDTO } from "../DTOs/AuditLogDTO";


export interface IGatewayService {

  // AUTH
  login(data: LoginUserDTO): Promise<AuthResponseType>;
  register(data: RegistrationUserDTO): Promise<AuthResponseType>;

  // USERS
  getAllUsers(): Promise<UserDTO[]>;
  getUserById(id: number): Promise<UserDTO>;

  // PRODUCTION
  getAllPlants(): Promise<PlantDTO[]>;
  createPlant(dto: CreatePlantDto): Promise<PlantDTO>;
  adjustPlantIntensity(id: string, dto: { intensity: number }): Promise<PlantDTO>;
  harvestPlant(id: string): Promise<PlantDTO>;

  // PROCESSING
  processPlants(dto: ProcessRequestDto): Promise<ParfumDTO[]>;

  // PACKAGING
  getAllPackages(): Promise<PackageDTO[]>;
  createPackage(dto: CreatePackageDto): Promise<PackageDTO>;
  addPerfumesToPackage(packageId: string, dto: { perfumeIds: string[] }): Promise<PackageDTO>;
  sendPackageToStorage(packageId: string): Promise<PackageDTO>;

  // STORAGE
  getAllStoredPackages(): Promise<PackageDTO[]>;
  deliverPackages(dto: { packageIds: string[] }): Promise<PackageDTO[]>;

  // SALES
  orderPerfumes(dto: OrderPerfumeDto): Promise<ReceiptDTO>;
  getAllReceipts(): Promise<ReceiptDTO[]>;

  // ANALYTICS
  generateReport(dto: GenerateReportDto): Promise<ReportDTO>;
  getReports(): Promise<ReportDTO[]>;
  getTop10Perfumes(): Promise<ParfumDTO[]>;

  // PERFORMANCE
  runSimulation(dto: any): Promise<SimulationResultDto>;

  // AUDIT
  getAuditLogs(): Promise<AuditLogDTO[]>;
}
