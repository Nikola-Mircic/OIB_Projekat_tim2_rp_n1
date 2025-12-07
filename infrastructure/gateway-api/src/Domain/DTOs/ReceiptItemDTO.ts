import { PerfumeType } from "../enums/PerfumeType";

export interface ReceiptItemDTO {
  id: string;            // jedinstveni ID parfema
  name: string;          // naziv parfema
  type: PerfumeType;     // tip parfema: PERFUME / COLOGNE
  volume: number;        // zapremina bočice u ml
  price: number;         // cena po komadu
  quantity: number;      // broj kupljenih komada
}
