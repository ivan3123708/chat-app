import React from 'react';
import { shallow } from 'enzyme';
import Message from '../../components/Message';
import message from '../data/message';
import messageConsecutive from '../data/messageConsecutive';

describe('<Message />', () => {
  it('should render Message correctly', () => {
    const wrapper = shallow(<Message message={message} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.message').children()).toHaveLength(2);
    expect(wrapper.find('.sender').text()).toEqual(message.sender.name);
    expect(wrapper.find('.text').text()).toEqual(message.text);
    expect(wrapper.find('.time').text()).toEqual(message.time);
    expect(wrapper.find('#avatar').prop('src')).toEqual(message.sender.avatar);
  });

  it('should render consecutive Message correctly', () => {
    const wrapper = shallow(<Message message={messageConsecutive} />);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.message').children()).toHaveLength(1);
    expect(wrapper.find('.text').text()).toEqual(messageConsecutive.text);
    expect(wrapper.find('.time').text()).toEqual(messageConsecutive.time);
  });
});
