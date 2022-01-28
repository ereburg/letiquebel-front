export type Rules = Array<{
  title?: string;
  list: Array<{
    noNum?: boolean;
    text?: string;
    subList?: Array<string>;
    dashList?: Array<string>;
  }>;
}>;
