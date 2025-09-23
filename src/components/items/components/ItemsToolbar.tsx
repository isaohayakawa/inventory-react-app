import { Container, IconButton } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

const BUTTON_SIZE = "xs"
const BUTTON_TEXT_COLOR = "black"
const ICON_SIZE = 10

export const ItemsToolbar = ({ setShowEditAddItemForm }: { setShowEditAddItemForm: (show: boolean) => void}) => {
    return (
      <Container display="flex" justifyContent="flex-end" width="100%" margin={1}>
        <IconButton
          aria-label="Add new item"
          size={BUTTON_SIZE}
          color={BUTTON_TEXT_COLOR}
          variant="ghost"
          onClick={() => setShowEditAddItemForm(true)}
          padding={1}
        >
          <Plus size={ICON_SIZE} />
          Add Item
        </IconButton>
      </Container>
    )
}