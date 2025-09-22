import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react"
import { SearchBar } from "../SearchBar";
import { locationsMapToArray } from "../../utils/locations";
import type { LocationsMap } from "../../interfaces/locationsMap";
import type { LocationFromMap } from "../../interfaces/locationFromMap";
import { LocationsDataTable } from "./components/LocationsDataTable";
import { LocationsToolbar } from "./components/LocationsToolbar";

export const LocationsContainer = ({
  locationsMap,
  setLocationsMap,
  setShowAddLocationDialog
}: {
  locationsMap: LocationsMap;
  setLocationsMap: (categories: LocationsMap) => void;
  setShowAddLocationDialog: (show: boolean) => void;
}) => {
  const [locationsToDisplay, setLocationsToDisplay] = useState<LocationFromMap[]>(locationsMapToArray(locationsMap))
  const [searchInputValue, setSearchInputValue] = useState("")  
  
  useEffect(() => {
    search(searchInputValue)
  }, [locationsMap])

  const search = (searchValue: string) => {
    if (searchValue === "" || !searchValue) {
      setLocationsToDisplay(locationsMapToArray(locationsMap))
      return
    }

    const newCategoriesToDisplay: LocationFromMap[] = []
    const lowerCaseSearchValue = searchValue.toLowerCase()
    Object.keys(locationsMap).forEach((id: string) => {
      const lowerCasedName = locationsMap[id].name.toLowerCase()
      if (lowerCasedName.search(lowerCaseSearchValue) !== -1) {
        newCategoriesToDisplay.push(locationsMap[id])
      }
    })

    setLocationsToDisplay(newCategoriesToDisplay)
  }

  return (
    <Container
      borderWidth="1px"
      borderColor="border.disabled"
      color="fg.disabled"
    >
      <LocationsToolbar setShowAddLocationDialog={setShowAddLocationDialog}/>
      <SearchBar search={search} searchItemName="location" setSearchInputValue={setSearchInputValue} />
      <LocationsDataTable
        locations={locationsToDisplay}
        locationsMap={locationsMap}
        setLocationsMap={setLocationsMap}
      />
    </Container>
  )
}
