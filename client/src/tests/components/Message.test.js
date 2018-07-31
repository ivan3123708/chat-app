import React from 'react';
import { shallow } from 'enzyme';
import Message from '../../components/Message';
import message from '../data/message';
import messageConsecutive from '../data/messageConsecutive';

describe('<Message />', () => {
  it('should render Message correctly', () => {
    const wrapper = shallow(<Message message={message} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render consecutive Message correctly', () => {
    const wrapper = shallow(<Message message={messageConsecutive} />);

    expect(wrapper).toMatchSnapshot();
  });
});
