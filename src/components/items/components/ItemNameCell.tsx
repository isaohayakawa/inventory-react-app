import { Table, Text } from "@chakra-ui/react"
import type { Item } from "../../../interfaces/item"

export const ItemNameCell = ({item }: { item: Item }) => {
  return (
    <Table.Cell>
      {item.name}
      {
        item.upc ? <Text textStyle="xs">UPC: {item.upc}</Text> : null
      }
    </Table.Cell>
  )
}
