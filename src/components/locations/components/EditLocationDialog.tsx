import type { ChangeEvent } from 'react'
import { useState } from "react"
import { Button, CloseButton, Dialog, Field, Input, Portal } from "@chakra-ui/react"
import type { LocationFromMap } from '../../../interfaces/locationFromMap'
import type { LocationsMap } from '../../../interfaces/locationsMap'

export const EditLocationDialog = ({
    location,
    locationsMap,
    setLocationsMap,
    setShowEditLocationDialog,
    showEditLocationDialog
}: {
    location: LocationFromMap | null;
    locationsMap: LocationsMap;
    setLocationsMap: (locationsMap: LocationsMap) => void;
    setShowEditLocationDialog: (show: boolean) => void;
    showEditLocationDialog: boolean;
}) => {
  const [errorMessage, setErrorMessage] = useState("")
  const [nameIsInvalid, setNameIsInvalid] = useState(false)
  const [inputtedName, setInputtedName] = useState("")

  const validateCategoryName = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value
    if (inputValue === location?.name) {
        setNameIsInvalid(true)
        setErrorMessage("Name has to be different from the original")
        return
    }
    if (inputValue.length === 0 || !evt.target.value) {
        setNameIsInvalid(true)
        setErrorMessage("Name cannot be blank")
        return
    }
    if (!/[a-zA-Z0-9]/.test(inputValue.charAt(0))) {
        setNameIsInvalid(true)
        setErrorMessage("Name needs to start with an alphabet or number")
        return
    }

    setInputtedName(inputValue)
    setNameIsInvalid(false)
  }

  const editCategory = () => {
    if (!location) {
        console.error("no category to edit")
        return
    }

    if( Object.entries(locationsMap).some(([_, location]) => location.name.toLowerCase() === inputtedName.toLowerCase()) ) {
        setNameIsInvalid(true)
        setErrorMessage("Name already exists")
        return
    }

    const newCategoriesMap = {...locationsMap}
    newCategoriesMap[location.id] = {
        ...location,
        name: inputtedName,
    }
    setLocationsMap(newCategoriesMap)
    setErrorMessage("")
    setNameIsInvalid(false)
    setShowEditLocationDialog(false)
  }

  return (
    <Dialog.Root open={showEditLocationDialog}>
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <Dialog.Content>
                <Dialog.Header>
                <Dialog.Title>Edit category name</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Field.Root required invalid={nameIsInvalid}>
                    <Input placeholder={location?.name} onChange={validateCategoryName} />
                    <Field.ErrorText>{errorMessage}</Field.ErrorText>
                  </Field.Root>
                </Dialog.Body>
                <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline" onClick={() => setShowEditLocationDialog(false)}>Cancel</Button>
                </Dialog.ActionTrigger>
                <Button variant="outline" onClick={editCategory}>Save</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={() => setShowEditLocationDialog(false)} />
                </Dialog.CloseTrigger>
            </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
  )
}
