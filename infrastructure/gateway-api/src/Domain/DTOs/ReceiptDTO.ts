import { ReceiptItemDTO } from "./ReceiptItemDTO";
import { SaleType } from "../enums/SaleType";
import { PaymentType } from "../enums/PaymentType";

export interface ReceiptDTO {
  id: string;                  // jedinstveni ID racuna
  items: ReceiptItemDTO[];     // lista stavki (parfema) u racunu
  totalAmount: number;         // ukupna suma svih stavki
  saleType: SaleType;          // retail / wholesale
  paymentType: PaymentType;    // cash / card / transfer
  date: string;                // datum i vreme prodaje 
}
