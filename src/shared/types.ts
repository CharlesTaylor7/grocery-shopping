export interface Trip {
  id: string;
  shopping_date: Date;
  description: string;
}

export interface Store {
  id: string;
  name: string;
}

export interface StoreItem {
  id: string;
  description: string;
  got: boolean;
  store_id: string;
}

export interface TripItem {
  id: string;
  description: string;
  got: boolean;
  trip_id: string;
  store_id: string;
}

export interface HasId {
  id: string;
}

export type Op = "new" | "edit" | "delete";
export type TableName = "stores" | "trips" | "trip_items" | "store_items";

export type Action<TEntity extends HasId = HasId> =
  | ({ op: "new"; table: TableName } & Partial<TEntity>)
  | ({ op: "edit"; table: TableName; id: string } & Partial<TEntity>)
  | ({ op: "delete"; table: TableName; id: string });
