import React from 'react';
import {shallow} from 'enzyme';
import CardContainer from './CardContainer';

describe('CardContainer', () => {

  it('should match the snapshot if it recieves no favorites', () => {
    const wrapper = shallow(<CardContainer
      chosenCategory={'favorites'}
      cleanedData={[]}
      toggleFavorite={()=>{}}
      currentFavorites={[]}
    />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot if it recieves favorites', () => {
    const wrapper = shallow(<CardContainer
      chosenCategory={'favorites'}
      cleanedData={[{}, {}, {}]}
      toggleFavorite={()=>{}}
      currentFavorites={[]}
    />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot if it recieves people', () => {
    const wrapper = shallow(<CardContainer
      chosenCategory={'people'}
      cleanedData={[{}, {}, {}]}
      toggleFavorite={()=>{}}
      currentFavorites={[]}
    />)

    expect(wrapper).toMatchSnapshot()
  })

})