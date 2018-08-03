import React from 'react';
import { shallow } from 'enzyme';
import CreateRoomModal from '../../components/CreateRoomModal';
import createRoomSubmit from '../data/createRoomSubmit';

describe('<CreateRoomModal', () => {
  it('renders CreateRoomModal correctly', () => {
    const wrapper = shallow(<CreateRoomModal isOpen={true} onRequestClose={() => { }}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders error if no room name is provided', () => {
    const wrapper = shallow(<CreateRoomModal isOpen={true} onRequestClose={() => { }} />);

    wrapper.find('form').simulate('submit', createRoomSubmit);

    expect(wrapper.state('error')).toBe('You must enter room name');
  });
});