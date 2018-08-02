import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../../components/LoginPage';
import loginSubmit from '../data/loginSubmit';

describe('<LoginPage />', () => {
  it('renders LoginPage correctly', () => {
    const wrapper = shallow(<LoginPage />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders error if no username is provided', () => {
    const wrapper = shallow(<LoginPage />);

    wrapper.find('form').simulate('submit', loginSubmit);

    expect(wrapper.state('error')).toBe('You must enter username');
  });
});