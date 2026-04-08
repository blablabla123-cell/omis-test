export interface EnvVariables {
  port: number;
  database: {
    url: string;
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  jwt: string;
}
