import type { Category } from "../interfaces/category"
import type { CategoriesMap } from "../interfaces/categoryMap"
import type { Item } from "../interfaces/item"

export const generateCategories = (categories: Category[], items: Item[]) => {
  const categoriesMap: CategoriesMap = {}
  categories.forEach((category) => {
    categoriesMap[category.id.toString()] = {
      name: category.name,
      assignedTo: 0,
      id: category.id,
    }
  })

  items.forEach((item) => {
    categoriesMap[item.categoryId].assignedTo += 1
  })

  return categoriesMap;
}

export const categoriesMapToArray = (categoriesMap: CategoriesMap) => {
  return Object.entries(categoriesMap).map(([_, category]) => category)
}