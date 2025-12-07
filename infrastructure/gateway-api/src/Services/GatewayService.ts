import axios, { AxiosInstance } from "axios";
import { IGatewayService } from "../Domain/services/IGatewayService";

import { LoginUserDTO } from "../Domain/DTOs/LoginUserDTO";
import { RegistrationUserDTO } from "../Domain/DTOs/RegistrationUserDTO";
import { AuthResponseType } from "../Domain/types/AuthResponse";

import { UserDTO } from "../Domain/DTOs/UserDTO";

import { CreatePlantDto } from "../Domain/DTOs/CreatePlantDto";
import { PlantDTO } from "../Domain/DTOs/PlantDTO";

import { ProcessRequestDto } from "../Domain/DTOs/ProcessRequestDto";
import { ParfumDTO } from "../Domain/DTOs/ParfumDTO";

import { CreatePackageDto } from "../Domain/DTOs/CreatePackageDto";
import { PackageDTO } from "../Domain/DTOs/PackageDTO";

import { OrderPerfumeDto } from "../Domain/DTOs/OrderPerfumeDto";
import { ReceiptDTO } from "../Domain/DTOs/ReceiptDTO";

import { GenerateReportDto } from "../Domain/DTOs/GenerateReportDto";
import { ReportDTO } from "../Domain/DTOs/ReportDTO";

import { SimulationResultDto } from "../Domain/DTOs/SimulationResultDto";

import { AuditLogDTO } from "../Domain/DTOs/AuditLogDTO";



export class GatewayService implements IGatewayService {

  private readonly authClient: AxiosInstance;
  private readonly userClient: AxiosInstance;
  private readonly productionClient: AxiosInstance;
  private readonly processingClient: AxiosInstance;
  private readonly packagingClient: AxiosInstance;
  private readonly storageClient: AxiosInstance;
  private readonly salesClient: AxiosInstance;
  private readonly analyticsClient: AxiosInstance;
  private readonly performanceClient: AxiosInstance;
  private readonly auditClient: AxiosInstance;

  constructor() {
    this.authClient = axios.create({
      baseURL: process.env.AUTH_SERVICE_API,
      headers: { "Content-Type": "application/json" }
    });

    this.userClient = axios.create({
      baseURL: process.env.USER_SERVICE_API,
      headers: { "Content-Type": "application/json" }
    });

    this.productionClient = axios.create({
      baseURL: process.env.PRODUCTION_SERVICE_API,
      headers: { "Content-Type": "application/json" }
    });

    this.processingClient = axios.create({
      baseURL: process.env.PROCESSING_SERVICE_API,
      headers: { "Content-Type": "application/json" }
    });

    this.packagingClient = axios.create({
      baseURL: process.env.PACKAGING_SERVICE_API,
      headers: { "Content-Type": "application/json" }
    });

    this.storageClient = axios.create({
      baseURL: process.env.STORAGE_SERVICE_API,
      headers: { "Content-Type": "application/json" }
    });

    this.salesClient = axios.create({
      baseURL: process.env.SALES_SERVICE_API,
      headers: { "Content-Type": "application/json" }
    });

    this.analyticsClient = axios.create({
      baseURL: process.env.ANALYTICS_SERVICE_API,
      headers: { "Content-Type": "application/json" }
    });

    this.performanceClient = axios.create({
      baseURL: process.env.PERFORMANCE_SERVICE_API,
      headers: { "Content-Type": "application/json" }
    });

    this.auditClient = axios.create({
      baseURL: process.env.AUDIT_SERVICE_API,
      headers: { "Content-Type": "application/json" }
    });
  }


  // AUTH
  async login(data: LoginUserDTO): Promise<AuthResponseType> {
    try {
      const response = await this.authClient.post<AuthResponseType>("/auth/login", data);
      return response.data;
    } catch {
      return { authenificated: false };
    }
  }

  async register(data: RegistrationUserDTO): Promise<AuthResponseType> {
    try {
      const response = await this.authClient.post<AuthResponseType>("/auth/register", data);
      return response.data;
    } catch {
      return { authenificated: false };
    }
  }

  // USERS
  async getAllUsers(): Promise<UserDTO[]> {
    return (await this.userClient.get<UserDTO[]>("/users")).data;
  }

  async getUserById(id: number): Promise<UserDTO> {
    return (await this.userClient.get<UserDTO>(`/users/${id}`)).data;
  }


  // PRODUCTION
  async getAllPlants(): Promise<PlantDTO[]> {
    return (await this.productionClient.get<PlantDTO[]>("/plants")).data;
  }

  async createPlant(dto: CreatePlantDto): Promise<PlantDTO> {
    return (await this.productionClient.post<PlantDTO>("/plants", dto)).data;
  }

  async adjustPlantIntensity(id: string, dto: { intensity: number }): Promise<PlantDTO> {
    return (await this.productionClient.put<PlantDTO>(`/plants/${id}/intensity`, dto)).data;
  }

  async harvestPlant(id: string): Promise<PlantDTO> {
    return (await this.productionClient.post<PlantDTO>(`/plants/${id}/harvest`)).data;
  }


  // PROCESSING
  async processPlants(dto: ProcessRequestDto): Promise<ParfumDTO[]> {
    return (await this.processingClient.post<ParfumDTO[]>("/process", dto)).data;
  }


  // PACKAGING
  async getAllPackages(): Promise<PackageDTO[]> {
    return (await this.packagingClient.get<PackageDTO[]>("/packages")).data;
  }

  async createPackage(dto: CreatePackageDto): Promise<PackageDTO> {
    return (await this.packagingClient.post<PackageDTO>("/packages", dto)).data;
  }

  async addPerfumesToPackage(packageId: string, dto: { perfumeIds: string[] }): Promise<PackageDTO> {
    return (await this.packagingClient.post<PackageDTO>(`/packages/${packageId}/add`, dto)).data;
  }

  async sendPackageToStorage(packageId: string): Promise<PackageDTO> {
    return (await this.packagingClient.post<PackageDTO>(`/packages/${packageId}/send`)).data;
  }


  // STORAGE
  async getAllStoredPackages(): Promise<PackageDTO[]> {
    return (await this.storageClient.get<PackageDTO[]>("/packages")).data;
  }

  async deliverPackages(dto: { packageIds: string[] }): Promise<PackageDTO[]> {
    return (await this.storageClient.post<PackageDTO[]>("/deliver", dto)).data;
  }


  // SALES
  async orderPerfumes(dto: OrderPerfumeDto): Promise<ReceiptDTO> {
    return (await this.salesClient.post<ReceiptDTO>("/order", dto)).data;
  }

  async getAllReceipts(): Promise<ReceiptDTO[]> {
    return (await this.salesClient.get<ReceiptDTO[]>("/receipts")).data;
  }


  // ANALYTICS
  async generateReport(dto: GenerateReportDto): Promise<ReportDTO> {
    return (await this.analyticsClient.post<ReportDTO>("/reports/generate", dto)).data;
  }

  async getReports(): Promise<ReportDTO[]> {
    return (await this.analyticsClient.get<ReportDTO[]>("/reports")).data;
  }

  async getTop10Perfumes(): Promise<ParfumDTO[]> {
    return (await this.analyticsClient.get<ParfumDTO[]>("/top10")).data;
  }


  // PERFORMANCE
  async runSimulation(dto: any): Promise<SimulationResultDto> {
    return (await this.performanceClient.post<SimulationResultDto>("/simulate", dto)).data;
  }


  // AUDIT
  async getAuditLogs(): Promise<AuditLogDTO[]> {
    return (await this.auditClient.get<AuditLogDTO[]>("/logs")).data;
  }
}
