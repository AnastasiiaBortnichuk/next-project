import { BASE_URL, URL_SEARCH } from './constants';

export const handleClick = (prop, setProp, product, id) => {
  if (prop.length === 0) {
    setProp([product]);
  } else {
    setProp(
      prop.some((item) => item.id === id)
        ? [...prop.filter((item) => item.id !== id)]
        : [...prop, product]
    );
  }
};

export const isAdded = (list, id) => {
  return list.some((purchase) => purchase.id === id);
};

export const updateTitle = (title: string) => title.replace(/_/g, ' ');

export const fetchData = async (param) => {
  const res = await fetch(`${BASE_URL}${URL_SEARCH}${param}`);
  return await res.json();
};
