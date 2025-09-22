import { useState } from 'react'
import { Button, CloseButton, Dialog, IconButton, Portal, Table } from "@chakra-ui/react"
import { Minus, Pencil, Trash } from 'lucide-react'
import type { Item } from "../../../interfaces/item"

const BUTTON_SIZE = "xs"
const BUTTON_VARIANT = "ghost"
const ICON_SIZE = 10

export const ItemActionsCell = ({ item, items, setItems }: {
  item: Item;
  items: Item[];
  setItems: (items: Item[]) => void;
}) => {

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

  const closeDeleteConfirmationDialog = () => setDeleteConfirmationOpen(false)

  const deleteItem = () => {
    const newItems: Item[] = []
    items.forEach((itemFromItems) => {
      if (itemFromItems.id !== item.id) {
        newItems.push(itemFromItems)
      }
    })

    setItems(newItems)
    closeDeleteConfirmationDialog()
  }

  const decrementQuantity = () => {
    const newItem: Item = { ...item }
    if (item.quantityPerPackaging) {
      if (item.quantityPerPackaging === 1) {
        if (item.quantity > 1) {
          newItem.quantityPerPackaging = newItem.totalQuantityPerPackaging
          newItem.quantity = item.quantity - 1
        } else {
          setDeleteConfirmationOpen(true)
          return
        }
      } else {
        newItem.quantityPerPackaging = item.quantityPerPackaging - 1
      }
    } else {
      if (item.quantity > 1) {
        newItem.quantity = item.quantity - 1
      } else {
        setDeleteConfirmationOpen(true)
        return
      }
    }

    setItems(items.map((itemFromItems) => {
      return itemFromItems.id === item.id ? newItem : itemFromItems
    }))
  }

  const deleteAction = () => {
    setDeleteConfirmationOpen(true)
  }

  return (
    <>
      <Table.Cell>
        <IconButton
          aria-label="Use one item"
          size={BUTTON_SIZE}
          onClick={decrementQuantity}
          variant={BUTTON_VARIANT}
        >
          <Minus size={ICON_SIZE} />
        </IconButton>
        <IconButton
          aria-label="Edit item"
          size={BUTTON_SIZE}
          variant={BUTTON_VARIANT}
        >
          <Pencil size={ICON_SIZE} />
        </IconButton>
        <IconButton
          aria-label="Delete item"
          size={BUTTON_SIZE}
          onClick={deleteAction}
          variant={BUTTON_VARIANT}
        >
          <Trash size={ICON_SIZE} />
        </IconButton>
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
                  Are you sure you want to delete {item.name}?
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
