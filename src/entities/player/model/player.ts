import type { Colors } from '@/shared/lib/consts';

export class Player {
  color: Colors;

  constructor(color: Colors) {
    this.color = color;
  }
}
