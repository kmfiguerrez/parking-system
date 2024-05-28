import { ParkingLot } from "./parking-lot"
import { ParkingSpot } from "./parking-spot"
import { ParkingFee, VehicleType } from "./type"
import { Vehicle } from "./vehicle"


const v = new Vehicle(VehicleType.Small)
const v1 =  new Vehicle(VehicleType.Medium)
const v5 =  new Vehicle(VehicleType.Large)

const parkingFees: ParkingFee = {
  first_3_hours: 40,
  hourlyRates: {
    SP: 20,
    MP: 60,
    LP: 100
  },
  full_day: 5000
}

const MallParkingLot = new ParkingLot(3, 5, parkingFees)

try {
  const parkingSpot = MallParkingLot.parkVehicle(v5)
  const parkingFee = MallParkingLot.removeVehicle(parkingSpot)
  console.log(parkingFee)
} 
catch (error: unknown) {
  console.log(error)
}


