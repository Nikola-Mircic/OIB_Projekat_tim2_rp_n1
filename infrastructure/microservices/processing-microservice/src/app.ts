import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import { initialize_database } from "./Database/InitializeConnection";
import { Db } from "./Database/DbConnectionPool";
import { Repository } from "typeorm";
//import { ProcessEntity } from "./Domain/models/ProcessEntity";

//import { IProcessingService } from "./Domain/services/IProcessingService";
//import { ProcessingService } from "./Services/ProcessingService";
//import { ProcessingController } from "./WebAPI/controllers/ProcessingController";

dotenv.config({ quiet: true });

const app = express();

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN ?? "*",
  methods: process.env.CORS_METHODS?.split(",") ?? ["POST"]
}));

app.use(express.json());

// DB INIT
initialize_database();

// Repo
//const processRepo: Repository<ProcessEntity> = Db.getRepository(ProcessEntity);

// Services
//const processingService: IProcessingService = new ProcessingService(processRepo);

// Controllers
//const processingController = new ProcessingController(processingService);

// Register routes
//app.use("/api/v1", processingController.getRouter());

export default app;
