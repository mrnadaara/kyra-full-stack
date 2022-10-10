import { useEffect, useState, useCallback, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
  MenuProps,
  getStyles
} from './config';
import styles from '../../styles/Location.module.scss';
import {
  CategoryType,
  CategoryProp,
} from '../../utils/types';

export default function SelectCategory({
  categories,
  updateSelectedCategories,
  loading,
  error,
}: CategoryProp) {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const selectedCategoryRef = useRef<any | null>(null);
  const [timer, setTimer] = useState<any>(0);
  const handleChange = (event: SelectChangeEvent<typeof selectedCategory>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const updateCategories = () => {
    if (typeof timer === 'number' && timer !== 0) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => updateSelectedCategories(selectedCategoryRef.current.join(',')), 2000));
  };

  useEffect(() => {
    selectedCategoryRef.current = selectedCategory;
    updateCategories();
  }, [selectedCategory]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex' }}>
        <h3 className={styles.error}>
          {error}
        </h3>
      </Box>
    );
  }

  return (
    <div className={styles["select-container"]}>
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
      <Tooltip title="Clear Category">
        <IconButton onClick={() => setSelectedCategory([])} aria-label="clear-all">
          <ClearAllIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
