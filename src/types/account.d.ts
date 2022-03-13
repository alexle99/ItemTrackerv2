export interface Account {
  id: string;
  userName: string;
  items: Item[];
}

export interface Item {
  id: string;
  name: string;
}
