import { ReportType } from "../enums/ReportType";

export interface ReportDTO {
  id: string;
  reportType: ReportType;
  generatedAt: string;
  data: any;     // npr. top10 lista, grafikon, tabela...
}
