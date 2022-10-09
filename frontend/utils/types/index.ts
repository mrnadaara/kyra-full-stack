export type PlacesCategoryType = {
  label: string;
  img: string;
};

export type CategoryType = {
  label: string;
  id: string;
};

export type PlaceType = {
  id: string;
  name: string;
  categories: PlacesCategoryType[];
  distance: number;
  formatted_address: string;
  photo: string;
}

export type useCategoryType = {
  categories: CategoryType[];
  isLoading: boolean;
  isError: any;
};

export type useGeoLocationType = {
  lat: number;
  lon: number;
  geoLoading: boolean;
  geoError: any;
};

export type usePlaceType = {
  places: PlaceType[] | [];
  isLoading: boolean;
  isError: any;
};

export type CategoryProp = {
  categories: CategoryType[];
  updateSelectedCategories: (selectedCategories: string) => void;
  loading: boolean;
  error: any;
};

export type PlacesProps = {
  places: PlaceType[];
  loading: boolean;
  error: any;
};

export type CoordinatesProps = {
  lat: number;
  lon: number;
  loading: boolean;
  error: any;
}

export type DialogProps = {
  loading: boolean;
}

export type placesParamsType = {
  lat: number;
  lon: number;
  categories: string;
  [index: string]: string | number;
}