/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './App';
import mockData from '../../mockData';


describe('App', () => {  
  let wrapper;
  global.localStorage = {
    getItem() {},
    setItem() {}
  };

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({
      chosenCategory: '',
      cleanedData: [],
      favorites: [],
      numFav: 0,
      openingText: {},
      next: '',
      previous: ''
    })
  })
  
  it('when the compnent mounts it calls getMovieCrawl', () => {
    
    wrapper.instance().getMovieCrawl = jest.fn()
    wrapper.instance().componentDidMount()

    expect(wrapper.instance().getMovieCrawl).toHaveBeenCalled()
  })

  it('calling getMovieCrawl sets a cleaned movie object into state', async () => {
    await wrapper.instance().getMovieCrawl(2)
    const expectedData = {
      title: 'The Empire Strikes Back',
      episode: 5,
      crawl: 'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
      year: '1980-05-17'
    }

    expect(wrapper.state().openingText).toEqual(expectedData)
  })

  describe('toggleFavorite', () => {
    it('should run addFavorite if the clicked object is not in state', () => {
      wrapper.instance().addFavorite = jest.fn()
      wrapper.instance().toggleFavorite({target: {name: 'Luke Skywalker'}})

      expect(wrapper.instance().addFavorite).toHaveBeenCalled()
    })

    it('should run removeFavorite if the clicked object is already in state', () => {
      wrapper.instance().removeFavorite = jest.fn()
      wrapper.setState({favorites: [{name: 'Luke Skywalker'}]})

      wrapper.instance().toggleFavorite({target: {name: 'Luke Skywalker'}})
    
      expect(wrapper.instance().removeFavorite).toHaveBeenCalled()
    })

    it('addFavorite should add an object into state and increase the counter', () => {
      wrapper.instance().addFavorite({name: 'Luke Skywalker'})

      expect(wrapper.state().favorites).toEqual([{name: 'Luke Skywalker'}])
      expect(wrapper.state().numFav).toEqual(1)
    })

    it('removeFavorite should remove an object from state and decrease the counter', () => {
      wrapper.instance().addFavorite({name: 'Luke Skywalker'})
      wrapper.instance().addFavorite({name: 'Chewbacca'})

      wrapper.instance().removeFavorite({name: 'Luke Skywalker'})

      expect(wrapper.state().favorites).toEqual([{name: 'Chewbacca'}])
      expect(wrapper.state().numFav).toEqual(1)
    })
  })

  describe('handleClick', () => {
    it('should run getFavorites if the chosen category is favorites', () => {
      wrapper.instance().getFavorites = jest.fn()
      wrapper.instance().handleClick({target: {name: 'favorites'}})

      expect(wrapper.instance().getFavorites).toHaveBeenCalled()
    })

    it('should run getCards if the chosen category is anything other than favorites', () => {
      wrapper.instance().getCards = jest.fn()
      
      wrapper.instance().handleClick({target: {name: 'people'}})
      expect(wrapper.instance().getCards).toHaveBeenCalledWith('people', "https://swapi.co/api/people/")
      
      wrapper.instance().handleClick({target: {name: 'vehicles'}})
      expect(wrapper.instance().getCards).toHaveBeenCalledWith('vehicles', "https://swapi.co/api/vehicles/")
      
      wrapper.instance().handleClick({target: {name: 'planets'}})
      expect(wrapper.instance().getCards).toHaveBeenCalledWith('planets', "https://swapi.co/api/planets/")
    })
  })

  describe('getFavorites', () => {
    it('should set the chosen category and cleaned data into state', () => {
      wrapper.instance().addFavorite({name: 'Luke Skywalker'})
      wrapper.instance().addFavorite({name: 'Chewbacca'})
      
      wrapper.instance().getFavorites('favorites')

      expect(wrapper.state().cleanedData).toEqual([{name: 'Luke Skywalker'},{name: 'Chewbacca'}])
      expect(wrapper.state().chosenCategory).toEqual('favorites')
    })
  })

  describe('getCards', () => {
    it('should set the state depending on the button pressed', async () => {
      await wrapper.instance().getCards('people', "https://swapi.co/api/people/")

      expect(wrapper.state().chosenCategory).toEqual('people')
      expect(wrapper.state().cleanedData).toEqual(mockData.cleanedPeopleData)
    })
  })

  describe('nextOrPrev', () => {
    it('should call getCards with the category and next url', () => {
      
      wrapper.instance().getCards = jest.fn()

      const mockNextEvent = {target: {name: 'next'}}
      wrapper.setState({next: 'www.coolurl.com', chosenCategory: 'stuff'})      
      wrapper.instance().nextOrPrev(mockNextEvent)


      expect(wrapper.instance().getCards).toHaveBeenCalledWith(wrapper.state().chosenCategory, wrapper.state().next)
    })

  })

})

// // Async Tests -----


// describe('The thing', () => {
//   let mockGrocery;
//   let mockGroceries;
//   let mockUpdateGroceryList;
//   let mockEvent;

//   // Happens one time 
//   beforeAll(() => {
//       // Mock Data: 
//     mockGrocery = {
//       name: 'beef jerkeys',
//       quantity: 100
//     }

//     mockGroceries = [
//       {name: 'queso', quantity: 1000},
//       {name: 'beef jerkeys', quantity: 100}
//     ]
//       // Mock function
//     mockUpdateGroceryList = jest.fn()

//       // Mock event
//     mockEvent = { preventDefault: jest.fn() }


//     })

//   // Before each - used when you need a new instance of something (shallow/mount)
//     beforeEach(() => {
//       renderedComponent = shallow(<AddGroceryForm 
//         updateGroceryList={mockUpdateGroceryList}
//       />)
//         // Mock fetch
//       window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
//         json: () => Promise.resolve({
//           groceries.mockGroceries
//         })
//       }))
//     })
    
//   })
//   // After All - when you want to reset something back to default after all tests
//   // After Each - set conditions back to default if tests are dependant on each other
// })

// // Is fetch being called with the right parameters?
// it('calls fetch with the correct params', () => {
  
//   const expectParams = [
//     '/api/vi/groceries',
//     {
//       method: 'POST',
//       body: JSON.stringify({ grocery: mockGrocery }),
//       headers: { 'Content-Type': 'application/json' },
//     }
//   ]

//   renderedComponent.setState({grocery: mockGrocery})
//   renderedComponent.instance().handleAddGrocery(mockEvent)
//   expect(window.fetch).toHaveBeenCalledWith(...expectParams)
// })

// // Is setState returned to its default?
// it('resets the state after adding a new grocery', async () => {
//   renderedComponent.setState({ grocery: mockGrocery })

//   await renderedComponent.instance().handleAddGrocery(mockEvent)
//   await renderedComponent.update()
  
//   expect(renderedComponent.state('grocery')).toEqual({name: '', quantity: ''})
// })

// // Is the update function called?
//   // (We'll test it's functionality later, only need to know if it's called)
// it('calls the update callback', async () => {
//   await renderedComponent.instance().handleAddGrocery(mockEvent)
//   expect(mockUpdateGroceryList).toHaveBeenCalled()
// })

// // Is the error state set correctly on error?
//   // (We can force an error and test our apps behavior)
// it('updates the error state in the eent of an error', async () => {
//   window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('oops!')))

//     await renderedComponent.instance().handleAddGrocery(mockEvent)
//     await renderedComponent.update()
//     expect(renderedComponent.state('errorState')).toEqual('oops!')
// })

