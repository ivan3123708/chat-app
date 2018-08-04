import React from 'react';
import { shallow } from 'enzyme';
import SidebarRight from '../../components/SidebarRight';

describe('<SidebarRight />', () => {
  it('renders SidebarRight correctly', () => {
    const wrapper = shallow(<SidebarRight />);

    expect(wrapper).toMatchSnapshot();
  });
});