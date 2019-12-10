/// Jest browser initialisation code goes here

const path = require('path')

jest.mock(path.resolve(__dirname, './.storybook/facade'))
