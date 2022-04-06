
import React from 'react';
import Activity from '../components/Activity/Activity';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../store';
import {BrowserRouter} from 'react-router-dom';

// test with jest
test('activity should have a label for name', () => {
    const component = render(
        <Provider store={store}>
        <BrowserRouter>
            <Activity />
        </BrowserRouter>
        </Provider>
    );
    const input = component.getAllByLabelText('Nombre:');
    expect(input).toHaveLength(1);

    
    });
test('activity should have a label for Dificultad:', () => {
    const component = render(
        <Provider store={store}>
        <BrowserRouter>
            <Activity />
        </BrowserRouter>
        </Provider>
    );
    const input = component.getAllByLabelText('Dificultad:');
    expect(input).toHaveLength(1);
});