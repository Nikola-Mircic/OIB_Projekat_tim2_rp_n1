import express from "express";
import cors from "cors";
import "reflect-metadata";
import dotenv from "dotenv";
import { initialize_database } from "./Database/InitializeConnection";
import { Db } from "./Database/DbConnectionPool";
import { Repository } from "typeorm";
//import { Package } from "./Domain/models/Package";
//import { Perfume } from "./Domain/models/Perfume";

//import { IPackagingService } from "./Domain/services/IPackagingService";
//import { PackagingService } from "./Services/PackagingService";
//import { PackagingController } from "./WebAPI/controllers/PackagingController";
 
dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN ?? "*",
  methods: process.env.CORS_METHODS?.split(",") ?? ["POST"]
}));

app.use(express.json());

// DB
initialize_database();

// Repositories
//const packageRepository: Repository<Package> = Db.getRepository(Package);
//const perfumeRepository: Repository<Perfume> = Db.getRepository(Perfume);

// Services
//const packagingService: IPackagingService = new PackagingService( packageRepository, perfumeRepository);

// Controller
//const packagingController = new PackagingController(packagingService);

// Routes
//app.use("/api/v1", packagingController.getRouter());

export default app;
