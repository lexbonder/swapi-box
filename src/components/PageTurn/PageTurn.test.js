/* eslint-disable */
import React from 'react';
import {shallow} from 'enzyme';
import PageTurn from './PageTurn';

describe('PageTurn', () => {
  let wrapper;
  let mockNextOrPrev = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<PageTurn nextOrPrev={mockNextOrPrev} />)
  })

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call nextOrPrev when clicked', () => {
    wrapper.find('button').first().simulate('click')

    expect(mockNextOrPrev).toHaveBeenCalled();
  })

  it('should call nextOrPrev when clicked', () => {
    wrapper.find('button').last().simulate('click')

    expect(mockNextOrPrev).toHaveBeenCalled();
  })
})