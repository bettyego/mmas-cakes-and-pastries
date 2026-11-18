/**
 * ============================================================
 *  MENU / PRODUCT CATALOGUE
 * ============================================================
 *
 *  HOW TO EDIT
 *  -----------
 *  • price:    a number in Naira (e.g. 4500) once confirmed, or null.
 *              null shows "Price on request" and the item is still
 *              orderable — the price is confirmed on WhatsApp.
 *  • isSample: true  = demonstration entry (name/photo/options not yet
 *              confirmed by the bakery). Set to false once the item,
 *              photo and details are confirmed. While any item is a
 *              sample, the menu shows a short "availability is confirmed
 *              on WhatsApp" note to customers.
 *  • image:    path inside /public, e.g. '/images/cupcakes/red-velvet.webp'.
 *              Replace with real photos of MMA's products when available.
 *  • options:  optional choices shown in the product details window.
 *              Example: { name: 'Pack size', choices: ['Box of 6', 'Box of 12'] }
 *              To give an option its own price, use objects:
 *              choices: [{ label: 'Box of 6', price: 6000 }, { label: 'Box of 12', price: 11000 }]
 *
 *  Categories with  orderType: 'enquiry'  (custom cakes) are not added to
 *  the cart — customers are taken to the custom cake enquiry form instead.
 */

export const categories = [
  {
    id: 'custom-cakes',
    name: 'Custom Cakes',
    blurb: 'Beautiful cakes for birthdays, anniversaries, celebrations and special occasions.',
    image: '/images/cakes/tiered-floral.webp',
    orderType: 'enquiry',
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    blurb: 'Beautifully decorated cupcakes in different flavours and styles.',
    image: '/images/cupcakes/red-velvet.webp',
    orderType: 'cart',
  },
  {
    id: 'pies-pastries',
    name: 'Pies & Pastries',
    blurb: 'Golden meat pies and other freshly baked pastry favourites.',
    image: '/images/pastries/meat-pie-closeup.webp',
    orderType: 'cart',
  },
  {
    id: 'doughnuts-puff-puff',
    name: 'Doughnuts & Puff-Puff',
    blurb: 'Fresh doughnuts, soft puff-puff and other sweet treats.',
    image: '/images/doughnuts/puff-puff-sugar.webp',
    orderType: 'cart',
  },
  {
    id: 'small-chops',
    name: 'Small Chops',
    blurb: 'Assorted small chops and party treats for every gathering.',
    image: '/images/small-chops/platter.webp',
    orderType: 'cart',
  },
]

export const products = [
  // ---------------- CUSTOM CAKES (enquiry only) ----------------
  {
    id: 'birthday-celebration-cake',
    category: 'custom-cakes',
    name: 'Birthday Celebration Cake',
    description: 'Colourful layers, playful sprinkles and a design made around the birthday star.',
    details:
      'Tell us the age, theme, favourite colours and flavour, and we will design a birthday cake that becomes the centrepiece of the party. Sizes, tiers and finishing are agreed with you before baking.',
    image: '/images/cakes/rainbow-sprinkle.webp',
    price: null,
    isSample: true,
  },
  {
    id: 'floral-tiered-cake',
    category: 'custom-cakes',
    name: 'Floral Tiered Cake',
    description: 'Elegant tiers finished with soft florals — lovely for weddings and anniversaries.',
    details:
      'A graceful tiered cake for weddings, anniversaries, engagements and milestone celebrations. Share your colour palette, guest count and inspiration, and we will advise on tiers and design.',
    image: '/images/cakes/tiered-floral.webp',
    price: null,
    isSample: true,
  },
  {
    id: 'chocolate-drip-cake',
    category: 'custom-cakes',
    name: 'Chocolate Drip Cake',
    description: 'Rich chocolate cake with a glossy drip and piped chocolate crown.',
    details:
      'For chocolate lovers — a rich, indulgent cake with a glossy chocolate drip, finished with piping or toppings of your choice. Perfect for birthdays and surprise celebrations.',
    image: '/images/cakes/chocolate-drip.webp',
    price: null,
    isSample: true,
  },
  {
    id: 'pink-drip-cake',
    category: 'custom-cakes',
    name: 'Pastel Drip Cake',
    description: 'A sweet, show-stopping drip cake in the colours of your celebration.',
    details:
      'A playful drip cake finished with sprinkles, toppers and treats in your chosen colours — a favourite for birthdays, gender reveals and baby showers.',
    image: '/images/cakes/pink-drip.webp',
    price: null,
    isSample: true,
  },

  // ---------------- CUPCAKES ----------------
  {
    id: 'red-velvet-cupcakes',
    category: 'cupcakes',
    name: 'Red Velvet Cupcakes',
    description: 'Velvety red sponge crowned with a generous swirl of cream frosting.',
    details:
      'Soft red velvet cupcakes topped with a smooth cream swirl and a crumb finish. A beautiful choice for gifting, celebrations and dessert tables.',
    image: '/images/cupcakes/red-velvet.webp',
    price: null,
    isSample: true,
    options: [{ name: 'Pack size', choices: ['Box of 6', 'Box of 12'] }],
  },
  {
    id: 'chocolate-swirl-cupcakes',
    category: 'cupcakes',
    name: 'Chocolate Swirl Cupcakes',
    description: 'Moist chocolate cupcakes with a silky chocolate buttercream swirl.',
    details:
      'Deep, chocolatey cupcakes finished with a tall swirl of chocolate frosting and chocolate pieces.',
    image: '/images/cupcakes/chocolate-swirl.webp',
    price: null,
    isSample: true,
    options: [{ name: 'Pack size', choices: ['Box of 6', 'Box of 12'] }],
  },
  {
    id: 'vanilla-sprinkle-cupcakes',
    category: 'cupcakes',
    name: 'Vanilla Sprinkle Cupcakes',
    description: 'Light vanilla cupcakes with fluffy frosting and cheerful sprinkles.',
    details:
      'Classic vanilla cupcakes with a cloud of frosting and colourful sprinkles — a crowd-pleaser for children’s parties and school treats.',
    image: '/images/cupcakes/vanilla-sprinkle.webp',
    price: null,
    isSample: true,
    options: [{ name: 'Pack size', choices: ['Box of 6', 'Box of 12'] }],
  },
  {
    id: 'assorted-cupcake-box',
    category: 'cupcakes',
    name: 'Assorted Cupcake Box',
    description: 'A pretty mix of flavours and pastel finishes — made for gifting.',
    details:
      'A mixed box of beautifully decorated cupcakes. Let us know any colour theme or message and we will do our best to match it.',
    image: '/images/cupcakes/pastel-swirl.webp',
    price: null,
    isSample: true,
    options: [{ name: 'Pack size', choices: ['Box of 6', 'Box of 12'] }],
  },

  // ---------------- PIES & PASTRIES ----------------
  {
    id: 'meat-pies',
    category: 'pies-pastries',
    name: 'Meat Pies',
    description: 'Golden, buttery pastry generously filled with seasoned minced meat.',
    details:
      'Our take on a Nigerian favourite — flaky, golden pastry with a savoury, well-seasoned filling. Ideal for breakfast, lunch boxes, meetings and parties.',
    image: '/images/pastries/meat-pie-closeup.webp',
    price: null,
    isSample: true,
  },
  {
    id: 'butter-croissants',
    category: 'pies-pastries',
    name: 'Butter Croissants',
    description: 'Flaky, golden layers with a soft, buttery centre.',
    details: 'Light, layered croissants — lovely with tea or coffee and for brunch platters.',
    image: '/images/pastries/croissants.webp',
    price: null,
    isSample: true,
  },
  {
    id: 'assorted-pastry-box',
    category: 'pies-pastries',
    name: 'Assorted Pastry Box',
    description: 'A generous selection of freshly baked pastries and rolls.',
    details:
      'A mixed selection of freshly baked pastries — great for offices, family gatherings and events. Tell us the occasion and number of guests.',
    image: '/images/pastries/bread-assortment.webp',
    price: null,
    isSample: true,
  },

  // ---------------- DOUGHNUTS & PUFF-PUFF ----------------
  {
    id: 'puff-puff',
    category: 'doughnuts-puff-puff',
    name: 'Puff-Puff',
    description: 'Soft, fluffy, golden puff-puff — lightly dusted and irresistible.',
    details:
      'Freshly fried puff-puff with a soft, airy inside and golden outside. Order a pack for home or a larger tray for your event.',
    image: '/images/doughnuts/puff-puff-sugar.webp',
    price: null,
    isSample: true,
    options: [{ name: 'Pack size', choices: ['Regular pack', 'Party tray'] }],
  },
  {
    id: 'sprinkle-doughnuts',
    category: 'doughnuts-puff-puff',
    name: 'Sprinkle Doughnuts',
    description: 'Fluffy ring doughnuts with chocolate glaze, drizzle and sprinkles.',
    details: 'Soft, fluffy doughnuts finished with glaze, drizzle and colourful sprinkles.',
    image: '/images/doughnuts/sprinkle-stack.webp',
    price: null,
    isSample: true,
  },
  {
    id: 'glazed-doughnuts',
    category: 'doughnuts-puff-puff',
    name: 'Pink Glazed Doughnuts',
    description: 'Pillow-soft doughnuts dipped in a sweet pink glaze.',
    details: 'A sweet, pretty treat — perfect for parties, gifting and dessert tables.',
    image: '/images/doughnuts/pink-glazed.webp',
    price: null,
    isSample: true,
  },

  // ---------------- SMALL CHOPS ----------------
  {
    id: 'small-chops-party-pack',
    category: 'small-chops',
    name: 'Small Chops Party Pack',
    description: 'A classic assortment — samosas, puff-puff, spring rolls and more.',
    details:
      'Our assorted small chops for parties, meetings and celebrations. Tell us your guest count and the mix you would like, and we will confirm what is available.',
    image: '/images/small-chops/platter.webp',
    price: null,
    isSample: true,
    options: [{ name: 'Pack', choices: ['Individual pack', 'Party tray'] }],
  },
  {
    id: 'spring-rolls',
    category: 'small-chops',
    name: 'Spring Rolls',
    description: 'Crisp, golden rolls with a savoury filling and dipping sauce.',
    details: 'Crispy spring rolls with a well-seasoned filling — a small chops essential.',
    image: '/images/small-chops/spring-rolls.webp',
    price: null,
    isSample: true,
  },
  {
    id: 'samosas',
    category: 'small-chops',
    name: 'Samosas',
    description: 'Crisp triangular pastries with a spiced, savoury filling.',
    details: 'Crisp, golden samosas with a flavourful spiced filling. Great on their own or in a party pack.',
    image: '/images/small-chops/samosas.webp',
    price: null,
    isSample: true,
  },
  {
    id: 'small-chops-skewer-tray',
    category: 'small-chops',
    name: 'Small Chops Event Tray',
    description: 'Puff-puff and bite-sized treats on skewers, ready for your guests.',
    details:
      'A neatly arranged tray of skewered small chops for events and celebrations. Share your date and guest numbers so we can confirm quantities.',
    image: '/images/small-chops/skewers.webp',
    price: null,
    isSample: true,
  },
]

export const getCategory = (id) => categories.find((c) => c.id === id)
export const isEnquiryProduct = (product) => getCategory(product.category)?.orderType === 'enquiry'
