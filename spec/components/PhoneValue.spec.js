import { mount } from '@vue/test-utils'
import PhoneValue from './../../src/components/PhoneValue.vue';

describe('PhoneValue.vue Test', () => {
  it('Should render corrrect value and empty suffix and preffix', () => {
    const wrapper = mount(PhoneValue, {
      propsData: {
        value: 'test value',
        prefix: null,
        suffix: null,
        tooltip: null,
        showTooltipOnHover: false,
      }
    });
 
    expect(wrapper).toMatchSnapshot();      
  });

  it('Should render corrrect value and prefix if passed and no suffix', () => {
    const wrapper = mount(PhoneValue, {
      propsData: {
        value: 'test value',
        prefix: 'prefix',
        suffix: null,
        tooltip: null,
        showTooltipOnHover: false,
      }
    });

    expect(wrapper).toMatchSnapshot();      
  });

  it('Should render corrrect value, suffix and prefix if passed', () => {
    const wrapper = mount(PhoneValue, {
      propsData: {
        value: 'test value',
        prefix: 'prefix',
        suffix: 'suffix',
        tooltip: null,
        showTooltipOnHover: false,
      }
    });
 
    expect(wrapper).toMatchSnapshot();        
  });

  it('Should render corrrect tel:', () => {
    const wrapper = mount(PhoneValue, {
      propsData: {
        value: '+359887878966',
        prefix: null,
        suffix: null,
        tooltip: null,
        showTooltipOnHover: false,
      }
    });
 
    expect(wrapper).toMatchSnapshot();        
  });

  it('Should render correct tooltip if passed and showTooltipOnHover is true', () => {
    const wrapper = mount(PhoneValue, {
      propsData: {
        value: null,
        prefix: null,
        suffix: null,
        tooltip: 'Some tooltip',
        showTooltipOnHover: true,
      }
    });
 
    expect(wrapper).toMatchSnapshot();        
  });

  it('Should not render correct tooltip if passed and showTooltipOnHover is false', () => {
    const wrapper = mount(PhoneValue, {
      propsData: {
        value: null,
        prefix: null,
        suffix: null,
        tooltip: 'Some tooltip',
        showTooltipOnHover: false,
      }
    });
 
    expect(wrapper).toMatchSnapshot();        
  });
});