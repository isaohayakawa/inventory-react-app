import { useState } from "react";
import { Table, Tag } from "@chakra-ui/react"
import { Package } from "lucide-react";
import type { CategoriesMap } from "../../../interfaces/categoryMap";
import { CategoriesActionsCell } from "./CategoriesActionsCell";
import type { CategoryFromMap } from "../../../interfaces/categoryFromMap";
import { EditCategoryDialog } from "./EditCategoryDialog";

export const CategoriesDataTable = ({ catgories, categoriesMap, setCategoriesMap }: {
  catgories: CategoryFromMap[];
  categoriesMap: CategoriesMap;
  setCategoriesMap: (categories: CategoriesMap) => void;
}) => {
  const [showEditCategoryDialog, setShowEditCategoryDialog] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryFromMap | null>(null)
  
  return (
    <>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {catgories.map((category) => (
            <Table.Row key={category.id}>
              <Table.Cell>
                {category.name}{' '}
                {
                  category.assignedTo > 0 && (
                    <Tag.Root>
                      <Tag.StartElement>
                        <Package />
                      </Tag.StartElement>
                      <Tag.Label>Assigned to {category.assignedTo} items</Tag.Label>
                    </Tag.Root>
                  )
                }
              </Table.Cell>
              <CategoriesActionsCell
                category={category}
                categoriesMap={categoriesMap}
                setCategoriesMap={setCategoriesMap}
                setCategoryToEdit={setCategoryToEdit}
                setShowEditCategoryDialog={setShowEditCategoryDialog}
              />
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <EditCategoryDialog
        category={categoryToEdit}
        categoriesMap={categoriesMap}
        setCategoriesMap={setCategoriesMap}
        setShowEditCategoryDialog={setShowEditCategoryDialog}
        showEditCategoryDialog={showEditCategoryDialog}
      />
    </>
  )
}
