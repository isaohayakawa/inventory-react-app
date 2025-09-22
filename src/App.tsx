import { Box, Tabs } from '@chakra-ui/react'
import { ChartLine, MapPin, Package, Tag } from 'lucide-react'

const ICON_SIZE = 18

function App() {

  return (
    <Box width="100%">
      <Tabs.Root variant="line" defaultValue="items">
        <Tabs.List>
          <Tabs.Trigger value="items">
            <Package size={ICON_SIZE} />
            Items
          </Tabs.Trigger>
          <Tabs.Trigger value="locations">
            <MapPin size={ICON_SIZE} />
            Locations
          </Tabs.Trigger>
          <Tabs.Trigger value="categories">
            <Tag size={ICON_SIZE} />
            Categories
          </Tabs.Trigger>
          <Tabs.Trigger value="analytics">
            <ChartLine size={ICON_SIZE} />
            Analytics
          </Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="items" className="tab-content">
          Items
        </Tabs.Content>
        <Tabs.Content value="locations" className="tab-content">
          Locations
        </Tabs.Content>
        <Tabs.Content value="categories" className="tab-content">
          Categories
        </Tabs.Content>
        <Tabs.Content value="analytics" className="tab-content">
          Analytics
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}

export default App
