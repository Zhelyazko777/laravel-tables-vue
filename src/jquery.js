export const initJqueryCode = () => {
  function registerEventListeners () {
    $('*[data-slider-menu]').on('click', onSliderMenuOpenIconClick);
    $('*[data-slider-menu-to-close]').on('click', onSliderMenuCloseIconClick);
  }

  $(function () {
    registerEventListeners();
  });
  
  function onSliderMenuCloseIconClick () {
      const $this = $(this);
      const $slider = $('#' + $this.attr('data-slider-menu-to-close'));

      $slider.removeClass('menu-shown');
      $('body').removeClass('slider-overflow-hidden');
  }

  function onSliderMenuOpenIconClick () {
      const $this = $(this);
      const $slider = $('#' + $this.attr('data-slider-menu'));

      $slider.addClass('menu-shown');
      $('body').addClass('slider-overflow-hidden');
  }

  window.showSliderLoading = (sliderId) => {
      $(`#${sliderId}`).find('.loading-overlay').addClass('show');         
  }

  window.stopSliderLoading = (sliderId) => {
    $(`#${sliderId}`).find('.loading-overlay').removeClass('show');
  }
};