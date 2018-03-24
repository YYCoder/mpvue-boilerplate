<template>
  <button @click="click">{{ text }}</button>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    click() {
      this.$emit('ui-click')
    }
  }
}
</script>

<style lang="scss">
@import "~static/css/base";

button {
  margin-left: 10px;
  font-size: 14px;
  border-radius: 3px;
  box-shadow: 0 3px 0px 1px $fontGray;
  padding: 5px 10px;
  display: inline-block;
  background-color: #fff;
  -webkit-appearance: none;
  line-height: 1.15;
  margin-right: 0;
  &:active {
    box-shadow: 0 1px 0px 1px $fontGray;
    transform: translateY(1px);
  }
}  
</style>
