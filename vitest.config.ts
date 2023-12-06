import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      enabled: true,
      thresholds: {
        '100': true,
      },
    },
  },
});
