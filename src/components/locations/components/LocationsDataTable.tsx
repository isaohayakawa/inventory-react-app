import { useState } from "react";
import { Table, Tag } from "@chakra-ui/react"
import { Package } from "lucide-react";
import type { LocationFromMap } from "../../../interfaces/locationFromMap";
import type { LocationsMap } from "../../../interfaces/locationsMap";
import { LocationsActionsCell } from "./LocationsActionsCell";
import { EditLocationDialog } from "./EditLocationDialog";

export const LocationsDataTable = ({ locations, locationsMap, setLocationsMap }: {
  locations: LocationFromMap[];
  locationsMap: LocationsMap;
  setLocationsMap: (locationsMap: LocationsMap) => void;
}) => {
  const [showEditLocationDialog, setShowEditLocationDialog] = useState(false)
  const [locationToEdit, setLocationToEdit] = useState<LocationFromMap | null>(null)
    
  return (
    <>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {locations.map((location) => (
            <Table.Row key={location.id}>
              <Table.Cell>
                {location.name}{' '}
                {
                  location.assignedTo > 0 && (
                    <Tag.Root>
                      <Tag.StartElement>
                        <Package />
                      </Tag.StartElement>
                      <Tag.Label>Assigned to {location.assignedTo} items</Tag.Label>
                    </Tag.Root>
                  )
                }
              </Table.Cell>
              <LocationsActionsCell
                location={location}
                locationsMap={locationsMap}
                setLocationsMap={setLocationsMap} 
                setLocationToEdit={setLocationToEdit}
                setShowEditLocationDialog={setShowEditLocationDialog}
              />
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <EditLocationDialog
        location={locationToEdit}
        locationsMap={locationsMap}
        setLocationsMap={setLocationsMap}
        setShowEditLocationDialog={setShowEditLocationDialog}
        showEditLocationDialog={showEditLocationDialog}
      />
    </>
  )
}
