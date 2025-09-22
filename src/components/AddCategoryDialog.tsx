import type { ChangeEvent } from 'react'
import { useState } from "react"
import { Button, CloseButton, Dialog, Field, Input, Portal } from "@chakra-ui/react"
import short from 'short-uuid'
import type { CategoriesMap } from '../interfaces/categoryMap'

export const AddCategoryDialog = ({
    categoriesMap,
    setCategoriesMap,
    setShowAddCategoryDialog,
    showAddCategoryDialog
}: {
    categoriesMap: CategoriesMap;
    setCategoriesMap: (categoriesMap: CategoriesMap) => void;
    setShowAddCategoryDialog: (show: boolean) => void;
    showAddCategoryDialog: boolean;
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
    if( Object.entries(categoriesMap).some(([_, category]) => category.name.toLowerCase() === inputtedName.toLowerCase()) ) {
        setNameIsInvalid(true)
        setErrorMessage("Name already exists")
        return
    }

    const uuid = short.generate()
    setCategoriesMap({
        ...categoriesMap,
        [uuid]: {
            id: uuid,
            name: inputtedName,
            assignedTo: 0,
        }
    })
    setErrorMessage("")
    setNameIsInvalid(false)
    setShowAddCategoryDialog(false)
  }

  return (
    <Dialog.Root open={showAddCategoryDialog}>
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <Dialog.Content>
                <Dialog.Header>
                <Dialog.Title>Add a new category</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Field.Root required invalid={nameIsInvalid}>
                    <Input placeholder="Type in a new category name" onChange={validateCategoryName} />
                    <Field.ErrorText>{errorMessage}</Field.ErrorText>
                  </Field.Root>
                </Dialog.Body>
                <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline" onClick={() => setShowAddCategoryDialog(false)}>Cancel</Button>
                </Dialog.ActionTrigger>
                <Button variant="outline" onClick={addCategory} disabled={nameIsInvalid || inputtedName === ""}>Add</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={() => setShowAddCategoryDialog(false)} />
                </Dialog.CloseTrigger>
            </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
  )
}
