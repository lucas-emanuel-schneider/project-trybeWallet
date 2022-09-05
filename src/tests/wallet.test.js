import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

// await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); << usar it async

const testEmail = 'tryber@teste.com';

describe('Testando componente Header dentro de Wallet', () => {
  it('Testa se o componente Header possui o email adequado', () => {
    // Renderiza o componente com as infos de teste
    renderWithRouterAndRedux(<App />, {
      initialState: { user: testEmail },
      initialEntries: ['/carteira'],
    });
    // Captura os elementos do header
    const email = screen.getByText(/email/i);
    const headerCurrency = screen.getByText(/brl/i);
    const totalField = screen.getByTestId('total-field');
    // Verifica se estão na tela
    expect(email).toBeInTheDocument();
    expect(headerCurrency).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
  });
});

describe('Testando componente WalletForm dentro de Wallet', () => {
  it('Testa se o componente WalletForm possui os elementos', () => {
    // Renderiza o componente com as infos de teste e o mock do Fetch
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<App />, {
      initialState: { user: testEmail },
      initialEntries: ['/carteira'],
    });
    // Captura os elementos do WalletForm
    const inputValue = screen.getByRole('spinbutton', { name: /Valor:/i });
    const inputDescription = screen.getByRole('textbox', { name: /Descrição:/i });
    const inputCurrency = screen.getByRole('combobox', { name: /Moeda:/i });
    const inputPaymentMethod = screen.getByRole('combobox', { name: /Método de pagamento:/i });
    const inputTag = screen.getByRole('combobox', { name: /Categoria :/i });
    const buttonSubmit = screen.getByRole('button', { name: /adicionar despesa/i });
    // Verifica se estão na tela
    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputPaymentMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });
  it('Testa se o componente WalletForm chama a função fetch após preencher os dados e enviar', async () => {
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
  });
});
describe('Testando componente Table dentro de Wallet', () => {
  it('Testa se o componente Table possui os elementos após adicionalos', async () => {
    // Renderiza o componente com as infos de teste e o mock do Fetch
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<App />, {
      initialState: {
        user: {
          email: testEmail,
        },
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
          editor: false,
          idToEdit: 0,
          isFetching: false,
          error: '',
        },
      },
      initialEntries: ['/carteira'],
    });
    // Captura os elementos do WalletForm
    const inputValue = screen.getByRole('spinbutton', { name: /Valor:/i });
    const inputDescription = screen.getByRole('textbox', { name: /Descrição:/i });
    const inputPaymentMethod = screen.getByRole('combobox', { name: /Método de pagamento:/i });
    const inputCurrency = screen.getByRole('combobox', { name: /Moeda:/i });
    const inputTag = screen.getByRole('combobox', { name: /Categoria :/i });
    const buttonSubmit = screen.getByRole('button', { name: /adicionar despesa/i });
    // define os valores dos inputs e clica em adicionar despesa
    userEvent.type(inputValue, '36');
    userEvent.type(inputDescription, 'subway');
    userEvent.selectOptions(inputCurrency, 'USD');
    userEvent.selectOptions(inputPaymentMethod, 'Cartão de débito');
    userEvent.selectOptions(inputTag, 'Saúde');
    userEvent.click(buttonSubmit);
    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));
    // captura uma table que foi criada com uma das celulas corretas e os botoes
    const testTable = screen.getByRole('table');
    const testCell = screen.getByRole('cell', { name: /subway/i });
    const deleteButton = screen.getByRole('button', { name: /excluir/i });
    const editButton = screen.getByRole('button', { name: /editar/i });
    // verifica se o componente Table recebeu os valores corretos e renderiza-os
    expect(testTable).toBeInTheDocument();
    expect(testCell).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });
  it('Testa se é possivel apagar os elementos da Table', async () => {
    // Renderiza o componente com as infos de teste e o mock do Fetch
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<App />, {
      initialState: {
        user: {
          email: testEmail,
        },
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
          editor: false,
          idToEdit: 0,
          isFetching: false,
          error: '',
        },
      },
      initialEntries: ['/carteira'],
    });
    // Captura os elementos do WalletForm
    const inputValue = screen.getByRole('spinbutton', { name: /Valor:/i });
    const inputDescription = screen.getByRole('textbox', { name: /Descrição:/i });
    const inputPaymentMethod = screen.getByRole('combobox', { name: /Método de pagamento:/i });
    const inputCurrency = screen.getByRole('combobox', { name: /Moeda:/i });
    const inputTag = screen.getByRole('combobox', { name: /Categoria :/i });
    const buttonSubmit = screen.getByRole('button', { name: /adicionar despesa/i });
    // define os valores dos inputs e clica em adicionar
    userEvent.type(inputValue, '36');
    userEvent.type(inputDescription, 'subway');
    userEvent.selectOptions(inputCurrency, 'USD');
    userEvent.selectOptions(inputPaymentMethod, 'Cartão de crédito');
    userEvent.selectOptions(inputTag, 'Alimentação');
    userEvent.click(buttonSubmit);
    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));
    // captura uma table e o botão de apagar depois apaga o item
    const testCell = screen.getByRole('cell', { name: /subway/i });
    const deleteButton = screen.getByRole('button', { name: /excluir/i });
    userEvent.click(deleteButton);
    // verifica se o componente Table apagou o item criado
    expect(testCell).not.toBeInTheDocument();
  });
  it('Testa se é possivel editar os elementos da Table', async () => {
    // Renderiza o componente com as infos de teste e o mock do Fetch
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<App />, {
      initialState: {
        user: {
          email: testEmail,
        },
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
          editor: false,
          idToEdit: 0,
          isFetching: false,
          error: '',
        },
      },
      initialEntries: ['/carteira'],
    });
    // Captura os elementos do WalletForm
    const inputValue = screen.getByRole('spinbutton', { name: /Valor:/i });
    const inputDescription = screen.getByRole('textbox', { name: /Descrição:/i });
    const inputCurrency = screen.getByRole('combobox', { name: /Moeda:/i });
    const inputTag = screen.getByRole('combobox', { name: /Categoria :/i });
    const buttonSubmit = screen.getByRole('button', { name: /adicionar despesa/i });
    const inputPaymentMethod = screen.getByRole('combobox', { name: /Método de pagamento:/i });
    // define os valores dos inputs e clica em adicionar passando a descrição subway
    userEvent.type(inputValue, '36');
    userEvent.type(inputDescription, 'subway');
    userEvent.selectOptions(inputCurrency, 'USD');
    userEvent.selectOptions(inputPaymentMethod, 'Cartão de crédito');
    userEvent.selectOptions(inputTag, 'Alimentação');
    userEvent.click(buttonSubmit);
    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));
    // captura uma table e o botão de editar depois clica nele
    const editButton = screen.getByRole('button', { name: /editar/i });
    userEvent.click(editButton);
    // edita o novo item e clica no botao de edição
    const inputDescriptionEditing = screen.getByRole('textbox', { name: /Descrição:/i });
    userEvent.clear(inputDescriptionEditing);
    userEvent.type(inputDescriptionEditing, 'edited item');
    const editingButton = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(editingButton);
    // captura o novo item editado
    const editedItem = screen.getByRole('cell', { name: /edited item/i });
    // verifica se o componente Table alterou o item corretamente
    expect(editedItem).toBeInTheDocument();
  });
});
