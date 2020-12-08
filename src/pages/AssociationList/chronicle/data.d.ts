//社团管理  大事记  state
export interface ChronicleState {
  chronicleList?: {
    id: string;
    title: string;
    time: string;
    content: string;
    images: [];
  }[];
  loading: boolean;
}
