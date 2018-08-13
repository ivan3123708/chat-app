import React from 'react';
import { shallow } from 'enzyme';
import AvatarModal from '../../components/AvatarModal';
import user from '../data/user';

describe('<AvatarModal />', () => {
  it('renders AvatarModal correctly', () => {
    const wrapper = shallow(<AvatarModal isOpen={true} onRequestClose={() => { }} user={user} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('#preview').prop('src')).toEqual(user.avatar);
  });
});