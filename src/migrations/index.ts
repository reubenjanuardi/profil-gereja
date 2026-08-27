import * as migration_20260827_155458_init from './20260827_155458_init';

export const migrations = [
  {
    up: migration_20260827_155458_init.up,
    down: migration_20260827_155458_init.down,
    name: '20260827_155458_init'
  },
];
