import type { ChangeEvent } from 'react'
import { useState } from "react"
import { Button, CloseButton, Dialog, Field, Input, Portal } from "@chakra-ui/react"
import short from 'short-uuid'
import type { LocationsMap } from '../interfaces/locationsMap'

export const AddLocationDialog = ({
    locationsMap,
    setLocationsMap,
    setShowAddLocationDialog,
    showAddLocationDialog
}: {
    locationsMap: LocationsMap;
    setLocationsMap: (locationsMap: LocationsMap) => void;
    setShowAddLocationDialog: (show: boolean) => void;
    showAddLocationDialog: boolean;
}) => {
  const [errorMessage, setErrorMessage] = useState("")
  const [nameIsInvalid, setNameIsInvalid] = useState(false)
  const [inputtedName, setInputtedName] = useState("")

  const validateCategoryName = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value
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

  const addCategory = () => {
    if( Object.entries(locationsMap).some(([_, location]) => location.name.toLowerCase() === inputtedName.toLowerCase()) ) {
        setNameIsInvalid(true)
        setErrorMessage("Name already exists")
        return
    }

    const uuid = short.generate()
    setLocationsMap({
        ...locationsMap,
        [uuid]: {
            id: uuid,
            name: inputtedName,
            assignedTo: 0,
        }
    })
    setErrorMessage("")
    setNameIsInvalid(false)
    setShowAddLocationDialog(false)
  }

  return (
    <Dialog.Root open={showAddLocationDialog}>
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <Dialog.Content>
                <Dialog.Header>
                <Dialog.Title>Add a new location</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Field.Root required invalid={nameIsInvalid}>
                    <Input placeholder="Type in a new location name" onChange={validateCategoryName} />
                    <Field.ErrorText>{errorMessage}</Field.ErrorText>
                  </Field.Root>
                </Dialog.Body>
                <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline" onClick={() => setShowAddLocationDialog(false)}>Cancel</Button>
                </Dialog.ActionTrigger>
                <Button variant="outline" onClick={addCategory} disabled={nameIsInvalid || inputtedName === ""}>Add</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={() => setShowAddLocationDialog(false)} />
                </Dialog.CloseTrigger>
            </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
  )
}
