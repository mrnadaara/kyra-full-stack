import { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import styles from '../../styles/Location.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  sx: {
    "&& .Mui-selected": {
      backgroundColor: "rgb(97, 97, 97) !important",
      color: "white"
    }
  }
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
  };
}

type CategoryType = {
  label: string;
  id: string;
};

type CategoryProp = {
  categories: CategoryType[];
  updateSelectedCategories: (selectedCategories: string) => void
};

type useCategoryType = {
  categories: CategoryType[];
  isLoading: boolean;
  isError: any;
};

export default function SelectCategory({categories, updateSelectedCategories}: CategoryProp) {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof selectedCategory>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    updateSelectedCategories(selectedCategory.join(','));
  }, [selectedCategory]);

  return (
    <div>
      <FormControl className={styles.select}>
        <InputLabel className={styles["chip-label"]} id="demo-multiple-chip-label">Select any Category</InputLabel>
        <Select
          IconComponent={(props) => <ArrowDropDownCircleIcon {...props} sx={{ color: "white !important", mr: 2 }}/>}
          variant="filled"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedCategory}
          onChange={handleChange}
          input={<OutlinedInput className={styles["input-label"]} id="select-multiple-chip" label="Select any Category" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip sx={{ backgroundColor: "rgb(97, 97, 97) !important", color: "white" }} key={value} label={categories?.find(cat => cat.id === value)?.label} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categories.map((category: CategoryType) => (
            <MenuItem
              key={category.id}
              value={category.id}
              style={getStyles(category.id, selectedCategory, theme)}
            >
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
