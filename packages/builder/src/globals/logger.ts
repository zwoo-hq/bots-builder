export interface Logger {
  Debug(msg: string): void;
  Info(msg: string): void;
  Warn(msg: string): void;
  Error(msg: string): void;
}
