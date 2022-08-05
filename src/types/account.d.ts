export interface Account {
  id: string;
  userName: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  items: Item[];
}

export interface Item {
  id: string;
  name: string;
  exists: boolean;
}
