import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";

import { initialize_database } from "./Database/InitializeConnection";
import { Db } from "./Database/DbConnectionPool";

import { Repository } from "typeorm";
//import { PerformanceReport } from "./Domain/models/PerformanceReport";

//import { IPerformanceService } from "./Domain/services/IPerformanceService";
//import { PerformanceService } from "./Services/PerformanceService";

//import { PerformanceController } from "./WebAPI/controllers/PerformanceController";

dotenv.config({ quiet: true });

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN ?? "*",
    methods: process.env.CORS_METHODS?.split(",") ?? ["POST", "GET"]
}));

initialize_database();

// ORM repo
//const performanceRepo: Repository<PerformanceReport> = Db.getRepository(PerformanceReport);

// Service
//const perfService: IPerformanceService = new PerformanceService(performanceRepo);

// Controller
//const perfController = new PerformanceController(perfService);

//app.use("/api/v1", perfController.getRouter());

export default app;
