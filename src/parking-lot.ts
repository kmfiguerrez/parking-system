import { ParkingSpot } from "./parking-spot";
import { ParkingFee, ParkingSpotSize } from "./type";
import { Vehicle } from "./vehicle";

export class ParkingLot {
  parkingSpots: ParkingSpot[];
  parkingFees: ParkingFee;

  constructor(numEntryPoints: number, totalParkingSpots: number, parkingFees: ParkingFee) {
    this.numEntryPoints = numEntryPoints;
    this.parkingSpots = Array.from({ length: totalParkingSpots }, (_, i) => this.#createParkingSpot(i + 1));
    this.parkingFees = parkingFees;

  }

  // Setter.
  set numEntryPoints(num: number) {
    if (num !== 3) {
      throw new Error("Number of entry points must be equal to 3")
    }
  }


  /**
   * Parks a vehicle.
   * 
   * @param vehicle An instance of the class Vehicle.
   * 
   * @returns An instance of the class ParkingSpot.
   * 
   * @throws Throws an error if there's no available parking spot or appropriate parking spot size.
   */
  parkVehicle(vehicle: Vehicle): ParkingSpot {
    const availableSpot = this.parkingSpots.find(spot => {
      if (spot.isAvailable()) {
        if (spot.canPark(vehicle)) {
          return spot
        } 
      }
    });

    if (!availableSpot) throw new Error('No available parking spots or size appropriate for the vehicle');

    // If a vehicle leaves and comes back within one hour.
    if (vehicle.exitTime) {
      const elapsedTime: number = (Date.now() - vehicle.exitTime.getTime()) / 3600000
      if (elapsedTime < 1) vehicle.removedFlatRate = true
    }
    
    vehicle.entryTime = new Date()
    availableSpot.parkVehicle(vehicle);

    return availableSpot
  }


  /**
   * Unpark a vehicle and returns the parking fee.
   * 
   * @param parkingSpot An instance of the the class ParkingSpot.
   * 
   * @returns A parking fee.
   * 
   * @throws Throws an error if the param parking spot does not belong to a parking lot.
   */
  removeVehicle(parkingSpot: ParkingSpot): number {
    if (!this.parkingSpots.includes(parkingSpot)) {
      throw new Error("Parking spot does not exist")
    }

    // Extract vehicle.
    const vehicle = parkingSpot.vehicle

    parkingSpot.removeVehicle();

    return this.#calculateFee(vehicle!, parkingSpot.spotSize)
  }
  

  /**
   * A private method that calculates the parking fee.
   * 
   * @param vehicle An instance of the Vehicle class.
   * @param parkingSize An enum of ParkingSpotSize.
   * 
   * @returns An integer parking fee.
   */
  #calculateFee(vehicle: Vehicle, parkingSize: ParkingSpotSize): number {
    vehicle.exitTime = new Date()

    const hoursParked: number = Math.ceil((vehicle.exitTime!.getTime() - vehicle.entryTime!.getTime()) / 3600000)

    if (hoursParked <= 3 && vehicle.removedFlatRate === false) {
      return this.parkingFees.first_3_hours
    }

    const fullDays = Math.floor(hoursParked / 24)
    const exceedingHours = hoursParked % 24
    let totalFee = fullDays * this.parkingFees.full_day + this.parkingFees.first_3_hours

    if (exceedingHours > 3) {
      totalFee += (exceedingHours - 3) * this.parkingFees.hourlyRates[parkingSize]
    }

    return totalFee
  }


  /**
   * Create an instance of the ParkingSpot class.
   * 
   * @param spotNumber An integer number.
   * 
   * @returns An instance of the ParkingSpot class
   */
  #createParkingSpot(spotNumber: number): ParkingSpot {
    // Generate a number between 0 to 2 inclusive.
    const randomNumber = Math.floor(Math.random() * 3);
  
    switch (randomNumber) {
      case 0: {
        return new ParkingSpot(spotNumber, ParkingSpotSize.Small)
      }
      case 1: {
        return new ParkingSpot(spotNumber, ParkingSpotSize.Medium)
      }
      case 2: {
        return new ParkingSpot(spotNumber, ParkingSpotSize.Large)
      }
      default:{
        throw new Error(`Got out of range number: ${randomNumber}`)
      }
    }
  }
  
  
  /**
   * Print (display) the sizes of the parking spots.
   * 
   * @returns An Array of ParkingSpotSize enum.
   */
  printParkingSpotSizes(): Array<ParkingSpotSize> {
    const parkingSizes: Array<ParkingSpotSize> = this.parkingSpots.map(spot => spot.spotSize)

    return parkingSizes
  }
}


