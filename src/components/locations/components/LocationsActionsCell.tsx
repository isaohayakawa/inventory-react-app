import { useState } from 'react'
import { Button, CloseButton, Dialog, IconButton, Portal, Table } from "@chakra-ui/react"
import { Pencil, Trash } from 'lucide-react'
import { toaster } from '../../ui/toaster'
import type { CategoriesMap } from '../../../interfaces/categoryMap'
import type { LocationFromMap } from '../../../interfaces/locationFromMap'
import type { LocationsMap } from '../../../interfaces/locationsMap'
import { Tooltip } from '../../ui/tooltip'

const BUTTON_SIZE = "xs"
const BUTTON_VARIANT = "ghost"
const ICON_SIZE = 10

export const LocationsActionsCell = ({ location, locationsMap, setLocationsMap, setLocationToEdit, setShowEditLocationDialog }: {
  location: LocationFromMap;
  locationsMap: LocationsMap;
  setLocationsMap: (locationsMap: LocationsMap) => void;
  setLocationToEdit: (location: LocationFromMap) => void;
  setShowEditLocationDialog: (show: boolean) => void;
}) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

  const closeDeleteConfirmationDialog = () => setDeleteConfirmationOpen(false)

  const deleteItem = () => {
    const newLocationsMap: CategoriesMap = {}
    Object.values(locationsMap).forEach((locationInMap) => {
      if (locationInMap.id !== location.id) {
        newLocationsMap[locationInMap.id] = locationInMap
      }
    })
    setLocationsMap(newLocationsMap)
    closeDeleteConfirmationDialog()
  }

  const deleteAction = () => {
    if (location.assignedTo > 0) {
      toaster.create({
        title: `You have ${location.assignedTo} items assigned to ${location.name}`,
        description: `You have ${location.assignedTo} items assigned to ${location.name}. Please reassign those items to another location and try deleting again.`,
        type: "error"
      })
      return
    }

    setDeleteConfirmationOpen(true)
  }

  const editAction = () => {
    setLocationToEdit(location)
    setShowEditLocationDialog(true)
  }

  return (
    <>
      <Table.Cell>
        <Tooltip content="Edit location">
          <IconButton
            aria-label="Edit location"
            size={BUTTON_SIZE}
            variant={BUTTON_VARIANT}
            onClick={editAction}
          >
            <Pencil size={ICON_SIZE} />
          </IconButton>
        </Tooltip>
        <Tooltip content="Delete location">
          <IconButton
            aria-label="Delete location"
            size={BUTTON_SIZE}
            variant={BUTTON_VARIANT}
            onClick={deleteAction}
          >
            <Trash size={ICON_SIZE} />
          </IconButton>
        </Tooltip>
      </Table.Cell>
      <Dialog.Root open={deleteConfirmationOpen}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete item?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  Are you sure you want to delete {location.name}?
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" onClick={closeDeleteConfirmationDialog}>No</Button>
                </Dialog.ActionTrigger>
                <Button variant="outline" onClick={deleteItem}>Yes</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild onClick={closeDeleteConfirmationDialog}>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
