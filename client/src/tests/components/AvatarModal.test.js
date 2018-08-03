import React from 'react';
import { shallow } from 'enzyme';
import AvatarModal from '../../components/AvatarModal';
import avatar from '../data/avatar';

describe('<AvatarModal />', () => {
  it('renders AvatarModal correctly', () => {
    const wrapper = shallow(<AvatarModal isOpen={avatar.isOpen} onRequestClose={avatar.onRequestClose} user={avatar.user} />);

    expect(wrapper).toMatchSnapshot();
  });
});