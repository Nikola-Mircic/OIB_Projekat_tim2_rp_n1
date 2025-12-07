import { ReportType } from "../enums/ReportType";

export interface GenerateReportDto {
  reportType: ReportType;    
  startDate?: string;         
  endDate?: string;           
}
