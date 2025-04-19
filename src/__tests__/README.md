# Tests for Vue Components

This directory contains test files for the Vue components using Vitest and Vue Test Utils.

## Directory Structure

```
__tests__/
├── components/        # Tests for Vue components
│   └── rapid-response/
│       ├── RapidResponseItem.spec.ts
│       └── RapidResponseList.spec.ts
├── mocks/             # Mock data and functions
│   └── stores.ts
├── utils/             # Test utilities
│   └── test-utils.ts
└── README.md
```

## Running Tests

### Run all tests

```bash
npm run test:unit
```

### Run specific test file

```bash
npm run test:unit src/__tests__/components/rapid-response/RapidResponseItem.spec.ts
```

### Run tests in watch mode (rerunning when files change)

```bash
npm run test:unit -- --watch
```

### Run tests with UI

```bash
npm run test:unit -- --ui
```

## Test Coverage

To run tests with coverage reporting:

```bash
npm run test:unit -- --coverage
```

## Writing Tests

When writing tests for Vue components:

1. Use the `describe` function to group related tests
2. Use the `it` or `test` function to define individual test cases
3. Use `beforeEach` for setup code that runs before each test
4. Use `mount` from Vue Test Utils to render components
5. Use `expect` to assert expected outcomes

Example:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.text()).toContain('Expected text')
  })
})
```

## Mocking

The test files use mocking for:

1. Store modules (Pinia)
2. Component dependencies
3. API calls

See the `mocks` directory for reusable mock implementations.
