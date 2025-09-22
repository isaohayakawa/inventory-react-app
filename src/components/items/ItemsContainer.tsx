import { useEffect, useState } from 'react'
import { Container } from '@chakra-ui/react'
import { ItemsDataTable } from './components/ItemsDataTable'
import { SearchBar } from '../SearchBar'

import type { Item } from '../../interfaces/item'
import type { CategoriesMap } from '../../interfaces/categoryMap'
import type { LocationsMap } from '../../interfaces/locationsMap'
import { ItemsToolbar } from './components/ItemsToolbar'
import { AddItemForm } from './components/AddItemForm'

export const ItemsContainer = ({ categoriesMap, items, locationsMap, setItems }:
{ categoriesMap: CategoriesMap;
  items: Item[];
  locationsMap: LocationsMap;
  setItems: (items: Item[]) => void;
}) => {
  const [itemsToDisplay, setItemsToDisplay] = useState(items)
  const [searchInputValue, setSearchInputValue] = useState("")
  const [showAddItemForm, setShowAddItemForm] = useState(false)
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
      {!showAddItemForm && (
        <>
          <ItemsToolbar setShowAddItemForm={setShowAddItemForm} />
          <SearchBar
            search={search}
            searchItemName="item name"
            setSearchInputValue={setSearchInputValue}
          />
          <ItemsDataTable
            categoriesMap={categoriesMap}
            items={items}
            itemsToDisplay={itemsToDisplay}
            locationsMap={locationsMap}
            setItems={setItems}
          />
        </>
      )}
      {
        showAddItemForm && <AddItemForm
          categoriesMap={categoriesMap}
          items={items}
          locationsMap={locationsMap}
          setItems={setItems}
          setShowAddItemForm={setShowAddItemForm} 
        />
      }
    </Container>
  )
}
