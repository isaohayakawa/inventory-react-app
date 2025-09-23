import { useEffect, useState, type ChangeEvent } from "react";
import { Alert, Box, Button, Container, Field, Input, NativeSelect, SimpleGrid } from "@chakra-ui/react"
import short from 'short-uuid'
import type { CategoriesMap } from "../../../interfaces/categoryMap"
import type { LocationsMap } from "../../../interfaces/locationsMap";
import type { Item } from "../../../interfaces/item";
import { toaster } from "../../ui/toaster";

export const AddEditItemForm = ({
  categoriesMap,
  itemToEdit,
  items,
  locationsMap,
  setItems,
  setItemToEdit,
  setShowEditAddItemForm
}: {
  categoriesMap: CategoriesMap;
  itemToEdit: Item | null;
  items: Item[];
  locationsMap: LocationsMap;
  setItems: (items: Item[]) => void;
  setItemToEdit: (item: Item | null) => void;
  setShowEditAddItemForm: (show: boolean) => void;
}) => {
    const [showDuplicateItemMessage, setShowDuplicateItemMessage] = useState(false)
    const [duplicateItem, setDuplicateItem] = useState<Item | null>(null)
    const [name, setName] = useState("")
    const [nameIsInvalid, setNameIsInvalid] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedCategoryIsInvalid, setSelectedCategoryIsInvalid] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
    const [selectedLocationIsInvalid, setSelectedLocationIsInvalid] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [quantityIsInvalid, setQuantityIsInvalid] = useState(false)
    const [quantityPerPackaging, setQuantityPerPackaging] = useState(0)
    const [quantityPerPackagingIsInvalid, setQuantityPerPackagingIsInvalid] = useState(false)
    const [unitsLeft, setUnitsLeft] = useState(0) // only for edit mode
    const [unitsLeftIsInvalid, setUnitsLeftIsInvalid] = useState(false)
    const [upc, setUpc] = useState("")
    const [expirationDate, setExpirationDate] = useState("")

    useEffect(() => {
      if (itemToEdit) {
        setName(itemToEdit.name)
        setSelectedCategory(itemToEdit.categoryId)
        setSelectedLocation(itemToEdit.locationId)
        setQuantity(itemToEdit.quantity)
        setQuantityPerPackaging(itemToEdit.totalQuantityPerPackaging || 0)
        setUnitsLeft(itemToEdit.quantityPerPackaging || 0)
        setUpc(itemToEdit.upc || "")
        setExpirationDate(itemToEdit.expirationDate || "")
      }
    }, [itemToEdit])

    const onChangeName = (evt: ChangeEvent<HTMLInputElement>) => {
      const inputtedName = evt.target.value

      if(inputtedName === "" || !inputtedName) {
        setNameIsInvalid(true)
      } else {
        setNameIsInvalid(false)
      }

      // name check for duplicate
      setDuplicateItem(null)
      const lowerCasedInputtedName = inputtedName.toLowerCase()
      const duplicateFound = items.some((currentItem) => {
        const lowercasedName = currentItem.name.toLowerCase()
        const found = lowercasedName === lowerCasedInputtedName
        if (found) {
          setDuplicateItem(currentItem)
        }
        return found
      })
      setShowDuplicateItemMessage(duplicateFound)

      setName(inputtedName)
    }

    const onChangeCategory = (evt: ChangeEvent<HTMLSelectElement>) => {
      const inputtedCategory = evt.target.value
      setSelectedCategory(inputtedCategory)
    }

    const onChangeLocation = (evt: ChangeEvent<HTMLSelectElement>) => {
      const inputtedLocation = evt.target.value
      setSelectedLocation(inputtedLocation)
    }

    const onChangeQuantity = (evt: ChangeEvent<HTMLInputElement>) => {
      const inputtedQuantity = Number(evt.target.value)
      if (inputtedQuantity < 1) {
        setQuantityIsInvalid(true)
        return
      }
      
      setQuantityIsInvalid(false)
      setQuantity(inputtedQuantity)
    }

    const onChangeUnitsLeft = (evt: ChangeEvent<HTMLInputElement>) => {
      const inputtedQuantity = Number(evt.target.value)
      if (inputtedQuantity < 1 || inputtedQuantity > quantityPerPackaging) {
        setUnitsLeftIsInvalid(true)
        return
      }
      
      setUnitsLeftIsInvalid(false)
      setUnitsLeft(inputtedQuantity)
    }

    const onChangeQuantityPerPackage = (evt: ChangeEvent<HTMLInputElement>) => {
      const inputtedQuantity = Number(evt.target.value)
      if (inputtedQuantity < 0) {
        setQuantityPerPackagingIsInvalid(true)
        return
      }
      
      setQuantityPerPackagingIsInvalid(false)
      setQuantityPerPackaging(inputtedQuantity)
    }

    const onChangeUpc = (evt: ChangeEvent<HTMLInputElement>) => {
      const inputtedUpc = evt.target.value

      // name check for duplicate
      setDuplicateItem(null)
      const duplicateFound = items.some((currentItem) => {
        const found = currentItem.upc === inputtedUpc
        if (found) {
          setDuplicateItem(currentItem)
        }
        return found
      })
      setShowDuplicateItemMessage(duplicateFound)

      setUpc(inputtedUpc)
    }

    const onChangeExpirationDate = (evt: ChangeEvent<HTMLInputElement>) => {
      const inputtedExpirationDate = evt.target.value
      setExpirationDate(inputtedExpirationDate)
    }

    const resetInvalidFlags = () => {
      setNameIsInvalid(false)
      setSelectedCategoryIsInvalid(false)
      setSelectedLocationIsInvalid(false)
      setQuantityIsInvalid(false)
    }

    const submit = () => {
      if (!selectedCategory || !selectedLocation || !name || !quantity) {
        if (!name) {
          setNameIsInvalid(true)
        }

        if (!quantity) {
          setQuantityIsInvalid(true)
        }

        if (!selectedCategory) {
          setSelectedCategoryIsInvalid(true)
        }

        if (!selectedLocation) {
          setSelectedLocationIsInvalid(true)
        }

        return
      }

      resetInvalidFlags()

      if (itemToEdit) {
        if (itemToEdit && quantityPerPackaging > 0 && (unitsLeft < 1 || unitsLeft > quantityPerPackaging)) {
          setUnitsLeftIsInvalid(true)
          return
        }

        const newItems = [...items]
        setItems(newItems.map((currentItem) => {
          if (itemToEdit.id === currentItem.id) {
            return {
              id: itemToEdit.id,
              name,
              image: null,
              categoryId: selectedCategory,
              locationId: selectedLocation,
              quantity,
              quantityPerPackaging: quantityPerPackaging > 0 ? unitsLeft : null,
              totalQuantityPerPackaging: quantityPerPackaging > 0 ? quantityPerPackaging : null,
              upc,
              expirationDate,
            }
          } else {
            return currentItem
          }
        }))
        setItemToEdit(null)
        setShowEditAddItemForm(false)
        return
      }
      
      const uuid = short.generate().toString()
      setItems([
        ...items,
        {
          id: uuid,
          name,
          image: null,
          categoryId: selectedCategory,
          locationId: selectedLocation,
          quantity,
          quantityPerPackaging: quantityPerPackaging > 0 ? quantityPerPackaging : null,
          totalQuantityPerPackaging: quantityPerPackaging > 0 ? quantityPerPackaging : null,
          upc,
          expirationDate,
        }
      ])
      setShowEditAddItemForm(false)
    }

    const incrementDuplicateProduct = () => {
      if (!duplicateItem) {
        console.error("no duplicate item found")
        return
      }

      const newItems = items.map((currentItem) => {
        if (currentItem.id === duplicateItem.id) {
          currentItem.quantity += 1
        }
        return currentItem
      })

      setItems(newItems)
      setShowDuplicateItemMessage(false)
      setShowEditAddItemForm(false)
      toaster.create({
        title: `${name} has been incremented by 1`,
        type: "info"
      })
    }

    const cancel = () => {
      setShowEditAddItemForm(false)
      setItemToEdit(null) // if editing
    }
    
    return (
      <Box margin="10">
        {
          showDuplicateItemMessage && duplicateItem && (
            <Alert.Root status="info" title="This is the alert title">
              <Alert.Indicator />
              <Alert.Title>
                Another {duplicateItem.name} (UPC ${duplicateItem.upc}) found in the list. Would you like to increment the quantity?{' '}
                <Button variant="outline" onClick={incrementDuplicateProduct}>Yes</Button>{' '}
                <Button variant="outline" onClick={() => setShowDuplicateItemMessage(false)}>Dismiss</Button>
              </Alert.Title>
            </Alert.Root>
          )
        }
        <SimpleGrid columns={2} gap="40px">
          <Container>
            <Container margin="2">
              <Field.Root required invalid={nameIsInvalid}>
                <Field.Label>
                  Name <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Item Name" value={name} onChange={onChangeName} />
              </Field.Root>
            </Container>
            <Container margin="2">
              <Field.Root required invalid={selectedCategoryIsInvalid}>
                <Field.Label>
                  Category <Field.RequiredIndicator />
                </Field.Label>
                <NativeSelect.Root size="sm" width="240px">
                  <NativeSelect.Field placeholder="Select a category" onChange={onChangeCategory}>
                    <>
                      {
                        Object.entries(categoriesMap).map(([_, category]) => (
                          <option key={category.id} value={category.id} selected={selectedCategory === category.id}>
                            {category.name}
                          </option>
                        ))
                      }
                      {/* <option value="new">Add New Category</option> TODO: need to implement*/}
                    </>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>
            </Container>
            <Container margin="2">
              <Field.Root required invalid={selectedLocationIsInvalid}>
                <Field.Label>
                  Location <Field.RequiredIndicator />
                </Field.Label>
                <NativeSelect.Root size="sm" width="240px">
                  <NativeSelect.Field placeholder="Select a location" onChange={onChangeLocation}>
                    <>
                      {
                        Object.entries(locationsMap).map(([_, location]) => (
                          <option key={location.id} value={location.id} selected={selectedLocation === location.id}>
                            {location.name}
                          </option>
                        ))
                      }
                      {/* <option value="new">Add New Location</option> TODO: need to implement*/}
                    </>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>
            </Container>
            <Container margin={2}>
              <SimpleGrid columns={2}  gap="20px">
                <Container margin={0} padding={0}>
                  <Field.Root required invalid={quantityIsInvalid}>
                    <Field.Label>Quantity <Field.RequiredIndicator /></Field.Label>
                    <Input type="number" placeholder="" onChange={onChangeQuantity} value={quantity} />
                  </Field.Root>
                </Container>
                <Container margin={0} padding={0}> 
                  <Field.Root invalid={quantityPerPackagingIsInvalid}>
                    <Field.Label>Units Per Package</Field.Label>
                    <Input type="number" placeholder="Optional" onChange={onChangeQuantityPerPackage} value={quantityPerPackaging} />
                  </Field.Root>
                </Container>
              </SimpleGrid>
              {
                itemToEdit && quantityPerPackaging > 0 && (
                  <SimpleGrid columns={2}  gap="20px">
                    <Container margin={0} padding={0}>
                      <Field.Root required invalid={unitsLeftIsInvalid}>
                        <Field.Label>Units Remaining (Opened Package)<Field.RequiredIndicator /></Field.Label>
                        <Input type="number" placeholder="" onChange={onChangeUnitsLeft} value={unitsLeft} />
                      </Field.Root>
                    </Container>
                  </SimpleGrid>
                )
              }
            </Container>
          </Container>
          <Container>
            <Container margin="2">
              <Field.Root>
                <Field.Label>UPC</Field.Label>
                <Input placeholder="Optional" value={upc} onChange={onChangeUpc}/>
              </Field.Root>
            </Container>
            <Container margin="2">
              <Field.Root>
                <Field.Label>Expiration Date</Field.Label>
                <Input placeholder="" type="date" value={expirationDate} onChange={onChangeExpirationDate} />
              </Field.Root>
            </Container>
          </Container>
        </SimpleGrid>
        <Container display="flex" alignContent="flex-start" margin={2} padding={12}>
          <Box margin="2">
            <Button variant="outline" onClick={submit} disabled={nameIsInvalid || quantityIsInvalid}>Save</Button>
          </Box>
          <Box margin="2">
            <Button variant="outline" onClick={cancel}>Cancel</Button>
          </Box>
        </Container>
      </Box>
    )
}
