import { mount } from '@vue/test-utils'
import TextValue from './../../src/components/TextValue.vue';

describe('TextValue.vue Test', () => {
  it('Should render corrrect value and empty suffix and preffix', () => {
    const wrapper = mount(TextValue, {
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
    const wrapper = mount(TextValue, {
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
    const wrapper = mount(TextValue, {
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

  it('Should render correct tooltip if passed and showTooltipOnHover is true', () => {
    const wrapper = mount(TextValue, {
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
    const wrapper = mount(TextValue, {
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