<template>
  <div class="modal fade" :id="id" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ heading }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              {{body}}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-link" data-dismiss="modal">{{ cancelBtnText }}</button>
                <form :action="actionRoute" method="post">
                    <input type="hidden" name="_token" :value="csrf">
                    <button type="submit" class="btn btn-primary">
                        {{ submitBtnText }}
                    </button>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import CsrfMixin from './../mixins/csrf.mixin.js';

export default {
  props: {
    id: {
      required: true,
      type: String,
    },
    heading: {
      required: true,
      type: String,
    },
    body: {
      required: true,
      type: String,
    },
    actionRoute: {
      required: true,
      type: String,
    },
    cancelBtnText: {
      required: true,
      type: String,
    },
    submitBtnText: {
      required: true,
      type: String,
    },
  },
  mixins: [ CsrfMixin, ]
}
</script>

<style lang="scss" scoped>
  
</style>