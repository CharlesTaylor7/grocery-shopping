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

export type Op = "new" | "edit" | "delete";
export type EntityType = "store" | "trip" | "trip_item" | "store_item";

export type Action<TEntity = unknown> =
  | ({ op: "new"; entity: EntityType } & Partial<TEntity>)
  | ({ op: "edit"; entity: EntityType; id: string } & Partial<TEntity>)
  | ({ op: "delete"; entity: EntityType; id: string });
