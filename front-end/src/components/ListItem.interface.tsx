export interface ListItemProps {
  data: {
    id: number;
    title?: string;
    date?: string;
    email?: string;
    description?: string;
    path?: string;
    hidden?: boolean;
    likes?: number;
    liked?: boolean;
  };
  parentRender: Function;
}
