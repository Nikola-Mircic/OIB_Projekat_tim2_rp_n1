import { PlantStatus } from "../enums/PlantStatus";

export interface CreatePlantDto {
  generalName: string;
  latinName: string;
  originCountry: string;
  intensity: number;
  status?: PlantStatus; 
}