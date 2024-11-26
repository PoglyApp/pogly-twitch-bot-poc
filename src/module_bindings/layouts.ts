// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  __SPACETIMEDB__,
  AlgebraicType,
  ProductType,
  BuiltinType,
  ProductTypeElement,
  SumType,
  SumTypeVariant,
  DatabaseTable,
  AlgebraicValue,
  ReducerEvent,
  Identity,
  Address,
  ClientDB,
  SpacetimeDBClient,
} from "@clockworklabs/spacetimedb-sdk";

export class Layouts extends DatabaseTable {
  public static db: ClientDB = __SPACETIMEDB__.clientDB;
  public static tableName = "Layouts";
  public id: number;
  public name: string;
  public createdBy: string;
  public active: boolean;

  public static primaryKey: string | undefined = "id";

  constructor(id: number, name: string, createdBy: string, active: boolean) {
    super();
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.active = active;
  }

  public static serialize(value: Layouts): object {
    return [value.id, value.name, value.createdBy, value.active];
  }

  public static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement("id", AlgebraicType.createPrimitiveType(BuiltinType.Type.U32)),
      new ProductTypeElement("name", AlgebraicType.createPrimitiveType(BuiltinType.Type.String)),
      new ProductTypeElement("createdBy", AlgebraicType.createPrimitiveType(BuiltinType.Type.String)),
      new ProductTypeElement("active", AlgebraicType.createPrimitiveType(BuiltinType.Type.Bool)),
    ]);
  }

  public static fromValue(value: AlgebraicValue): Layouts {
    let productValue = value.asProductValue();
    let __Id = productValue.elements[0].asNumber();
    let __Name = productValue.elements[1].asString();
    let __CreatedBy = productValue.elements[2].asString();
    let __Active = productValue.elements[3].asBoolean();
    return new this(__Id, __Name, __CreatedBy, __Active);
  }

  public static *filterById(value: number): IterableIterator<Layouts> {
    for (let instance of this.db.getTable("Layouts").getInstances()) {
      if (instance.id === value) {
        yield instance;
      }
    }
  }

  public static findById(value: number): Layouts | undefined {
    return this.filterById(value).next().value;
  }

  public static *filterByName(value: string): IterableIterator<Layouts> {
    for (let instance of this.db.getTable("Layouts").getInstances()) {
      if (instance.name === value) {
        yield instance;
      }
    }
  }

  public static *filterByCreatedBy(value: string): IterableIterator<Layouts> {
    for (let instance of this.db.getTable("Layouts").getInstances()) {
      if (instance.createdBy === value) {
        yield instance;
      }
    }
  }

  public static *filterByActive(value: boolean): IterableIterator<Layouts> {
    for (let instance of this.db.getTable("Layouts").getInstances()) {
      if (instance.active === value) {
        yield instance;
      }
    }
  }
}

export default Layouts;