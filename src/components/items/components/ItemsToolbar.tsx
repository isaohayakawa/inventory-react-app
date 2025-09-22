import { Container, IconButton } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import { Tooltip } from '../../ui/tooltip'

const BUTTON_SIZE = "xs"
const BUTTON_TEXT_COLOR = "black"
const ICON_SIZE = 10

export const ItemsToolbar = ({ setShowAddItemForm }: { setShowAddItemForm: (show: boolean) => void}) => {
    return (
      <Container display="flex" justifyContent="flex-end" width="100%" margin={1}>
        <Tooltip content="Add new item">
          <IconButton
            aria-label="Add new item"
            size={BUTTON_SIZE}
            color={BUTTON_TEXT_COLOR}
            variant="ghost"
            onClick={() => setShowAddItemForm(true)}
            padding={1}
          >
            <Plus size={ICON_SIZE} />
            Add Item
          </IconButton>
        </Tooltip>
      </Container>
    )
}