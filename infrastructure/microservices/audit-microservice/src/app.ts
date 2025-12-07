import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";

import { initialize_database } from "./Database/InitializeConnection";
import { Db } from "./Database/DbConnectionPool";

import { Repository } from "typeorm";
//import { AuditLog } from "./Domain/models/AuditLog";

//import { IAuditService } from "./Domain/services/IAuditService";
//import { AuditService } from "./Services/AuditService";

//import { AuditController } from "./WebAPI/controllers/AuditController";

dotenv.config({ quiet: true });

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN ?? "*",
    methods: process.env.CORS_METHODS?.split(",") ?? ["GET"]
}));

initialize_database();

// Repo
//const auditRepo: Repository<AuditLog> = Db.getRepository(AuditLog);

// Service
//const auditService: IAuditService = new AuditService(auditRepo);

// Controller
//const auditController = new AuditController(auditService);

//app.use("/api/v1", auditController.getRouter());

export default app;
