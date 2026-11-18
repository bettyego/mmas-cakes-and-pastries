/**
 * ============================================================
 *  BUSINESS INFORMATION — edit this file to update contact
 *  details, wording and links used across the whole website.
 * ============================================================
 */

export const business = {
  name: "MMA's Cakes and Pastries",
  shortName: "MMA's",
  tagline: 'Freshly Baked with Love',
  supportingMessage: 'Your Satisfaction Is Our Priority.',
  location: 'Abuja, Nigeria',
  city: 'Abuja',
  shortDescription:
    'Customised celebration cakes, cupcakes, pastries, puff-puff, doughnuts and small chops — freshly baked in Abuja for everyday moments and unforgettable occasions.',

  /**
   * Phone / WhatsApp lines.
   *  - display:  how the number is shown on the website
   *  - tel:      international format used for "tap to call"
   *  - whatsapp: digits only, country code first, no "+" or leading 0
   */
  phones: [
    {
      id: 'line-1',
      label: 'Line 1',
      display: '0704 298 7239',
      tel: '+2347042987239',
      whatsapp: '2347042987239',
    },
    {
      id: 'line-2',
      label: 'Line 2',
      display: '0701 740 5551',
      tel: '+2347017405551',
      whatsapp: '2347017405551',
    },
  ],

  currencySymbol: '₦',
}

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#menu', label: 'Our Menu' },
  { href: '#custom-cakes', label: 'Custom Cakes' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]
