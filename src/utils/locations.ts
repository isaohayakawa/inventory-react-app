import type { Item } from "../interfaces/item"
import type { Location } from "../interfaces/location"
import type { LocationsMap } from "../interfaces/locationsMap"

export const mapLocations = (locations: Location[], items: Item[]) => {
  const locationsMap: LocationsMap = {}
  locations.forEach((location) => {
    locationsMap[location.id] = {
      name: location.name,
      id: location.id,
      assignedTo: 0
    }
  })

  items.forEach((item) => {
    locationsMap[item.locationId].assignedTo += 1
  })

  return locationsMap;
}

export const locationsMapToArray = (locationsMap: LocationsMap) => {
  return Object.entries(locationsMap).map(([_, location]) => location)
}