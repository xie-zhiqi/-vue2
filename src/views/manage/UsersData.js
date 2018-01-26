export default {
  // 表单元素对象数组(搜索)
  searchItems: [
    {
      prop: 'name',
      icon: 'ios-search-strong',
      placeholder: 'Search Name'
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
      number: true,
      label: 'Age',
      prop: 'age',
      placeholder: 'Enter your age'
    }, {
      label: 'E-mail',
      prop: 'email',
      placeholder: 'Enter your e-mail'
    }, {
      element: 'select',
      label: 'City',
      prop: 'city',
      placeholder: 'Select your city',
      option: []
    }, {
      element: 'date',
      label: 'Birth',
      prop: 'birth',
      placeholder: 'Select your birth'
    }, {
      element: 'radio',
      label: 'Gender',
      prop: 'gender',
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
      element: 'checkbox',
      label: 'Hobby',
      prop: 'hobby',
      option: []
    }, {
      type: 'textarea',
      label: 'Desc',
      prop: 'desc',
      placeholder: 'Enter something...'
    }, {
      button: [
        {
          name: 'submit',
          type: 'primary',
          text: 'Submit',
          loading: true
        }, {
          name: 'reset',
          type: 'ghost',
          text: 'Reset'
        }
      ]
    }
  ]
}
