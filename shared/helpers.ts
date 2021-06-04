import { Dispatch } from 'react';
import { BASE_JSON_URL, IProduct, URL_SEARCH } from '@shared';

export const handleClick =
  (
    prop: IProduct[],
    setProp: Dispatch<IProduct[]>,
    product: IProduct,
    id: number
  ) =>
  () => {
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

export const isAdded = (list: IProduct[], id: number): boolean => {
  return list.some((purchase) => purchase.id === id);
};

export const updateTitle = (title: string): string => title.replace(/_/g, ' ');

export const fetchData = async <T>(param: string | string[]): Promise<T> => {
  const res = await fetch(`${BASE_JSON_URL}${URL_SEARCH}${param}`);
  return await res.json();
};
