export interface Random {
  Next(): number;
  Next(max: number): number;
  Next(min: number, max: number): number;
  NextInt64(): number;
  NextInt64(max: number): number;
  NextInt64(min: number, max: number): number;
  NextSingle(): number;
  NextDouble(): number;
}
