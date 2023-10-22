export interface BerriesResponse {
  count: null | number;
  next: string;
  previous: null | number;
  results: OneBerry[];
}

export interface BerryResponse {
  count: null | number;
  next: string;
  previous: null | number;
  results: OneBerry[];
}

export type OneBerry = {
  url: string;
  name: string;
};
