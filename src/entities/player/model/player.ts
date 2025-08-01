import type { Colors } from '@/shared/utils/consts/consts';

export class Player {
  color: Colors;

  constructor(color: Colors) {
    this.color = color;
  }
}
