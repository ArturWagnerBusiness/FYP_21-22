export interface ListItemProps {
  data: {
    title?: string;
    date?: string;
    email?: string;
    description?: string;
    path?: string;
    hidden?: boolean;
    likes?: number;
  };
}
