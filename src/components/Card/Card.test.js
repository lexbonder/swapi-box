import React from 'react';
import {shallow} from 'enzyme';
import Card from './Card';

describe('Card', () => {
  const mockPerson = {
    category: 'people',
    name: 'Luke Skywalker',
    species: 'human',
    homeworld: 'Tatooine',
    population: '2000000'
  }
  const mockVehicle = {
    category: 'vehicles',
    name: 'RaceCar',
    model: 'Car',
    vehicleClass: 'Really fast',
    numOfPassengers: '4'
  }
  const mockPlanet = {
    category: 'planets',
    name: 'Tatooine',
    terrain: 'Yes',
    population: '2000000',
    climate: 'Most Unpleasant',
    residents: ['Luke', 'Leah', 'The Other Guy']
  }
  const mockToggleFavorite = jest.fn()

  it('should match the snapshot when given a person object', () => {
    const wrapper = shallow(<Card
      cardInfo={mockPerson}
      toggleFavorite={mockToggleFavorite}
    />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot when given a vehicle object', () => {
    const wrapper = shallow(<Card
      cardInfo={mockVehicle}
      toggleFavorite={mockToggleFavorite}
    />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot when given a planet object', () => {
    const wrapper = shallow(<Card
      cardInfo={mockPlanet}
      toggleFavorite={mockToggleFavorite}
    />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should call toggleFavorite when the favorite button is clicked', () => {
    const wrapper = shallow(<Card
      cardInfo={mockPerson}
      toggleFavorite={mockToggleFavorite}
    />)

    wrapper.find('button').simulate('click')

    expect(mockToggleFavorite).toHaveBeenCalled()
  })
})