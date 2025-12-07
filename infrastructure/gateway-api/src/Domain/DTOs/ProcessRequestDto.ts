import { PerfumeType } from "../enums/PerfumeType";

export interface ProcessRequestDto {
  perfumeType: PerfumeType; 
  bottleVolume: number;      
  quantity: number;          
}
