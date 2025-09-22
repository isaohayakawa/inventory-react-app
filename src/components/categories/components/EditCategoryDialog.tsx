import type { ChangeEvent } from 'react'
import { useState } from "react"
import { Button, CloseButton, Dialog, Field, Input, Portal } from "@chakra-ui/react"
import type { CategoriesMap } from '../../../interfaces/categoryMap'
import type { CategoryFromMap } from '../../../interfaces/categoryFromMap'

export const EditCategoryDialog = ({
    category,
    categoriesMap,
    setCategoriesMap,
    setShowEditCategoryDialog,
    showEditCategoryDialog
}: {
    category: CategoryFromMap | null;
    categoriesMap: CategoriesMap;
    setCategoriesMap: (categoriesMap: CategoriesMap) => void;
    setShowEditCategoryDialog: (show: boolean) => void;
    showEditCategoryDialog: boolean;
}) => {
  const [errorMessage, setErrorMessage] = useState("")
  const [nameIsInvalid, setNameIsInvalid] = useState(false)
  const [inputtedName, setInputtedName] = useState("")

  const validateCategoryName = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value
    if (inputValue === category?.name) {
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
    if (!category) {
        console.error("no category to edit")
        return
    }

    if( Object.entries(categoriesMap).some(([_, category]) => category.name.toLowerCase() === inputtedName.toLowerCase()) ) {
        setNameIsInvalid(true)
        setErrorMessage("Name already exists")
        return
    }

    const newCategoriesMap = {...categoriesMap}
    newCategoriesMap[category.id] = {
        ...category,
        name: inputtedName,
    }
    setCategoriesMap(newCategoriesMap)
    setErrorMessage("")
    setNameIsInvalid(false)
    setShowEditCategoryDialog(false)
  }

  return (
    <Dialog.Root open={showEditCategoryDialog}>
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <Dialog.Content>
                <Dialog.Header>
                <Dialog.Title>Edit category name</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Field.Root required invalid={nameIsInvalid}>
                    <Input placeholder={category?.name} onChange={validateCategoryName} />
                    <Field.ErrorText>{errorMessage}</Field.ErrorText>
                  </Field.Root>
                </Dialog.Body>
                <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline" onClick={() => setShowEditCategoryDialog(false)}>Cancel</Button>
                </Dialog.ActionTrigger>
                <Button variant="outline" onClick={editCategory}>Save</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={() => setShowEditCategoryDialog(false)} />
                </Dialog.CloseTrigger>
            </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
  )
}
