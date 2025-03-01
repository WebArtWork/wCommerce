export const environment = {
	roles: ['commerce'],
	production: true,
	appId: 'wcommerce',
	url: 'https://webart.work',
	usePortfolio: false,
	useService: false,
	useProduct: true,
	defaultLanguage: 'uk',
	languages: [
		{
			code: 'en',
			name: 'English',
			origin: 'English'
		},
		{
			code: 'uk',
			name: 'Українська',
			origin: 'Українська'
		}
	],
	meta: {
		title: 'wCommerce',
		description:
			"WCommerce is a powerful and flexible platform designed to help businesses create stunning web and mobile storefronts with ease. Whether you're a small startup or an established enterprise, WCommerce provides everything you need to launch, manage, and grow your online store",
		icon: 'https://ngx.webart.work/assets/logo.png',
		logo: ''
	},
	sign: {
		email: '',
		password: '',
		resetPin: null
	},
	commerceId: '',
	commerceArticleUrl: '/commerce/articles/link',
	defaultLanguageCode: 'uk',
	defaultTranslations: {
		uk: {
			'Theme.Orders': 'Замовлення',
			'Theme.Commerces': 'Комерція',
			'Theme.Stores': 'Магазини',
			'Theme.Users': 'Користувачі',
			'Theme.Warehouses': 'Склади',
			'Theme.Products': 'Продукти',
			'Theme.Brands': 'Бренди',
			'Form_profile.Name': "Ім'я",
			'Form_profile.Phone': 'Телефон',
			'Theme.Contents': 'Контент',
			'Theme.Tags': 'Теги',
			'Theme.Discounts': 'Знижки',
			'Form_profile.Enter your bio': 'Введіть вашу біографію',
			'Form_profile.Enter your name': "Введіть ваше ім'я",
			'Form_profile.Enter your phone': 'Введіть ваш телефон',
			'Form_profile.your phone number': 'ваш номер телефону',
			'Form_profile.Profile Settings': 'Налаштування профілю',
			'Form_profile.Bio': 'Біографія',
			'Form_profile.': '',
			'Form_profile.your date of birth': 'ваша дата народження',
			'Form_profile.Birthday': 'День народження',
			'Form_profile.your living city': 'місто проживання',
			"Form_profile.what's your education": 'яка у вас освіта',
			'Form_profile.City': 'Місто',
			'Form_profile.descibe your working experience':
				'опишіть ваш досвід роботи',
			'Form_profile.Education': 'Освіта',
			'Form_profile.Experience': 'Досвід',
			'Form_profile.Weekly availability': 'Тижнева доступність',
			'Form_profile.how many hours you are available weekly':
				'скільки годин на тиждень ви доступні',
			'Form_profile.on what you wanna focus, developer, design or agent':
				'на чому ви хочете зосередитись: розробка, дизайн або агент',
			'Form_profile.Professional role': 'Професійна роль',
			"Form_profile.Your expectation from potentional work, or expectation to don't have":
				'Ваші очікування від потенційної роботи або відсутність очікувань',
			'Form_profile.Salary': 'Зарплата',
			'Form_profile.your hourly payment expectation in USD':
				'ваше очікування погодинної оплати в USD',
			'Form_profile.your monthly salary expectetion in USD':
				'ваше очікування місячної зарплати в USD',
			'Form_profile.Work expectation': 'Очікування від роботи',
			'Form_profile.Hourly': 'Погодинно',
			'Form_profile.fill your instagram profile url':
				'введіть URL вашого профілю в Instagram',
			'Form_profile.Facebook': 'Facebook',
			'Form_profile.fill your facebook profile url':
				'введіть URL вашого профілю в Facebook',
			'Form_profile.Instagram': 'Instagram',
			'Form_profile.fill your viber link':
				'введіть посилання на ваш Viber',
			'Form_profile.fill your telegram link':
				'введіть посилання на ваш Telegram',
			'Form_profile.Viber': 'Viber',
			'Form_profile.Telegram': 'Telegram',
			'Form_change password.Change password': 'Змінити пароль',
			'Form_change password.Enter your old password':
				'Введіть ваш старий пароль',
			'Form_change password.Old Password': 'Старий пароль',
			'Form_change password.New Password': 'Новий пароль',
			'Profile.Logout': 'Вийти',
			'Form_change password.Enter your new password':
				'Введіть ваш новий пароль',
			'<button> Profile.Change Password </button>':
				'Змінити пароль </button>',
			'Form_sign.Sign In / Sign Up': 'Увійти / Зареєструватися',
			'Form_sign.Password': 'Пароль',
			'Form_sign.Enter your email': 'Введіть вашу електронну пошту',
			'Form_sign.Enter your password': 'Введіть ваш пароль',
			'Form_sign.Email': 'Електронна пошта',
			'Form_sign.Enter code from email':
				'Введіть код з електронної пошти',
			"Form_sign.Let's go": 'Поїхали',
			'Form_sign.code': 'код',
			'Theme.Forms': 'Форми',
			'Form_form.Custom form': 'Користувацька форма',
			'Form_form.Select form id': 'Виберіть ID форми',
			'Theme.Translates': 'Переклади',
			'Form_form.fill title': 'введіть заголовок',
			'Form_form.Title': 'Заголовок',
			'Form_form.Form ID': 'ID форми',
			'Form_formComponents.Form Component': 'Компонент форми',
			'Form_formComponents.Custom components': 'Користувацькі компоненти',
			'Form_formComponents.Select form componnet':
				'Виберіть компонент форми',
			'Form_translate.fill Translate': 'введіть переклад',
			'Form_translate.Translate': 'Переклад',
			'Form_translateAll.fill Translate': 'введіть переклад',
			'Form_translateAll.Translate All': 'Перекласти все',
			'Form_translateAll.Translate': 'Переклад',
			'Common.All': 'Усі',
			' Common.Select language ': 'Виберіть мову',
			'Common.Translate missed': 'Перекласти відсутнє',
			' Common.Select page ': 'Виберіть сторінку',
			'Form_commerce.fill commerce title': 'введіть заголовок комерції',
			'Common.Translate all': 'Перекласти все',
			'Form_commerce.Title': 'Заголовок',
			'Form_commerce.fill commerce description': 'введіть опис комерції',
			'Form_commerce.Description': 'Опис',
			'Form_commerce.Commerce': 'Комерція',
			'Form_commerceorder.Title': 'Заголовок',
			'Form_commerceorder.Commerceorder': 'Замовлення комерції',
			'Form_commerceorder.Description': 'Опис',
			'Form_commerceorder.fill commerceorder title':
				'введіть заголовок замовлення комерції',
			'Form_commerceorder.fill commerceorder description':
				'введіть опис замовлення комерції',
			'Form_commercestore.fill commercestore title':
				'введіть заголовок магазину комерції',
			'Form_commercestore.Commercestore': 'Магазин комерції',
			'Form_commercestore.Description': 'Опис',
			'Form_commercestore.fill commercestore description':
				'введіть опис магазину комерції',
			'Form_commercestore.Title': 'Заголовок',
			'Form_commercewarehouse.fill commercewarehouse title':
				'введіть заголовок складу комерції',
			'Form_commercewarehouse.fill commercewarehouse description':
				'введіть опис складу комерції',
			'Form_commercewarehouse.Title': 'Заголовок',
			'Form_commercewarehouse.Description': 'Опис',
			'Form_commercewarehouse.Commercewarehouse': 'Склад комерції',
			'Form_commerceproduct.Commerceproduct': 'Продукт комерції',
			'Form_commerceproduct.Description': 'Опис',
			'Form_commerceproduct.fill commerceproduct title':
				'введіть заголовок продукту комерції',
			'Form_commerceproduct.fill commerceproduct description':
				'введіть опис продукту комерції',
			'Form_commerceproduct.Title': 'Заголовок',
			'Form_commerceproduct.fill commerceproduct country':
				'введіть країну продукту комерції',
			'Form_commerceproduct.fill commerceproduct volume':
				"введіть об'єм продукту комерції",
			'Form_commerceproduct.Country': 'Країна',
			'Form_commerceproduct.Volume': "Об'єм",
			'Form_commerceproduct.fill commerceproduct weight':
				'введіть вагу продукту комерції',
			'Form_commerceproduct.Battery': 'Батарея',
			'Form_commerceproduct.fill commerceproduct battery':
				'введіть батарею продукту комерції',
			'Form_commerceproduct.Weight': 'Вага',
			'Form_commerceproduct.fill commerceproduct power':
				'введіть потужність продукту комерції',
			'Form_commerceproduct.Power': 'Потужність',
			'Form_commerceproduct.fill commerceproduct warranty':
				'введіть гарантію продукту комерції',
			'Form_commerceproduct.AtomizerType': 'Тип атомайзера',
			'Form_commerceproduct.fill commerceproduct atomizerType':
				'введіть тип атомайзера продукту комерції',
			'Form_commerceproduct.Warranty': 'Гарантія',
			'Form_commerceproduct.fill commerceproduct type':
				'введіть тип продукту комерції',
			'Form_commerceproduct.fill commerceproduct price':
				'введіть ціну продукту комерції',
			'Form_commerceproduct.Type': 'Тип',
			'Form_commerceproduct.fill product tag': 'введіть тег продукту',
			'Form_commerceproduct.Price': 'Ціна',
			'Form_commerceproduct.Detailed pictures': 'Детальні зображення',
			'Form_commerceproduct.Header picture': 'Головне зображення',
			'Form_commercecontent.fill commercecontent description':
				'введіть опис комерційного контенту',
			'Form_commerceproduct.Tag': 'Тег',
			'Form_commercecontent.fill commercecontent title':
				'введіть заголовок комерційного контенту',
			'Form_commercecontent.Commercecontent': 'Комерційний контент',
			'Form_commercecontent.Title': 'Заголовок',
			'Form_commercecontent.Description': 'Опис',
			'Form_commercetag.fill commercetag title':
				'введіть заголовок комерційного тега',
			'Form_commercetag.Commercetag': 'Комерційний тег',
			'Form_commercetag.fill commercetag description':
				'введіть опис комерційного тега',
			'Form_commercetag.Header picture': 'Заголовне зображення',
			'Form_commercetag.Description': 'Опис',
			'Form_commercetag.Title': 'Заголовок',
			'Form_commercediscount.Commercediscount': 'Комерційна знижка',
			'Form_commercediscount.Description': 'Опис',
			'Form_commercediscount.fill commercediscount description':
				'введіть опис комерційної знижки',
			'Form_commercediscount.Title': 'Заголовок',
			'Form_commercediscount.fill commercediscount title':
				'введіть заголовок комерційної знижки',
			'Form_commerce.Комерція': 'Комерція',
			'Form_commerce.Заголовок': 'Заголовок',
			'Form_commerce.введіть заголовок комерції':
				'введіть заголовок комерції',
			'Form_commerce.введіть опис комерції': 'введіть опис комерції',
			' Theme.Filters ': 'Фільтри',
			'Form_commerce.Опис': 'Опис',
			' Theme.Products ': 'Продукти',
			'Common.Remove from cart': 'Видалити з кошика',
			'Common.Add to cart': 'Додати в кошик',
			'Common.Order': 'Замовлення',
			'Form_article.Article': 'Стаття',
			'Theme.Articles': 'Статті',
			'Form_article.fill article title': 'введіть заголовок статті',
			'Form_article.Title': 'Заголовок',
			'Form_article.Description': 'Опис',
			'Form_article.fill article description': 'введіть опис статті',
			'Common.No': 'Ні',
			'Common.Are you sure you want to delete this article?':
				'Ви впевнені, що хочете видалити цю статтю?',
			'Common.Yes': 'Так',
			'Form_article.fill article link': 'введіть посилання на статтю',
			'Form_article.fill article video': 'введіть відео для статті',
			'Form_article.Link': 'Посилання',
			'Form_article.Video': 'Відео',
			'Form_article.fill articles short description':
				'введіть короткий опис статті',
			'Form_article.Short Description': 'Короткий опис',
			'Form_article.fill articles description': 'введіть опис статті',
			'Form_article.Select tags': 'Виберіть теги',
			'Form_article.Tags': 'Теги',
			'Form_article.Date': 'Дата',
			'Form_article.Thumb': 'Мініатюра',
			'Form_article.Select document': 'Виберіть документ',
			'Form_article.Documents': 'Документи',
			'Form_article.Select documents': 'Виберіть документи',
			'Sign.Enter proper email': 'Введіть правильну електронну пошту',
			'Form_article.Document': 'Документ',
			'Sign.Enter your email': 'Введіть вашу електронну пошту',
			'Form_commercewarehouse.введіть заголовок складу комерції':
				'введіть заголовок складу комерції',
			'Form_commercewarehouse.Склад комерції': 'Склад комерції',
			'Form_commercewarehouse.Заголовок': 'Заголовок',
			'Form_commercewarehouse.Опис': 'Опис',
			'Form_commercestore.Опис': 'Опис',
			'Form_commercewarehouse.введіть опис складу комерції':
				'введіть опис складу комерції',
			'Form_commercestore.Заголовок': 'Заголовок',
			'Form_commercestore.введіть опис магазину комерції':
				'введіть опис магазину комерції',
			'Form_commercestore.введіть заголовок магазину комерції':
				'введіть заголовок магазину комерції',
			'Form_commercestore.Магазин комерції': 'Магазин комерції',
			'Form_commerceorder.Замовлення комерції': 'Замовлення комерції',
			'Form_commerceorder.введіть заголовок замовлення комерції':
				'введіть заголовок замовлення комерції',
			'Form_commerceorder.Заголовок': 'Заголовок',
			'Form_commerceorder.Опис': 'Опис',
			'Form_commerceorder.введіть опис замовлення комерції':
				'введіть опис замовлення комерції',
			'Common.Are you sure you want to delete this commercestore?':
				'Ви впевнені, що хочете видалити цей магазин комерції?'
		}
	}
};
