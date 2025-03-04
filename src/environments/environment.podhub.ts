import { environment as environmentProd } from './environment.prod';

export const environment = {
	...environmentProd,
	appId: 'podhub',
	commerceId: '674d9cbe7f4e98c4f2482a20',
	meta: {
		title: 'PodHub | Vape shop - вейпи, PODіки, картриджі, рідини та більше',
		description:
			'Ласкаво просимо до PodHub, вашого надійного магазину для всіх потреб у вейпах та одноразках. Ми пропонуємо широкий вибір вейпів, одноразок, pods, картриджів та жижок найвищої якості. У PodHub ви знайдете все необхідне для задоволення ваших вейпінгових потреб. Ми гарантуємо якість, доступні ціни та швидку доставку по всій Україні Новою поштою. Адреса: м. Вінниця, вул. Немирівське шосе 94Е (ЖК Сімейний Комфорт, біля маг. Калина). Графік роботи: з 9:00 до 21:00. Підпишіться на наші новини, щоб першими дізнаватися про нові надходження та акційні пропозиції. Завітайте до PodHub - вашого надійного партнера у світі вейпінгу!',
		icon: 'https://ngx.webart.work/assets/podhub/favicon.jpg',
		logo: 'assets/podhub/beef.svg'
	}
};
