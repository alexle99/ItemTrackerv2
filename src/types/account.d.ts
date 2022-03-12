export interface Account {
  id: string;
  userName: string;
  items: Item[];
}

export interface Items {
  id: string;
  name: string;
}
