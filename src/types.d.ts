import { HttpStatus } from '@nestjs/common';
import { ERROR_CODES, USERROLE } from './constant';

export interface ApiResponse<T> {
  statusCode: HttpStatus;
  success: boolean;
  //message: string
  error: {
    code: ERROR_CODES;
    message: string;
    details: InvalidRequestErrorDetails[];
  };
  data: { [K in keyof T]: any } | { [K in keyof T]: any }[];
}

export type InvalidRequestErrorDetails = {
  field: string;
  message: string;
};

export interface ControllerResponse<T> {
  data: T;
}

export interface Pagination {
  count: number;
  pages: number;
}
export interface PaginatedList<T> {
  pagination: Pagination;
  list: T[];
}

export type Config = {
  DATABASE: {
    DATABASE_NAME: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    SYNC: boolean;
    RUN_MIGARTIONS: boolean;
  };
  SERVER: {
    PORT: number;
  };
  AUTH: {
    SECRET_KEY: string;
  };
  REDIS: {
    HOST: string;
    PASSWORD: string;
    PORT: number;
    TTL: number;
  };
};

export type DecodedToken = TokenPayload & {
  iat: number;
  exp: number;
};

export type TokenPayload = {
  username: string;
  id: string;
  role: USERROLE;
};

type ENV = {
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_SYNC: boolean;
  DATABASE_RUN_MIGRATION: boolean;
  PORT: number;
  JWT_SECRET_KEY: string;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  REDIS_TTL: number;
};

declare global {
  namespace Express {
    export interface Request {
      user?: DecodedToken;
    }
    export interface Response {
      locals?: ResponseLocalUser & Record<string, any>;
    }
  }
}
