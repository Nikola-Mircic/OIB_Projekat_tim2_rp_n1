import { PerfumeType } from "../enums/PerfumeType";

export interface ParfumDTO {
  id: string;
  name: string;
  type: PerfumeType;
  volume: number;
  price: number;
}
