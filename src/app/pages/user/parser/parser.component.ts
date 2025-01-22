import { Component } from '@angular/core';

@Component({
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.scss'],
  standalone: false,
})
export class ParserComponent {
  htmlJson: string = '';
  quantityJson: string = '';
  productJson: string = '';
  tagsJson: string = '';
  parsedQuantities: any[] = [];
  parsedProducts: any[] = [];
  parsedTags: string[] = [];
  error: string = '';

  parseJson() {
    try {
      this.parsedQuantities = [];
      this.parsedProducts = [];
      this.parsedTags = [];
      this.error = '';

      const parser = new DOMParser();
      const doc = parser.parseFromString(this.htmlJson, 'text/html');

	  const allTags = [
		"POD - системи",
		"POD - системи / Ibar",
		"POD - системи / Lost vape",
		"POD - системи / OXVA",
		"POD - системи / Smok",
		"POD - системи / Vaporesso",
		"POD - системи / Voopoo",
		"Випарники, картриджі",
		"Електронні сигарети з вітамінами",
		"Електронні сигарети з вітамінами / Nutriair",
		"Електронні сигарети з вітамінами / Nutriair 3XL",
		"Електронні сигарети з вітамінами / Nutriair XL",
		"Електронні сигарети з вітамінами / Nutriair XXL",
		"За Брендами",
		"За Брендами / ARK",
		"За Брендами / Ark Drops",
		"За Брендами / Aspire",
		"За Брендами / Ego",
		"За Брендами / Eleaf",
		"За Брендами / Geekvape",
		"За Брендами / Hotcig",
		"За Брендами / IJOY",
		"За Брендами / JoyeTech",
		"За Брендами / Justfog",
		"За Брендами / Kangertech",
		"За Брендами / Logic",
		"За Брендами / Myle",
		"За Брендами / Ovns",
		"За Брендами / Sigelei",
		"За Брендами / Smoant",
		"За Брендами / Suorin",
		"За Брендами / THC",
		"За Брендами / Tesla",
		"За Брендами / UD",
		"За Брендами / Uwell",
		"За Брендами / Vandy Vape",
		"За Брендами / Wismec",
		"За Брендами / Wotofo",
		"За Брендами / Для досвідчених вейперів",
		"За Брендами / Жіночі",
		"Набори для самозамісу ( конструктори)",
		"Набори для самозамісу ( конструктори) / Набор A.R.T",
		"Набори для самозамісу ( конструктори) / Набор Fluffy Puff",
		"Набори для самозамісу ( конструктори) / Набор In Bottle Parallel",
		"Набори для самозамісу ( конструктори) / Набір Alchemist",
		"Набори для самозамісу ( конструктори) / Набір Alchemist FL",
		"Набори для самозамісу ( конструктори) / Набір Chaser Black",
		"Набори для самозамісу ( конструктори) / Набір Chaser For Pods",
		"Набори для самозамісу ( конструктори) / Набір Chaser Lux",
		"Набори для самозамісу ( конструктори) / Набір Chaser Mix",
		"Набори для самозамісу ( конструктори) / Набір Chaser Special Berry",
		"Набори для самозамісу ( конструктори) / Набір Hype Kit",
		"Набори для самозамісу ( конструктори) / Набір In Bottle Puzzle",
		"Набори для самозамісу ( конструктори) / Набір JUNI",
		"Набори для самозамісу ( конструктори) / Набір MIX BAR",
		"Набори для самозамісу ( конструктори) / Набір MOLECULON",
		"Набори для самозамісу ( конструктори) / Набір Manoli",
		"Набори для самозамісу ( конструктори) / Набір New Way",
		"Набори для самозамісу ( конструктори) / Набір OCTO BAR",
		"Набори для самозамісу ( конструктори) / Набір ULIQ",
		"Набори для самозамісу ( конструктори) / Набір Yum-Yum Star",
		"Нікотинові подушечки ( Паучі)",
		"Одноразові Pod системи",
		"Одноразові Pod системи / Airis",
		"Одноразові Pod системи / Aroma King",
		"Одноразові Pod системи / Elf Bar",
		"Одноразові Pod системи / HQD",
		"Одноразові Pod системи / Lost Mary",
		"Одноразові Pod системи / Priv Bar",
		"Одноразові Pod системи / Smok",
		"Одноразові Pod системи / VAAL",
		"Одноразові Pod системи / Vozol",
		"Одноразові Pod системи / YooZ",
		"Одноразові Pod системи / Одноразка 0мг. Без нікотину",
		"Рідини для електронних сигарет",
		"Рідини для електронних сигарет / Рідини органічні",
		"Рідини для електронних сигарет / Сольова рідина",
		"Самозаміс",
		"Самозаміс / Аромабустери",
		"Самозаміс / Ароматизатори",
		"Самозаміс / Гліцерин",
		"Самозаміс / Нікобустер",
		"Самозаміс / Нікотин",
		"Самозаміс / Пропіленгліколь",
		"Самозаміс / Тара та упаковка"
	];

      const product = {
        name: doc.querySelector('.card__name')?.textContent?.trim() || '',
        description: this.getPlainTextContent(doc.querySelector('#description')) || '',
        price: Number(doc.querySelector('[itemprop="price"]')?.textContent?.trim()) || 0,
        priceType: 'piece',
        thumb: doc.querySelector('.card__slider-item img')?.getAttribute('src') || '',
        thumbs: Array.from(doc.querySelectorAll('.card__preview-item img')).map(img => img.getAttribute('src')),
        country: this.getSiblingText(doc, 'Виробник') || 'Unknown',
        volume: Number(this.getSiblingText(doc, 'Картридж')?.replace(' мл', '').trim()) || 0,
        weight: Number(this.getSiblingText(doc, 'Вага')?.replace(' г', '').trim()) || 0,
        battery: this.getSiblingText(doc, 'Батарея (ємність)') || 'Unknown',
        power: this.getSiblingText(doc, 'Потужність') || 'Unknown',
        atomizerType: this.getSiblingText(doc, 'Вигляд атомайзера') || 'Unknown',
        warranty: this.getSiblingText(doc, 'Гарантія') || 'Unknown',
        type: this.getSiblingText(doc, 'Тип') || 'Unknown',
        tags: [] as string[],
      };

      // Parse breadcrumbs for tags
      const breadcrumbs = Array.from(doc.querySelectorAll('.bread li span[itemprop="name"]'))
        .map((el) => el.textContent?.trim())
        .filter(Boolean) as string[];

      if (breadcrumbs) {
        product.tags = breadcrumbs.filter((tag) => allTags.includes(tag));
        this.parsedTags = product.tags; // Save parsed tags
      }

      this.parsedProducts.push(product);
      this.productJson = JSON.stringify(this.parsedProducts, null, 2);

      // Parse quantity information
      const quantityElements = doc.querySelectorAll('.card__options-item');
      quantityElements.forEach((el) => {
        const quantity = {
          name: el.querySelector('a')?.getAttribute('title') || '',
          thumb: el.querySelector('img')?.getAttribute('src') || '',
          code: 0,
          quantity: 5,
        };
        this.parsedQuantities.push(quantity);
      });
      this.quantityJson = JSON.stringify(this.parsedQuantities, null, 2);

      // Save parsed tags as JSON
      this.tagsJson = JSON.stringify(this.parsedTags, null, 2);
    } catch (err) {
      this.error = 'Failed to parse the HTML. Please check the format and try again.';
      console.error(err);
    }
  }

  private getPlainTextContent(element: Element | null): string {
    const clone = element?.cloneNode(true) as HTMLElement | null;
    if (clone) {
      clone.querySelectorAll('style, script').forEach((el) => el.remove());
      return clone.textContent?.trim() || '';
    }
    return '';
  }

  private getSiblingText(doc: Document, label: string): string | null {
    const element = Array.from(doc.querySelectorAll('li')).find((li) =>
      li.textContent?.trim().startsWith(label)
    );
    return element?.querySelector('b')?.textContent?.trim() || null;
  }

  reset() {
    this.htmlJson = '';
    this.quantityJson = '';
    this.productJson = '';
    this.tagsJson = '';
    this.parsedQuantities = [];
    this.parsedProducts = [];
    this.parsedTags = [];
    this.error = '';
  }
}
