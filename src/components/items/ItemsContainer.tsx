import { useEffect, useState } from 'react'
import { Container } from '@chakra-ui/react'
import { ItemsDataTable } from './components/ItemsDataTable'
import { SearchBar } from '../SearchBar'

import type { Item } from '../../interfaces/item'
import type { CategoriesMap } from '../../interfaces/categoryMap'
import type { LocationsMap } from '../../interfaces/locationsMap'
import { ItemsToolbar } from './components/ItemsToolbar'
import { AddEditItemForm } from './components/AddEditItemForm'

export const ItemsContainer = ({ categoriesMap, disposeItem, items, locationsMap, setItems }:
{ categoriesMap: CategoriesMap;
  disposeItem: (item: Item) => void;
  items: Item[];
  locationsMap: LocationsMap;
  setItems: (items: Item[]) => void;
}) => {
  const [itemsToDisplay, setItemsToDisplay] = useState(items)
  const [searchInputValue, setSearchInputValue] = useState("")
  const [showAddEditItemForm, setShowEditAddItemForm] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null)
  const search = (searchValue: string) => {
    if (searchValue === "" || !searchValue) {
      setItemsToDisplay(items)
      return
    }

    const newItemsToDisplay: Item[] = []
    const lowerCaseSearchValue = searchValue.toLowerCase()
    items.forEach((item) => {
      const itemName = item.name.toLowerCase()
      // const upcString = item.upc?.toString()
      if (itemName.search(lowerCaseSearchValue) !== -1) {
        newItemsToDisplay.push(item)
      }/*  else if (upcString?.search(lowerCaseSearchValue) !== -1) {
        newItemsToDisplay.push(item)
      } */
    })
    setItemsToDisplay(newItemsToDisplay)
  }

  // Note: when any data changes in the items array, if there is a search already set,
  // the rows already displayed need to get updated
  useEffect(() => {
    search(searchInputValue)
  }, [items])

  return (
    <Container
      borderWidth="1px"
      borderColor="border.disabled"
      color="fg.disabled"
    >
      {!showAddEditItemForm && (
        <>
          <ItemsToolbar setShowEditAddItemForm={setShowEditAddItemForm} />
          <SearchBar
            search={search}
            searchItemName="item name"
            setSearchInputValue={setSearchInputValue}
          />
          <ItemsDataTable
            categoriesMap={categoriesMap}
            disposeItem={disposeItem}
            items={items}
            itemsToDisplay={itemsToDisplay}
            locationsMap={locationsMap}
            setItemToEdit={setItemToEdit}
            setItems={setItems}
            setShowEditAddItemForm={setShowEditAddItemForm}
          />
        </>
      )}
      {
        showAddEditItemForm && <AddEditItemForm
          categoriesMap={categoriesMap}
          itemToEdit={itemToEdit}
          items={items}
          locationsMap={locationsMap}
          setItems={setItems}
          setItemToEdit={setItemToEdit}
          setShowEditAddItemForm={setShowEditAddItemForm} 
        />
      }
    </Container>
  )
}
