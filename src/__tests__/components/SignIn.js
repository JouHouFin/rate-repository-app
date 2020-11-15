import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';
import '@testing-library/jest-native/extend-expect';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const mockOnSubmit = jest.fn();
      const { debug, getByTestId } = render(<SignInContainer onSubmit={mockOnSubmit} />);

      fireEvent.changeText(getByTestId('username'), 'Juhoh');
      fireEvent.changeText(getByTestId('password'), 'juhoh');
      fireEvent.press(getByTestId('submitBtn'));
      await waitFor(() => {
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({
          username: 'Juhoh',
          password: 'juhoh',
        });      });
    });
  });
});