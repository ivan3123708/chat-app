import React from 'react';
import { shallow } from 'enzyme';
import ChatApp from '../../components/ChatApp';

describe('<ChatApp />', () => {
  it('renders ChatApp correctly', () => {
    const wrapper = shallow(<ChatApp />);

    expect(wrapper).toMatchSnapshot();
  });
});