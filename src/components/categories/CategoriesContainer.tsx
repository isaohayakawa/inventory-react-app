import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react"

import { CategoriesDataTable } from "./components/CategoriesDataTable"
import { CategoriesToolbar } from "./components/CategoriesToolbar";
import { SearchBar } from "../SearchBar";

import { categoriesMapToArray } from "../../utils/categories";
import type { CategoriesMap } from "../../interfaces/categoryMap"

import type { CategoryFromMap } from "../../interfaces/categoryFromMap";

export const CategoriesContainer = ({
  categoriesMap,
  setCategoriesMap,
  setShowAddCategoryDialog
}: {
  categoriesMap: CategoriesMap;
  setCategoriesMap: (categories: CategoriesMap) => void;
  setShowAddCategoryDialog: (show: boolean) => void;
}) => {
  const [catgoriesToDisplay, setCategoriesToDisplay] = useState<CategoryFromMap[]>(categoriesMapToArray(categoriesMap))
  const [searchInputValue, setSearchInputValue] = useState("")
  
  useEffect(() => {
    search(searchInputValue)
  }, [categoriesMap])

  const search = (searchValue: string) => {
    if (searchValue === "" || !searchValue) {
      setCategoriesToDisplay(categoriesMapToArray(categoriesMap))
      return
    }

    const newCategoriesToDisplay: CategoryFromMap[] = []
    const lowerCaseSearchValue = searchValue.toLowerCase()
    Object.keys(categoriesMap).forEach((id: string) => {
      const lowerCasedName = categoriesMap[id].name.toLowerCase()
      if (lowerCasedName.search(lowerCaseSearchValue) !== -1) {
        newCategoriesToDisplay.push(categoriesMap[id])
      }
    })

    setCategoriesToDisplay(newCategoriesToDisplay)
  }

  return (
    <Container
      borderWidth="1px"
      borderColor="border.disabled"
      color="fg.disabled"
    >
      <CategoriesToolbar setShowAddCategoryDialog={setShowAddCategoryDialog}/>
      <SearchBar search={search} searchItemName="category" setSearchInputValue={setSearchInputValue} />
      <CategoriesDataTable
        catgories={catgoriesToDisplay}
        categoriesMap={categoriesMap}
        setCategoriesMap={setCategoriesMap}
      />
    </Container>
  )
}
