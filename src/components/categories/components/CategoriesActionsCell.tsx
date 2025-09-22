import { useState } from 'react'
import { Button, CloseButton, Dialog, IconButton, Portal, Table } from "@chakra-ui/react"
import { Pencil, Trash } from 'lucide-react'
import type { CategoriesMap } from '../../../interfaces/categoryMap'
import type { CategoryFromMap } from '../../../interfaces/categoryFromMap'
import { toaster } from '../../ui/toaster'
import { Tooltip } from '../../ui/tooltip'

const BUTTON_SIZE = "xs"
const BUTTON_VARIANT = "ghost"
const ICON_SIZE = 10

export const CategoriesActionsCell = ({ category, categoriesMap, setCategoriesMap, setCategoryToEdit, setShowEditCategoryDialog }: {
  category: CategoryFromMap;
  categoriesMap: CategoriesMap;
  setCategoriesMap: (categoriesMap: CategoriesMap) => void;
  setCategoryToEdit: (category: CategoryFromMap) => void;
  setShowEditCategoryDialog: (show: boolean) => void;
}) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

  const closeDeleteConfirmationDialog = () => setDeleteConfirmationOpen(false)

  const deleteItem = () => {
    const newCategoriesMap: CategoriesMap = {}
    Object.values(categoriesMap).forEach((categoryInMap) => {
      if (categoryInMap.id !== category.id) {
        newCategoriesMap[categoryInMap.id] = categoryInMap
      }
    })
    setCategoriesMap(newCategoriesMap)
    closeDeleteConfirmationDialog()
  }

  const deleteAction = () => {
    if (category.assignedTo > 0) {
      toaster.create({
        title: `You have ${category.assignedTo} items assigned to ${category.name}`,
        description: `You have ${category.assignedTo} items assigned to ${category.name}. Please reassign those items to another category and try deleting again.`,
        type: "error"
      })
      return
    }

    setDeleteConfirmationOpen(true)
  }

  const editAction = () => {
    setCategoryToEdit(category)
    setShowEditCategoryDialog(true)
  }

  return (
    <>
      <Table.Cell>
        <Tooltip content="Edit category">
          <IconButton
            aria-label="Edit category"
            size={BUTTON_SIZE}
            variant={BUTTON_VARIANT}
            onClick={editAction}
          >
            <Pencil size={ICON_SIZE} />
          </IconButton>
        </Tooltip>
        <Tooltip content="Delete category">
          <IconButton
            aria-label="Delete category"
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
                  Are you sure you want to delete {category.name}?
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
