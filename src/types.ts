

export type Nullish<T> = T | undefined | null;

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
  order: number;
  last_got_at?: Nullish<Date | string>;
  store_id: string;
}

export interface TripItem {
  id: string;
  description: string;
  got: boolean;
  order: number;
  trip_id: string;
  store_id: string;
}

export interface HasId {
  id: string;
}

export type Op = "new" | "edit" | "delete";
export type TableName = "stores" | "trips" | "trip_items" | "store_items";

//
export interface ActionFields {
  op: Op;
  table: TableName;
  entity: EntityFields<Op>;
}

export type Action<TName extends TableName = TableName, TOp extends Op = Op> = {
  table: TName;
  op: TOp;
  idb_index?: number;
  uuid?: string;
  entity: EntityFields<TOp, Entity<TName>>;
};

export type Entity<TName extends TableName = TableName> = TName extends "stores"
  ? Store
  : TName extends "trips" ? Trip
  : TName extends "store_items" ? StoreItem
  : TName extends "trip_items" ? TripItem
  : never;

export type EntityFields<TOp extends Op = Op, TEntity extends HasId = HasId> =
  TOp extends "new" ? TEntity
  : TOp extends "edit" ? HasId & Partial<TEntity>
  : TOp extends "delete" ? HasId & Partial<TEntity>
  : never;
