import type {Product} from "../types";

import api from "../api";

export const getProducts = (query: string): Promise<Product[]> => {
  return api.search(query);
};
