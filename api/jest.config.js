export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],

  roots: ["<rootDir>/"],

  testMatch: ["**/__tests__/**/*.[jt]s?(x)","**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};