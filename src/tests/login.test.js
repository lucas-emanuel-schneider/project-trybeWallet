import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testando componente Login', () => {
  it('Testa se o componente Login possui os inputs e o button', () => {
    renderWithRouterAndRedux(<App />);
    // Renderiza
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    // Captura os elementos
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    // Verifica se estão na tela
  });
  it('Testa se o botão começa desabilitado', () => {
    // Renderiza
    renderWithRouterAndRedux(<App />);
    // Captura o elemento
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    // Verifica se está desabilitado
    expect(submitButton).toBeDisabled();
  });
  it('Testa se o botão é habilitado após a inserção de dados corretamente', () => {
    // Renderiza
    renderWithRouterAndRedux(<App />);
    // Captura os elementos
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    // Dados para o teste:
    const testEmail = 'teste@trybe.com';
    const testPassword = '123456';
    // Digita os dados corretamente
    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, testPassword);
    // Verifica se está habilitado
    expect(submitButton).toBeEnabled();
  });
  it('Verifica se ao logar corretamente, a pagina é direcionada ao /carteira', () => {
    // Renderiza acessando history
    const { history } = renderWithRouterAndRedux(<App />);
    // Captura os elementos
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    // Dados para o teste:
    const testEmail = 'teste@trybe.com';
    const testPassword = '123456';
    const pathName = '/carteira';
    // Digita os dados corretamente depois clica no Button
    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, testPassword);
    userEvent.click(submitButton);
    // Acessa o pathName do history e verifica se é /carteira
    const { pathname } = history.location;
    expect(pathname).toBe(pathName);
  });
});
