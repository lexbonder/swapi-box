import React from 'react';
import {shallow} from 'enzyme';
import OpeningText from './OpeningText'

describe('OpeningText', () => {
  it('should match the snapshot', () => {
    const mockMovieData = {
      openingText: {
        title: 'Return of the Jedi',
        eipsode: '4',
        crawl: 'The super long intro...',
        year: '04/15/1990'
        }}

    const wrapper = shallow(<OpeningText openingText={mockMovieData}/>)

    expect(wrapper).toMatchSnapshot()
  })
})