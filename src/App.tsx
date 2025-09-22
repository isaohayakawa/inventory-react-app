import { useState } from 'react'
import { Box, Tabs } from '@chakra-ui/react'
import { ChartLine, MapPin, Package, Tag } from 'lucide-react'

import { AnalyticsContainer } from './components/analytics/AnalyticsContainer'
import { CategoriesContainer } from './components/categories/CategoriesContainer'
import { ItemsContainer } from './components/items/ItemsContainer'
import { LocationsContainer } from './components/locations/LocationsContainer'

// interfaces
import type { Item } from './interfaces/item'
import type { CategoriesMap } from './interfaces/categoryMap'
import type { LocationsMap } from './interfaces/locationsMap'

// data consts
import { ITEMS_DATA } from './data/items'
import { CATEGORIES_DATA } from './data/categories'
import { LOCATIONS_DATA } from './data/locations'

import { generateCategories } from './utils/categories'
import { mapLocations } from './utils/locations'

const ICON_SIZE = 18

function App() {
  const [items, setItems] = useState<Item[]>(ITEMS_DATA)
  const [categoriesMap, setCategoriesMap] = useState<CategoriesMap>(generateCategories(CATEGORIES_DATA, items))
  const [locationsMap, setLocationsMap] = useState<LocationsMap>(mapLocations(LOCATIONS_DATA, items))

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
          <ItemsContainer />
        </Tabs.Content>
        <Tabs.Content value="locations" className="tab-content">
          <LocationsContainer />
        </Tabs.Content>
        <Tabs.Content value="categories" className="tab-content">
          <CategoriesContainer />
        </Tabs.Content>
        <Tabs.Content value="analytics" className="tab-content">
          <AnalyticsContainer />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}

export default App
