import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder and TextDecoder for Node.js
global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;
