export interface ParkingFee {
  first_3_hours: number;
  hourlyRates: {
    SP: number
    MP: number
    LP: number
  }
  full_day: number;
}

export enum VehicleType {
  Small = "S",
  Medium = "M",
  Large = "L",
}

export enum ParkingSpotSize {
  Small = "SP",
  Medium = "MP",
  Large = "LP",
}

