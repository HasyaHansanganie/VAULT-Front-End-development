export default {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.jest.json"
        }
    },
    testMatch: [
        "**/tests/**/*.(test|spec).[jt]s?(x)",
        "**/src/**/*.(test|spec).[jt]s?(x)"
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|webp|svg|mp4|mp3|webm|wav|ogg|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
    }
};
