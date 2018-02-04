import React from 'react';
import {shallow} from 'enzyme';
import Control from './Control';

describe('Control', () => {
  let wrapper;
  let mockHandleClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<Control handleClick={mockHandleClick} numFav={1}/>)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call handle click when a button is pressed', () => {    
    wrapper.find('button').first().simulate('click')
    wrapper.find('button').last().simulate('click')
    
    expect(mockHandleClick.mock.calls.length).toBe(2)
  })
})