import { OneBerry } from '../../../API/types/interfaces';

export type BerriesListProps = {
  berries: OneBerry[];
};

export type BerriesListState = {
  query: string;
};
