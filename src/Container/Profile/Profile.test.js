import React from 'react'
import {
  render,
  cleanup
} from '@testing-library/react'
import Profile from './Profile'

afterEach(cleanup)

describe('This will test MyComponent', () => {
  test('renders message', () => {
    const {getByText} = render( <Profile username="Alejandro" name="Roman" /> )

    // as suggested by Giorgio Polvara a more idiomatic way:
    expect(getByText('Hi Alejandro Roman!'))
  })
})
