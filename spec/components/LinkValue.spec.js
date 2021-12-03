import { mount } from '@vue/test-utils'
import LinkValue from './../../src/components/LinkValue.vue';

describe('LinkValue.vue Test', () => {
  it('Should render corrrect value and empty suffix and preffix', () => {
    const wrapper = mount(LinkValue, {
      propsData: {
        value: 'test value',
        route: null,
        prefix: null,
        suffix: null,
        tooltip: null,
        showTooltipOnHover: false,
      }
    });
 
    expect(wrapper).toMatchSnapshot();      
  });

  it('Should render corrrect value and prefix if passed and no suffix', () => {
    const wrapper = mount(LinkValue, {
      propsData: {
        value: 'test value',
        route: null,
        prefix: 'prefix',
        suffix: null,
        tooltip: null,
        showTooltipOnHover: false,
      }
    });

    expect(wrapper).toMatchSnapshot();      
  });

  it('Should render corrrect value, suffix and prefix if passed', () => {
    const wrapper = mount(LinkValue, {
      propsData: {
        value: 'test value',
        route: null,
        prefix: 'prefix',
        suffix: 'suffix',
        tooltip: null,
        showTooltipOnHover: false,
      }
    });
 
    expect(wrapper).toMatchSnapshot();        
  });

  it('Should render corrrect href', () => {
    const wrapper = mount(LinkValue, {
      propsData: {
        value: null,
        route: 'route',
        prefix: null,
        suffix: null,
        tooltip: null,
        showTooltipOnHover: false,
      }
    });
 
    expect(wrapper).toMatchSnapshot();        
  });

  it('Should render correct tooltip if passed and showTooltipOnHover is true', () => {
    const wrapper = mount(LinkValue, {
      propsData: {
        value: null,
        route: null,
        prefix: null,
        suffix: null,
        tooltip: 'Some tooltip',
        showTooltipOnHover: true,
      }
    });
 
    expect(wrapper).toMatchSnapshot();        
  });

  it('Should not render correct tooltip if passed and showTooltipOnHover is false', () => {
    const wrapper = mount(LinkValue, {
      propsData: {
        value: null,
        route: null,
        prefix: null,
        suffix: null,
        tooltip: 'Some tooltip',
        showTooltipOnHover: false,
      }
    });
 
    expect(wrapper).toMatchSnapshot();        
  });
});