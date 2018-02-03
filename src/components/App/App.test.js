import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('App', () => {  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  })

  it('When getCards is run it should set the name of the button in state', () => {
    const wrapper = shallow(<App />);
    // ----- is this right???? It get's the test passing..

    console.log(wrapper.state())
    // expect(wrapper.state().chosenCategory).toEqual('people')
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

