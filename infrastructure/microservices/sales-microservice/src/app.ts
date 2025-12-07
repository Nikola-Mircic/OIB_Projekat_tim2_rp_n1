import express from "express";
import cors from "cors";
import "reflect-metadata";
import dotenv from "dotenv";
import { initialize_database } from "./Database/InitializeConnection";
import { Db } from "./Database/DbConnectionPool";
import { Repository } from "typeorm";

//import { Receipt } from "./Domain/models/Receipt";

//import { ISalesService } from "./Domain/services/ISalesService";
//import { SalesService } from "./Services/SalesService";
//import { SalesController } from "./WebAPI/controllers/SalesController";

dotenv.config({ quiet: true });

const app = express();

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN ?? "*",
    methods: process.env.CORS_METHODS?.split(",") ?? ["POST", "GET"]
}));

app.use(express.json());

// DB
initialize_database();

// Repositories
//const receiptRepo: Repository<Receipt> = Db.getRepository(Receipt);

// Service + Controller
//const salesService: ISalesService = new SalesService(receiptRepo);
//const salesController = new SalesController(salesService);

// Routes
//app.use("/api/v1", salesController.getRouter());

export default app;
