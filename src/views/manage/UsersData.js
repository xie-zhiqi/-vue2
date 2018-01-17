export default {
  // 表单元素对象数组(搜索)
  searchItems: [
    {
      element: 'input',
      prop: 'name',
      icon: 'ios-search-strong',
      placeholder: 'Search Name'
    }, {
      element: 'button',
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
      element: 'input',
      label: 'Name',
      prop: 'name',
      placeholder: 'Enter your name'
    }, {
      element: 'input',
      number: true,
      label: 'Age',
      prop: 'age',
      placeholder: 'Enter your age'
    }, {
      element: 'input',
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
      element: 'input',
      type: 'textarea',
      label: 'Desc',
      prop: 'desc',
      placeholder: 'Enter something...'
    }, {
      element: 'button',
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
