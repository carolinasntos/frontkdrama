/// <reference types="vitest" />

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import LoginForm from './LoginForm';

vi.mock('axios');

describe('LoginForm', () => {
  it('debe mostrar los campos de email y contraseña y enviar correctamente', async () => {
    // Simular respuesta de axios
    const mockToken = 'fake-token-123';
    axios.post.mockResolvedValue({ data: { token: mockToken } });

    const mockOnLogin = vi.fn();

    render(<LoginForm onLogin={mockOnLogin} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Contraseña');
    const loginButton = screen.getByText('Iniciar sesión');

    // Simular ingreso de texto
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // Enviar el formulario
    fireEvent.click(loginButton);

    // Esperar a que la promesa se resuelva
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://pymex.azurewebsites.net/api/auth/login',
        {
          email: 'test@example.com',
          password: '123456'
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      expect(mockOnLogin).toHaveBeenCalledWith(mockToken);
    });
  });
});