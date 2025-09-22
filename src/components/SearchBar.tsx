import type { ChangeEvent } from 'react'
import { Input } from "@chakra-ui/react"

export const SearchBar = ({search, searchItemName, setSearchInputValue}: {
  search: (value: string) => void;
  searchItemName: string;
  setSearchInputValue: (value: string) => void;
}) => {
  const startSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const searchValue = evt.target.value
    search(searchValue)
    setSearchInputValue(searchValue)
  }

  return (
    <Input placeholder={`Type in to search for a ${searchItemName}`} onChange={startSearch} />
  )
}
