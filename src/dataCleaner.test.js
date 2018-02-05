import React from 'react';
import { shallow } from 'enzyme';
import DataCleaner from './DataCleaner';
import mockData from './mockData'

describe('DataCleaner', () => {
  let cleaner;

  beforeEach(() => {
    cleaner = new DataCleaner()
    
  })

  describe('getOpeningText', () => {
    it('Should determine which cleaning function to run', () => {
      cleaner.peopleCleaner = jest.fn()
      cleaner.vehicleCleaner = jest.fn()
      cleaner.planetCleaner = jest.fn()
      cleaner.getOpeningText = jest.fn()

      cleaner.cleanData('people', [])
      expect(cleaner.peopleCleaner).toHaveBeenCalled()

      cleaner.cleanData('vehicles', [])
      expect(cleaner.vehicleCleaner).toHaveBeenCalled()

      cleaner.cleanData('planets', [])
      expect(cleaner.planetCleaner).toHaveBeenCalled()

      cleaner.cleanData('opening', [])
      expect(cleaner.getOpeningText).toHaveBeenCalled()
    
    })

    it('Should return cleaned movie data', () => {
      const mockCleanData = {
        "crawl": "It is a dark time for the Rebellion. Although the Death Star has been destroyed, Imperial troops have driven the Rebel forces from their hidden base and pursued them across the galaxy. Evading the dreaded Imperial Starfleet, a group of freedom fighters led by Luke Skywalker has established a new secret base on the remote ice world of Hoth. The evil lord Darth Vader, obsessed with finding young Skywalker, has dispatched thousands of remote probes into the far reaches of space....",
        "episode": 5,
        "title": "The Empire Strikes Back",
        "year": "1980-05-17"}
      const cleanedData = cleaner.getOpeningText(mockData.movieData)
      expect(cleanedData).toEqual(mockCleanData)
    })
  })

  describe('peopleCleaner', () => {
    it('Should return a cleaned people object', async () => {
      cleaner.getWorldAndPop = async () => await {homeworld: 'Tattooine', population: '200000'}
      cleaner.getSpecies = async () => await 'human'
      
      const mockCleanData = [{
        category: 'people',
        name: 'Luke Skywalker',
        species: 'human',
        homeworld: 'Tattooine',
        population: '200000'
      }]

      const cleanedData = await cleaner.peopleCleaner(mockData.peopleData, 'people')

      expect(cleanedData).toEqual(mockCleanData) 
    })

    it('getWorldAndPop should return an object with homeworld and population from a fetch', async () => {

      const mockFetch = async () => await {name: 'Tattooine', population: '200000'}
      
      cleaner = new DataCleaner(mockFetch)

      const cleanedWorld = await cleaner.getWorldAndPop()

      expect(cleanedWorld).toEqual({homeworld: 'Tattooine', population: '200000'})
    })

    it('getSpecies should return a string with the species from a fetch', async () => {
      const mockFetch = async () => await {name: 'human'};

      cleaner = new DataCleaner(mockFetch)

      const cleanedSpecies = await cleaner.getSpecies()

      expect(cleanedSpecies).toEqual('human')
    })
  })

  describe('vehicleCleaner', () => {
    it('Should return a cleaned vehicle array', () => {
      const mockCleanData = [{
        category: 'vehicles',
        name: "Sand Crawler",
        model: "Digger Crawler",
        vehicleClass: "wheeled",
        numOfPassengers: "30"
      }]

      const cleanedVehicles = cleaner.vehicleCleaner(mockData.vehicleData, 'vehicles')
    
      expect(cleanedVehicles).toEqual(mockCleanData)
    })
  })

  describe('planetCleaner', () => {
    it('Should return a cleaned planet array', async () => {
      
      cleaner.getResidents = async () => await ['Luke Skywalker']
      
      const mockCleanData = [{
        category: 'planets',
        name: 'Tatooine',
        terrain: "desert",
        population: "200000",
        climate: "arid",
        residents: ['Luke Skywalker']
      }]

      const cleanedData = await cleaner.planetCleaner(mockData.planetData, 'planets')

      expect(cleanedData).toEqual(mockCleanData)
    })

    it('getResidents should return an array of residents names', async () => {
      const mockFetch = async () => await {name: 'Luke Skywalker'}

      cleaner = new DataCleaner(mockFetch)

      const cleanedData = await cleaner.getResidents(['API URL'])

      expect(cleanedData).toEqual(['Luke Skywalker'])
    })

    it('getReisdents should return "none" if there are no residents in the array', async () => {
      const mockFetch = async () => await {name: 'Luke Skywalker'}

      cleaner = new DataCleaner(mockFetch)

      const cleanedData = await cleaner.getResidents([])

      expect(cleanedData).toEqual(['None'])
    })
  })


})