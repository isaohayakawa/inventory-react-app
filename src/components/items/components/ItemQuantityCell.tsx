import { Table } from "@chakra-ui/react"
import type { Item } from "../../../interfaces/item"

export const ItemQuantityCell = ({item }: { item: Item }) => {
  return (
    <Table.Cell textAlign="end">
      {item.quantity}
      {
        item.quantityPerPackaging && item.totalQuantityPerPackaging
          ? <>{" "}({item.quantityPerPackaging} of {item.totalQuantityPerPackaging} items)</>
          : null
      }
    </Table.Cell>
  )
}
