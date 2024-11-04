import { List } from "./list";

export type KeyValuePair<TKey, TValue> = {
  Key: TKey;
  Value: TValue;
};

export type Dictionary<TKey extends string | number | symbol, TItem> = Record<
  TKey,
  TItem
> &
  DictionaryConstructor<TKey, TItem> &
  Iterable<KeyValuePair<TKey, TItem>> & {
    Count: number;
    Keys: List<TKey>;
    Values: List<TItem>;
    Add(key: TKey, value: TItem): void;
    Clear(): void;
    ContainsKey(key: TKey): boolean;
    ContainsValue(value: TItem): boolean;
    Remove(key: TKey): void;
    Remove(key: TKey, value: TItem): void;
    TryAdd(key: TKey, value: TItem): boolean;
    TryGetValue(key: TKey): TItem | undefined;
  };

export class DictionaryConstructor<
  TKey extends string | number | symbol,
  TItem
> {
  public constructor();
  public constructor(capacity: number);
  public constructor(items: Dictionary<TKey, TItem>);
  public constructor(_args?: any) {}
}
