export type List<T> = Record<number, T> &
  ListConstructor<T> &
  Iterable<T> & {
    Capacity: number;
    Count: number;
    Add(item: T): void;
    AddRange(items: List<T>): void;
    BinarySearch(item: T): number;
    Clear(): void;
    Contains(item: T): boolean;
    Exists(predicate: (item: T) => boolean): boolean;
    Find(predicate: (item: T) => boolean): T;
    FindAll(predicate: (item: T) => boolean): List<T>;
    FindIndex(predicate: (item: T) => boolean): number;
    FindLast(predicate: (item: T) => boolean): T;
    FindLastIndex(predicate: (item: T) => boolean): number;
    ForEach(action: (item: T) => void): void;
    IndexOf(item: T): number;
    Insert(index: number, item: T): void;
    InsertRange(index: number, items: List<T>): void;
    LastIndexOf(item: T): number;
    Remove(item: T): void;
    RemoveAll(predicate: (item: T) => boolean): void;
    RemoveAt(index: number): void;
    RemoveRange(index: number, count: number): void;
    Reverse(): void;
    Sort(): void;
    TrueForAll(predicate: (item: T) => boolean): boolean;
  };

export class ListConstructor<T> {
  public constructor();
  public constructor(capacity: number);
  public constructor(items: List<T>);
  public constructor(_args?: any) {}
}
