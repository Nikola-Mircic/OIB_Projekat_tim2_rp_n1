import { SaleType } from "../enums/SaleType";
import { PaymentType } from "../enums/PaymentType";

export interface OrderPerfumeDto {
  perfumeId: string;
  quantity: number;
  paymentType: PaymentType;
  saleType: SaleType;
}
