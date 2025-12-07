import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import { initialize_database } from "./Database/InitializeConnection";
import { Db } from "./Database/DbConnectionPool";

import { Repository } from "typeorm";
//import { StoragePackage } from "./Domain/models/StoragePackage";

//import { IStorageService } from "./Domain/services/IStorageService";
//import { StorageService } from "./Services/StorageService";
//import { StorageController } from "./WebAPI/controllers/StorageController";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN ?? "*",
    methods: process.env.CORS_METHODS?.split(",") ?? ["POST"]
}));

app.use(express.json());

initialize_database();

//const repo: Repository<StoragePackage> = Db.getRepository(StoragePackage);

//const storageService: IStorageService = new StorageService(repo);

//const storageController = new StorageController(storageService);

//app.use("/api/v1", storageController.getRouter());

export default app;
