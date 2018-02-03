import React from 'react';
import { shallow } from 'enzyme';
import fetchApi from './apiFetcher';

describe('fetchApi', () => {
  
  beforeEach(() => {
    const mockObj = {name: 'Luke', homeworld: 'tattooine'}
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockObj)
    }))
  })

  it('calls fetch with the correct parameters', () => {
    const expectParams = 'https://swapi.co/api/films/1/';
    
    const response = fetchApi(expectParams)
    
    expect(window.fetch).toHaveBeenCalledWith(expectParams)
  })

  it('returns an object from the api successfully', async () => {
    const expectObject = {name: 'Luke', homeworld: 'tattooine'}

    const response = await fetchApi()

    expect(response).toEqual(expectObject)
  })

  it('sets an error when the fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation( () => Promise.reject({
      status: 404,
      json: () => Promise.reject('API failed to load')
    }))

    const error = await fetchApi()

    expect(error).toEqual('API failed to load')
  })
})