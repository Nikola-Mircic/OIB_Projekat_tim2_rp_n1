import { Request, Response, Router } from "express";
import { IGatewayService } from "../Domain/services/IGatewayService";

import { LoginUserDTO } from "../Domain/DTOs/LoginUserDTO";
import { RegistrationUserDTO } from "../Domain/DTOs/RegistrationUserDTO";
import { CreatePlantDto } from "../Domain/DTOs/CreatePlantDto";
import { ProcessRequestDto } from "../Domain/DTOs/ProcessRequestDto";
import { CreatePackageDto } from "../Domain/DTOs/CreatePackageDto";
import { OrderPerfumeDto } from "../Domain/DTOs/OrderPerfumeDto";
import { GenerateReportDto } from "../Domain/DTOs/GenerateReportDto";

import { authenticate } from "../Middlewares/authentification/AuthMiddleware";
import { authorize } from "../Middlewares/authorization/AuthorizeMiddleware";



export class GatewayController {
  private readonly router: Router;

  constructor(private readonly gatewayService: IGatewayService) {
    this.router = Router();
    this.initializeRoutes();
  }



  private initializeRoutes(): void {

    /** ---------------- AUTH ---------------- **/
    this.router.post("/login", this.login.bind(this));
    this.router.post("/register", this.register.bind(this));

    /** ---------------- USERS ---------------- **/
    this.router.get("/users", authenticate, authorize("admin"), this.getAllUsers.bind(this));
    this.router.get("/users/:id", authenticate, authorize("admin", "seller", "manager"), this.getUserById.bind(this));

    /** ---------------- PRODUCTION ---------------- **/
    this.router.post("/production/plants", authenticate, authorize("manager", "seller"), this.createPlant.bind(this));
    this.router.put("/production/plants/:id/intensity", authenticate, authorize("manager", "seller"), this.adjustPlantIntensity.bind(this));
    this.router.post("/production/plants/:id/harvest", authenticate, authorize("manager", "seller"), this.harvestPlant.bind(this));
    this.router.get("/production/plants", authenticate, authorize("manager", "seller"), this.getAllPlants.bind(this));

    /** ---------------- PROCESSING ---------------- **/
    this.router.post("/processing/process", authenticate, authorize("manager", "seller"), this.processPlants.bind(this));

    /** ---------------- PACKAGING ---------------- **/
    this.router.post("/packaging/packages", authenticate, authorize("manager", "seller"), this.createPackage.bind(this));
    this.router.post("/packaging/packages/:id/add", authenticate, authorize("manager", "seller"), this.addPerfumesToPackage.bind(this));
    this.router.post("/packaging/packages/:id/send", authenticate, authorize("manager", "seller"), this.sendPackageToStorage.bind(this));
    this.router.get("/packaging/packages", authenticate, authorize("manager", "seller"), this.getAllPackages.bind(this));

    /** ---------------- STORAGE ---------------- **/
    this.router.post("/storage/deliver", authenticate, authorize("manager", "seller"), this.deliverPackages.bind(this));
    this.router.get("/storage/packages", authenticate, authorize("manager", "seller"), this.getAllStoredPackages.bind(this));

    /** ---------------- SALES ---------------- **/
    this.router.post("/sales/order", authenticate, authorize("seller", "manager"), this.orderPerfumes.bind(this));
    this.router.get("/sales/receipts", authenticate, authorize("admin", "manager", "seller"), this.getAllReceipts.bind(this));

    /** ---------------- ANALYTICS ---------------- **/
    this.router.post("/analytics/reports/generate", authenticate, authorize("admin"), this.generateReport.bind(this));
    this.router.get("/analytics/reports", authenticate, authorize("admin"), this.getReports.bind(this));
    this.router.get("/analytics/top10", authenticate, authorize("admin"), this.getTop10Perfumes.bind(this));

    /** ---------------- PERFORMANCE ---------------- **/
    this.router.post("/performance/simulate", authenticate, authorize("admin"), this.runSimulation.bind(this));

    /** ---------------- AUDIT ---------------- **/
    this.router.get("/audit/logs", authenticate, authorize("admin"), this.getAuditLogs.bind(this));
  }



  /** ---------------- AUTH ---------------- **/
  private async login(req: Request, res: Response): Promise<void> {
    const dto: LoginUserDTO = req.body;
    const result = await this.gatewayService.login(dto);
    res.status(200).json(result);
  }

  private async register(req: Request, res: Response): Promise<void> {
    const dto: RegistrationUserDTO = req.body;
    const result = await this.gatewayService.register(dto);
    res.status(200).json(result);
  }



  /** ---------------- USERS ---------------- **/
  private async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.gatewayService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }

  private async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (!req.user || req.user.id !== id) {
        res.status(401).json({ message: "You can only access your own data!" });
        return;
      }

      const user = await this.gatewayService.getUserById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: (err as Error).message });
    }
  }


  /** ---------------- PRODUCTION ---------------- **/
  private async createPlant(req: Request, res: Response) {
    const dto: CreatePlantDto = req.body;
    const result = await this.gatewayService.createPlant(dto);
    res.status(201).json(result);
  }

  private async adjustPlantIntensity(req: Request, res: Response) {
    const id = req.params.id;
    const dto = req.body as { intensity: number };
    const result = await this.gatewayService.adjustPlantIntensity(id, dto);
    res.status(200).json(result);
  }

  private async harvestPlant(req: Request, res: Response) {
    const id = req.params.id;
    const result = await this.gatewayService.harvestPlant(id);
    res.status(200).json(result);
  }

  private async getAllPlants(req: Request, res: Response) {
    const result = await this.gatewayService.getAllPlants();
    res.status(200).json(result);
  }



  /** ---------------- PROCESSING ---------------- **/
  private async processPlants(req: Request, res: Response) {
    const dto: ProcessRequestDto = req.body;
    const result = await this.gatewayService.processPlants(dto);
    res.status(200).json(result);
  }



  /** ---------------- PACKAGING ---------------- **/
  private async createPackage(req: Request, res: Response) {
    const dto: CreatePackageDto = req.body;
    const result = await this.gatewayService.createPackage(dto);
    res.status(201).json(result);
  }

  private async addPerfumesToPackage(req: Request, res: Response) {
    const packageId = req.params.id;
    const dto = req.body as { perfumeIds: string[] };
    const result = await this.gatewayService.addPerfumesToPackage(packageId, dto);
    res.status(200).json(result);
  }

  private async sendPackageToStorage(req: Request, res: Response) {
    const packageId = req.params.id;
    const result = await this.gatewayService.sendPackageToStorage(packageId);
    res.status(200).json(result);
  }

  private async getAllPackages(req: Request, res: Response) {
    const result = await this.gatewayService.getAllPackages();
    res.status(200).json(result);
  }



  /** ---------------- STORAGE ---------------- **/
  private async deliverPackages(req: Request, res: Response) {
    const dto = req.body as { packageIds: string[] };
    const result = await this.gatewayService.deliverPackages(dto);
    res.status(200).json(result);
  }

  private async getAllStoredPackages(req: Request, res: Response) {
    const result = await this.gatewayService.getAllStoredPackages();
    res.status(200).json(result);
  }



  /** ---------------- SALES ---------------- **/
  private async orderPerfumes(req: Request, res: Response) {
    const dto: OrderPerfumeDto = req.body;
    const result = await this.gatewayService.orderPerfumes(dto);
    res.status(200).json(result);
  }

  private async getAllReceipts(req: Request, res: Response) {
    const result = await this.gatewayService.getAllReceipts();
    res.status(200).json(result);
  }



  /** ---------------- ANALYTICS ---------------- **/
  private async generateReport(req: Request, res: Response) {
    const dto: GenerateReportDto = req.body;
    const result = await this.gatewayService.generateReport(dto);
    res.status(201).json(result);
  }

  private async getReports(req: Request, res: Response) {
    const result = await this.gatewayService.getReports();
    res.status(200).json(result);
  }

  private async getTop10Perfumes(req: Request, res: Response) {
    const result = await this.gatewayService.getTop10Perfumes();
    res.status(200).json(result);
  }



  /** ---------------- PERFORMANCE ---------------- **/
  private async runSimulation(req: Request, res: Response) {
    const dto = req.body;
    const result = await this.gatewayService.runSimulation(dto);
    res.status(200).json(result);
  }



  /** ---------------- AUDIT ---------------- **/
  private async getAuditLogs(req: Request, res: Response) {
    const result = await this.gatewayService.getAuditLogs();
    res.status(200).json(result);
  }



  public getRouter(): Router {
    return this.router;
  }
}
