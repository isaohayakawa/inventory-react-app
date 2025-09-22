import { Table } from "@chakra-ui/react"
import type { Item } from "../../../interfaces/item"
import type { CategoriesMap } from "../../../interfaces/categoryMap";
import type { LocationsMap } from "../../../interfaces/locationsMap";
import { ItemQuantityCell } from "./ItemQuantityCell";
import { ItemExpirationDateCell } from "./ItemExpirationDateCell";
import { ItemNameCell } from "./ItemNameCell";
import { ItemActionsCell } from "./ItemActionsCell";

export const ItemsDataTable = ({
  categoriesMap,
  items,
  itemsToDisplay,
  locationsMap,
  setItems
}: {
  categoriesMap: CategoriesMap;
  items: Item[];
  itemsToDisplay: Item[];
  locationsMap: LocationsMap;
  setItems: (items: Item[]) => void;
}) => {
  

  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader>Location</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Quantity</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Expiration Date</Table.ColumnHeader>
          <Table.ColumnHeader>Actions</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {itemsToDisplay.map((item) => (
          <Table.Row key={item.id}>
            <ItemNameCell item={item} />
            <Table.Cell>{categoriesMap[item.categoryId].name || '-'}</Table.Cell>
            <Table.Cell>{locationsMap[item.locationId].name || '-'}</Table.Cell>
            <ItemQuantityCell item={item} />
            <ItemExpirationDateCell item={item} />
            <ItemActionsCell
              item={item}
              items={items}
              setItems={setItems}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
