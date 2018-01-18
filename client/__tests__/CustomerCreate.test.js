import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { CustomerCreate } from '../components/CustomerCreate';

const defaultState = {
  email: '',
  name: ''
};

const wrapper = shallow(<CustomerCreate />);
const mWrapper = mount(<CustomerCreate />);

describe('CustomerCreate', () => {
  it('should render without throwing an error', () => {
    expect(wrapper.exists(<ul className="collection" />)).toBe(true);
  });

  describe('render', () => {
    it('renders all input fields', () => {
      const inputs = wrapper.find('input');
      expect(inputs).toHaveLength(3);
    });

    it('name field', () => {
      expect(wrapper.find('[name="name"]').exists()).toBe(true);
    });

    it('email field', () => {
      expect(wrapper.find('[name="email"]').exists()).toBe(true);
    });

    it('prime field', () => {
      expect(wrapper.find('#mycheckbox').exists()).toBe(true);
    });

    it('create button', () => {
      expect(wrapper.find('a').text()).toEqual('Create');
    });
  });

  describe('user actions', () => {
    it('updates name', () => {
      const input = mWrapper.find('[name="name"]');
      input.props().onChange({ target: { value: 'Alex' } });
      expect(mWrapper.state().name).toEqual('Alex');
    });

    it('updates email', () => {
      const input = mWrapper.find('[name="email"]');
      input.props().onChange({ target: { value: 'alex@test.com' } });
      expect(mWrapper.state().email).toEqual('alex@test.com');
    });

    it('clicking create calls onSubmit', () => {
      const onSubmit = jest.fn();
      CustomerCreate.prototype.onSubmit = onSubmit;
      expect(onSubmit).toHaveBeenCalledTimes(0);
      const wrapper = shallow(<CustomerCreate />);
      wrapper.find('a').simulate('click');
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
