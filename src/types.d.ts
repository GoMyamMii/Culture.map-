declare interface ItemType {
  children: { [key: string]: string }[];
  id: string;
  [key: string]: string | number;
}

declare interface Window {
  kakao: any;
}
