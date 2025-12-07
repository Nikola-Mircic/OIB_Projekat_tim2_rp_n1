import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";

import { initialize_database } from "./Database/InitializeConnection";
import { Db } from "./Database/DbConnectionPool";

import { Repository } from "typeorm";

//import { Report } from "./Domain/models/Report";
//import { IAnalyticsService } from "./Domain/services/IAnalyticsService";
//import { AnalyticsService } from "./Services/AnalyticsService";
//import { AnalyticsController } from "./WebAPI/controllers/AnalyticsController";

dotenv.config({ quiet: true });

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN ?? "*",
    methods: process.env.CORS_METHODS?.split(",") ?? ["GET", "POST"]
}));

app.use(express.json());

initialize_database();

//const reportRepo: Repository<Report> = Db.getRepository(Report);
//const analyticsService: IAnalyticsService = new AnalyticsService(reportRepo);
//const analyticsController = new AnalyticsController(analyticsService);

//app.use("/api/v1", analyticsController.getRouter());

export default app;
