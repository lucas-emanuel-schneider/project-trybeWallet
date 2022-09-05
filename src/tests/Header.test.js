import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import expensesHeader from './helpers/expensesHeader';
import App from '../App';

const testEmail = 'teste@trybe.com';
describe('Testando componente Header', () => {
  it('Verifica se ao logar corretamente, o Header recebe o email adequadamentee contem a currency BR', () => {
    // Renderiza acessando history
    renderWithRouterAndRedux(<App />);
    // Captura os elementos
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    // Dados para o teste:
    const testPassword = '123456';
    // Digita os dados corretamente depois clica no Button
    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, testPassword);
    userEvent.click(submitButton);
    // verifica se o Header recebeu o email correto
    const emailTest = screen.getByText(/Email:/i);
    const atualCurrency = screen.getByRole('heading', { level: 3, name: 'BRL' });
    expect(emailTest).toBeInTheDocument();
    expect(atualCurrency).toBeInTheDocument();
  });
  it('Testa se o componente Header altera o total adequadamente', async () => {
    // Renderiza o componente com as infos de teste e o mock do Fetch
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<App />, {
      initialState: {
        user: testEmail,
        wallet: {
          currencies: [
            'USD',
            'CAD',
            'GBP',
            'ARS',
            'BTC',
            'LTC',
            'EUR',
            'JPY',
            'CHF',
            'AUD',
            'CNY',
            'ILS',
            'ETH',
            'XRP',
            'DOGE',
          ],
          expenses: [],
        },
      },
      initialEntries: ['/carteira'],
    });
    // Captura os elementos do WalletForm
    const inputValue = screen.getByRole('spinbutton', { name: /Valor:/i });
    const inputDescription = screen.getByRole('textbox', { name: /Descrição:/i });
    const inputCurrency = screen.getByRole('combobox', { name: /Moeda:/i });
    const inputPaymentMethod = screen.getByRole('combobox', { name: /Método de pagamento:/i });
    const inputTag = screen.getByRole('combobox', { name: /Categoria :/i });
    const buttonSubmit = screen.getByRole('button', { name: /adicionar despesa/i });
    // Digita as informações no Form e da Submit através do button
    userEvent.type(inputValue, '36');
    userEvent.type(inputDescription, 'subway');
    userEvent.selectOptions(inputCurrency, 'USD');
    userEvent.selectOptions(inputPaymentMethod, 'Dinheiro');
    userEvent.selectOptions(inputTag, 'Transporte');
    userEvent.click(buttonSubmit);
    // Verifica se o fetch foi chamado após o envio
    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));
    // captura o elemento total no Header
    const totalField = screen.getByRole('heading', { level: 2, name: 171.11 });
    // verifica se o campo total esta correto
    expect(totalField).toBeInTheDocument();
  });
  it('Testa se o componente Header altera o total adequadamente com mais expenses', async () => {
    // Renderiza o componente com as infos de teste e o mock do Fetch
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<App />, {
      initialState: {
        user: testEmail,
        wallet: {
          currencies: [
            'USD',
            'CAD',
            'GBP',
            'ARS',
            'BTC',
            'LTC',
            'EUR',
            'JPY',
            'CHF',
            'AUD',
            'CNY',
            'ILS',
            'ETH',
            'XRP',
            'DOGE',
          ],
          expenses: expensesHeader,
        },
      },
      initialEntries: ['/carteira'],
    });
    // verifica se o total é alterado quando passadas mais expenses para ele
    const totalField = screen.getByRole('heading', { level: 2, name: 237.13 });
    expect(totalField).toBeInTheDocument();
  });
});
