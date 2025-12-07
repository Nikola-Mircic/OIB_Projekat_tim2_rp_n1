import { AuditLogLevel } from "../enums/AuditLogLevel";

export interface AuditLogDTO {
  id: string;                
  type: AuditLogLevel;       
  timestamp: string;         
  message: string;           
}

