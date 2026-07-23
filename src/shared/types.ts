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

//
export interface ActionFields {
  op: Op;
  table: TableName;
  entity: EntityFields<Op>;
}

export type Action<TOp extends Op = Op, TEntity extends HasId = HasId> = {
  table: TEntity;
  op: TOp;
  idb_index?: number;
  entity: EntityFields<TOp, TEntity>;
};

export type EntityFields<TOp extends Op = Op, TEntity extends HasId = HasId> =
  TOp extends "new" ? Partial<TEntity>
    : TOp extends "edit" ? HasId & Partial<TEntity>
    : TOp extends "delete" ? HasId
    : never;
