export default {
  // 表单元素对象数组(搜索)
  searchItems: [
    {
      label: 'Name',
      prop: 'name',
      placeholder: 'Search Name',
      icon: 'ios-search-strong',
      labelWidth: 60
    }, {
      button: [
        {
          name: 'submit',
          type: 'primary',
          text: 'Search'
        }, {
          name: 'reset',
          type: 'ghost',
          text: 'Reset'
        }
      ]
    }
  ],
  // 表单元素对象数组(用户)
  userItems: [
    {
      label: 'Name',
      prop: 'name',
      placeholder: 'Enter your name'
    }, {
      label: 'Age',
      prop: 'age',
      placeholder: 'Enter your age',
      number: true
    }, {
      label: 'E-mail',
      prop: 'email',
      placeholder: 'Enter your e-mail'
    }, {
      label: 'City',
      prop: 'city',
      placeholder: 'Select your city',
      element: 'select',
      option: []
    }, {
      label: 'Birth',
      prop: 'birth',
      placeholder: 'Select your birth',
      element: 'date'
    }, {
      label: 'Gender',
      prop: 'gender',
      element: 'radio',
      option: [
        {
          label: 'Male',
          value: '1'
        }, {
          label: 'Female',
          value: '0'
        }
      ]
    }, {
      label: 'Hobby',
      prop: 'hobby',
      element: 'checkbox',
      option: []
    }, {
      label: 'Desc',
      prop: 'desc',
      placeholder: 'Enter something...',
      type: 'textarea'
    }, {
      button: [
        {
          name: 'submit',
          type: 'primary',
          text: 'Submit'
        }, {
          type: 'ghost',
          text: 'Cancel'
        }
      ]
    }
  ],
  // 补丁数据(城市)
  city: [
    {
      label: 'BeiJing',
      value: 'beijing'
    }, {
      label: 'ShangHai',
      value: 'shanghai'
    }, {
      label: 'ShenZhen',
      value: 'shenzhen'
    }, {
      label: 'GuangZhou',
      value: 'guangzhou'
    }, {
      label: 'HangZhou',
      value: 'hangzhou'
    }, {
      label: 'NingBo',
      value: 'ningbo'
    }
  ],
  // 补丁数据(爱好)
  hobby: [
    {
      label: 'Eat',
      value: 'eat'
    }, {
      label: 'Sleep',
      value: 'sleep'
    }, {
      label: 'Run',
      value: 'run'
    }, {
      label: 'Movie',
      value: 'movie'
    }
  ]
}
