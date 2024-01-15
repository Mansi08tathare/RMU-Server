import { UserRole } from "src/enums/enum";


export interface JwtPayload {
    email: string;
    role: UserRole;
  }
  
