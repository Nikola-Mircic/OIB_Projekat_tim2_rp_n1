import { PlantStatus } from "../enums/PlantStatus";

export interface PlantDTO {
  id: string;
  generalName: string;
  latinName: string;
  originCountry: string;
  intensity: number;
  status: PlantStatus;
}
