import { Badge, Table } from "@chakra-ui/react"
import { CalendarCheck, CalendarX } from 'lucide-react'
import type { Item } from "../../../interfaces/item";

const ICON_SIZE = 14

export const ItemExpirationDateCell = ({ item }: { item: Item }) => {
    const expirationDate: Date | null = item.expirationDate ? new Date(item.expirationDate) : null
    const todayDate = new Date()

    return (
        <Table.Cell textAlign="end">
          {
            expirationDate
              ? (
                <>
                  {
                    expirationDate > todayDate
                      ? (
                        <Badge colorPalette="green">
                          <CalendarCheck size={ICON_SIZE} />
                          {item.expirationDate}
                        </Badge>
                      )
                      : (
                        <Badge colorPalette="red">
                          <CalendarX size={ICON_SIZE} />
                          {item.expirationDate}
                        </Badge>
                      )
                  }
                </>
              )
              : <>-</>
          }
        </Table.Cell>
      )
}