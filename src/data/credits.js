/**
 * Photo credits for the demonstration images. When you replace a photo with
 * MMA's own photography, remove its entry here. Creative Commons images
 * (CC BY-SA) must stay credited for as long as they are used on the site.
 */

const commons = (file) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`
const BY_SA = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' }

export const commonsCredits = [
  { image: 'Puff-puff (dusted)', author: 'Afrolems; cropped by Off-shell', url: commons('Nigerian-puff-puff-recipe cropped.jpg'), ...BY_SA },
  { image: 'Bowl of puff-puff', author: 'Bukky658', url: commons('Bowl of puff-puff and soft drink cocacola.jpg'), ...BY_SA },
  { image: 'Meat pies (tray)', author: 'Zahraswaty', url: commons('Meat pie in Northern Nigeria.jpg'), ...BY_SA },
  { image: 'Meat pies (close-up)', author: 'Hajjare', url: commons('A Northern Nigeria snacks called meat pie 22.jpg'), ...BY_SA },
  { image: 'Small chops platter', author: 'James Moore200', url: commons('Small chops with fried chicken.jpg'), ...BY_SA },
  { image: 'Small chops tray', author: 'James Moore200', url: commons('Small chops 02.jpg'), ...BY_SA },
  { image: 'Small chops on skewers (Abuja)', author: 'Akum20', url: commons('Image of some small chops captured in Abuja.jpg'), ...BY_SA },
  { image: 'Spring rolls', author: 'Srujanabotcha', url: commons('Golden Vegetable Spring Rolls Served with Dipping Sauce.jpg'), ...BY_SA },
]

export const creditsNote =
  'Wikimedia Commons images have been resized, cropped and converted to WebP for this website. All other demonstration photographs are from Unsplash and used under the Unsplash License.'
