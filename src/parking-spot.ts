import { ParkingSpotSize, VehicleType } from "./type";
import { Vehicle } from "./vehicle";

export class ParkingSpot {
  spotNumber: number
  spotSize: ParkingSpotSize;
  vehicle: Vehicle | null = null;

  constructor(spotNumber: number, size: ParkingSpotSize) {
    this.spotNumber = spotNumber;
    this.spotSize = size;
  }


  canPark(vehicle: Vehicle): boolean {
    switch (vehicle.type) {
      case VehicleType.Small: {
        return true
      }
      case VehicleType.Medium: {
        return this.spotSize !== ParkingSpotSize.Small
      }
      case VehicleType.Large: {
        return this.spotSize === ParkingSpotSize.Large
      }
      default: {
        throw new Error("Unknown vehicle size")
      }
    }
  }


  parkVehicle(vehicle: Vehicle): void {
    if (this.vehicle) {
        throw new Error('Spot already occupied');
    }
    this.vehicle = vehicle;
  }


  removeVehicle(): void {
    if (!this.vehicle) {
        throw new Error('Spot is already empty');
    }
    this.vehicle = null;
  }


  isAvailable(): boolean {
    return this.vehicle === null
  }
}