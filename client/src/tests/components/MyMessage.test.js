import React from 'react';
import { shallow } from 'enzyme';
import MyMessage from '../../components/MyMessage';
import message from '../data/message';
import messageConsecutive from '../data/messageConsecutive';

describe('<MyMessage />', () => {
  it('should render MyMessage correctly', () => {
    const wrapper = shallow(<MyMessage message={message} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render consecutive MyMessage correctly', () => {
    const wrapper = shallow(<MyMessage message={messageConsecutive} />);

    expect(wrapper).toMatchSnapshot();
  });
});