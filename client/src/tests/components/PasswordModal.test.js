import React from 'react';
import { shallow } from 'enzyme';
import PasswordModal from '../../components/PasswordModal';
import passwordSubmit from '../data/passwordSubmit';

describe('<PasswordModal', () => {
  it('renders PasswordModal correctly', () => {
    const wrapper = shallow(<PasswordModal isOpen={true} onRequestClose={() => { }} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders error if no password is provided', () => {
    const wrapper = shallow(<PasswordModal isOpen={true} onRequestClose={() => { }} />);
    
    wrapper.find('form').simulate('submit', passwordSubmit);

    expect(wrapper.state('error')).toBe('You must enter password');
  });
});