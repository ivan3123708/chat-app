import React from 'react';
import { shallow } from 'enzyme';
import SidebarLeft from '../../components/SidebarLeft';
import user from '../data/user';
import rooms from '../data/rooms';

describe('<SidebarLeft />', () => {
  it('renders SidebarLeft correctly', () => {
    const wrapper = shallow(<SidebarLeft user={user} users={[user]} rooms={rooms} switchRoom={() => { }} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('#avatar').prop('src')).toEqual(user.avatar);
    expect(wrapper.find('#user').text()).toEqual(user.name);
    expect(wrapper.find('.public-chats-list').children()).toHaveLength(rooms.length);
  });
});