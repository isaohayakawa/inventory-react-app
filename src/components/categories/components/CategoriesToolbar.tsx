import { Container, IconButton } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

const BUTTON_SIZE = "xs"
const BUTTON_TEXT_COLOR = "black"
const ICON_SIZE = 10

export const CategoriesToolbar = ({ setShowAddCategoryDialog }: { setShowAddCategoryDialog: (show: boolean) => void}) => {
    return (
      <Container display="flex" justifyContent="flex-end" width="100%" margin={1}>
        <IconButton
          aria-label="Add new category"
          size={BUTTON_SIZE}
          color={BUTTON_TEXT_COLOR}
          variant="ghost"
          onClick={() => setShowAddCategoryDialog(true)}
          padding={1}
        >
          <Plus size={ICON_SIZE} />
          Add Category
        </IconButton>
      </Container>
    )
}