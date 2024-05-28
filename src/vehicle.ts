import { VehicleType } from "./type";

export class Vehicle {
  type: VehicleType
  entryPoint: number | null = null
  entryTime: Date | null = null;
  exitTime: Date | null = null;
  removedFlatRate: boolean = false

  constructor(type: VehicleType) {
    this.type = type
  }
}