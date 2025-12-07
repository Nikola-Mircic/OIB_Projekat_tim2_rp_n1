import express from 'express';
import cors from 'cors';
import "reflect-metadata";
import dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { Db } from './Database/DbConnectionPool';
import { initialize_database } from './Database/InitializeConnection';


//import { Plant } from './Domain/models/Plant';
//import { IProductionService } from './Domain/services/IProductionService';
//import { ProductionService } from './Services/ProductionService';
//import { ProductionController } from './WebAPI/ProductionController';

dotenv.config({ quiet: true });

const app = express();

// CORS konfiguracija
const corsOrigin = process.env.CORS_ORIGIN ?? "*";
const corsMethods = process.env.CORS_METHODS?.split(",").map(m => m.trim()) ?? ["POST"];

app.use(cors({
  origin: corsOrigin,
  methods: corsMethods,
}));

app.use(express.json());

// Inicijalizacija baze
initialize_database();

// ORM Repository
//const plantRepository: Repository<Plant> = Db.getRepository(Plant);

// Services
//const productionService: IProductionService = new ProductionService(plantRepository);

// WebAPI Controller
//const productionController = new ProductionController(productionService);

// Registracija ruta
//app.use('/api/v1', productionController.getRouter());

export default app;
