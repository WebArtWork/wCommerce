export const commerceproductquantityFormComponents = {
	formId: 'commerceproductquantity',
	title: 'Commerceproductquantity',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproductquantity title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproductquantity description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
			
		},
		{
			name: 'Photo',
			key: 'thumb',
			fields: [
				{
					name: 'Label',
					value: 'Header picture'
				}
			]
		},
		{
			name: 'Number',
			key: 'code',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproductquantity code',
				},
				{
					name: 'Label',
					value: 'Code',
				}
			]
			
		}
	]
};
