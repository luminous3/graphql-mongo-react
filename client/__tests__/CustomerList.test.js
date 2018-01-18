import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { CustomerList } from '../components/CustomerList';

const customers = [
  { id: '1', name: 'Alex', email: 'alex@test.com', prime: true },
  { id: '2', name: 'Sam', email: 'sam@test.com', prime: false }
];

const data = {
  customers: customers,
  loading: false
};

function Link() {
  return <div />;
}

const wrapper = shallow(<CustomerList data={data} />);

describe('CustomerList', () => {
  it('should render without throwing an error', () => {
    expect(wrapper.exists(<ul className="collection" />)).toBe(true);
  });

  describe('render', () => {
    it('two customer rows', () => {
      const rows = wrapper.find('li');
      expect(rows).toHaveLength(2);
    });

    it('link to create new customer', () => {
      const link = wrapper.find('[to="/customers/new"]');
      expect(link.exists()).toBe(true);
    });

    it('new customer icon', () => {
      const icons = [];
      wrapper.find('i').map(e => {
        if (e.text() === 'add') {
          icons.push(e);
        }
      });
      expect(icons.length).toEqual(1);
    });

    it('edit icons for user', () => {
      const icons = [];
      wrapper.find('i').map(e => {
        if (e.text() === 'edit') {
          icons.push(e);
        }
      });
      expect(icons.length).toEqual(2);
    });

    it('link to edit customers', () => {
      const linkOne = wrapper.find('[to="/customers/1/edit"]');
      expect(linkOne.exists()).toBe(true);
      const linkTwo = wrapper.find('[to="/customers/2/edit"]');
      expect(linkTwo.exists()).toBe(true);
    });

    it('link to view customer homepage', () => {
      const linkOne = wrapper.find('[to="/customers/1"]');
      expect(linkOne.exists()).toBe(true);
      const linkTwo = wrapper.find('[to="/customers/2"]');
      expect(linkTwo.exists()).toBe(true);
    });

    it('customer names', () => {
      const customerOne = wrapper.find('[to="/customers/1"]');
      expect(customerOne.props().children).toContain('Alex');
      const customerTwo = wrapper.find('[to="/customers/2"]');
      expect(customerTwo.props().children).toContain('Sam');
    });
  });
});
