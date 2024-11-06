export interface OnEvent {
  // TODO: add zrp typings
  (code: number, payload: any): void;
}
