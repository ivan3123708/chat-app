import React from 'react';
import { shallow } from 'enzyme';
import MyMessage from '../../components/MyMessage';
import message from '../data/message';
import messageConsecutive from '../data/messageConsecutive';

describe('<MyMessage />', () => {
  it('should render MyMessage correctly', () => {
    const wrapper = shallow(<MyMessage message={message} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.my-message').children()).toHaveLength(2);
    expect(wrapper.find('.sender').text()).toEqual(message.sender.name);
    expect(wrapper.find('.text').text()).toEqual(message.text);
    expect(wrapper.find('.time').text()).toEqual(message.time);
    expect(wrapper.find('#avatar').prop('src')).toEqual(message.sender.avatar);
  });

  it('should render consecutive MyMessage correctly', () => {
    const wrapper = shallow(<MyMessage message={messageConsecutive} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.my-message').children()).toHaveLength(1);
    expect(wrapper.find('.text').text()).toEqual(messageConsecutive.text);
    expect(wrapper.find('.time').text()).toEqual(messageConsecutive.time);
  });
});