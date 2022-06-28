import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Search = () => {
  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>

        <Input
          type="tel"
          placeholder="Search for products, categories, tags,..."
        />
      </InputGroup>
    </FormControl>
  );
};

export default Search;
