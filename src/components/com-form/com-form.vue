<template>
<div id="com-form" @keyup.enter="handleClick('submit')">
  <Form ref="comForm" :model="model" :rules="rules" :inline="inline" :label-width="labelWidth" :label-position="labelPosition">
    <slot> </slot>
    <FormItem :prop="item.prop" :label="item.label" :label-width="item.labelWidth" v-for="(item, index) in items" :key="index">
      <template v-if="!item.button">
        <!-- 输入框 -->
        <Input v-if="!item.element" :type="item.type" v-model="model[item.prop]" :placeholder="item.placeholder" :disabled="item.disabled" :readonly="item.readonly" :icon="item.icon" :rows="item.rows" :autosize="item.autosize" :number="item.number"
          :autofocus="item.autofocus"></Input>
        <!-- 选择器 -->
        <Select v-if="item.element === 'select'" v-model="model[item.prop]" :multiple="item.multiple" :disabled="item.disabled" :filterable="item.filterable" :placeholder="item.placeholder" :not-found-text="item.notFoundText" :transfer="item.transfer" :style="{width: item.width + 'px'}">
          <Option v-for="(opt, index) in item.option" :key="index" :value="opt.value" :disabled="opt.disabled">{{ opt.label }}</Option>
        </Select>
        <!-- 日期选择器 -->
        <DatePicker v-if="item.element === 'date'" :type="item.type" v-model="model[item.prop]" :format="item.format" :placeholder="item.placeholder" :disabled="item.disabled" :readonly="item.readonly" :transfer="item.transfer"></DatePicker>
        <!-- 时间选择器 -->
        <TimePicker v-if="item.element === 'time'" :type="item.type" v-model="model[item.prop]" :format="item.format" :steps="item.steps" :placeholder="item.placeholder" :disabled="item.disabled" :readonly="item.readonly" :transfer="item.transfer"></TimePicker>
        <!-- 单选框 -->
        <RadioGroup v-if="item.element === 'radio'" v-model="model[item.prop]" :type="item.type" :vertical="item.vertical">
          <Radio v-for="(opt, index) in item.option" :key="index" :label="opt.value" :disabled="opt.disabled">{{ opt.label }}</Radio>
        </RadioGroup>
        <!-- 多选框 -->
        <CheckboxGroup v-if="item.element === 'checkbox'" v-model="model[item.prop]">
          <Checkbox v-for="(opt, index) in item.option" :key="index" :label="opt.value" :disabled="opt.disabled">{{ opt.label }}</Checkbox>
        </CheckboxGroup>
      </template>
      <template v-else>
        <!-- 按钮 -->
        <Button v-for="(item, index) in item.button" :key="index" :type="item.type" :long="item.long" :disabled="item.disabled" :loading="item.loading ? btnLoading : false" :icon="item.icon" @click="handleClick(item.name)" style="margin-right: 8px;">{{ item.text }}</Button>
      </template>
    </FormItem>
    <slot name="foot"> </slot>
  </Form>
  <Spin size="large" fix v-if="loading"></Spin>
</div>
</template>
<script>
export default {
  name: 'com-form',
  props: {
    inline: Boolean, // 行内表单模式
    labelWidth: Number, // 表单域标签宽度
    labelPosition: String, // 表单域标签位置
    items: Array, // 表单元素数组
    model: Object, // 表单数据对象
    rules: Object, // 表单验证对象
    // 表单加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 按钮加载状态
    btnLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    validateField(name) {
      // 对部分表单字段进行校验的方法
      this.$refs['comForm'].validateField(name)
    },
    resetFields() {
      // 对整个表单进行重置
      this.$refs['comForm'].resetFields()
    },
    handleClick(name) {
      if (name === 'submit') {
        // 对整个表单进行校验
        this.$refs['comForm'].validate(valid => {
          if (valid) {
            this.$emit('on-submit')
          }
        })
      } else if (name === 'reset') {
        this.resetFields()
        this.$emit('on-reset')
      } else {
        this.$emit('on-click')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#com-form {
    position: relative;
}
</style>
