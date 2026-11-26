// Cucumber-js settings, used by `npm run bdd`.
module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['features/step-definitions/**/*.ts'],
    requireModule: ['tsx/cjs'],
    // Only run examples tagged @automated. The others are descriptions only.
    tags: '@automated',
    format: ['progress'],
  },
};
