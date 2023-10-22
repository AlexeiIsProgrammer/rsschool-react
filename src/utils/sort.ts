import { OneBerry } from '../API/types/interfaces';

export default function searchBerries(query: string, berries: OneBerry[]): OneBerry[] {
  return berries.filter((berry) => berry.name.includes(query));
}
