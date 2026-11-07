/**
 * PHOTOS
 *
 * Rocco's has no photos in this repo yet, so these are free Unsplash stand-ins
 * (Unsplash License), hotlinked from images.unsplash.com. They show in full
 * colour; only the interface around them is black and white.
 *
 * To use the bakery's own shots: drop files in /public/images/ and replace the
 * URL strings below with "/images/your-file.jpg". Nothing else needs to change.
 */
const u = (id: string) => `https://images.unsplash.com/${id}`;

export const PHOTOS = {
  hero: u("photo-1646615077267-97c6088b74d9"), // three doughnuts mid-air in a sprinkle storm
  daily: u("photo-1783171375588-d981fd78fe81"), // stacked doughnuts on white
  gluten: u("photo-1693167064408-6a2738932da1"), // doughnut dropping into a basket, dark
  bakeries: {
    auburn: u("photo-1587241321921-91a834d6d191"),
    worcester: u("photo-1709437385108-fd03a51aca63"),
    westborough: u("photo-1560427183-4efd29c38997"),
    millbury: u("photo-1658040528782-eca4ba3cd57d"),
  } as Record<string, string>,
  strip: [
    u("photo-1651307428611-6d89b4239c69"),
    u("photo-1516549445027-be9aebc57853"),
    u("photo-1631397833242-fc6213046352"),
    u("photo-1714911463721-193701866e58"),
    u("photo-1533136872-c5d7b7b800ae"),
    u("photo-1621515246035-2d98a9566036"),
    u("photo-1570727624862-3008fe67a6be"),
    u("photo-1626379801357-537572de4ad6"),
    u("photo-1579369917319-53dccbdacb30"),
    u("photo-1554153274-19f36270647a"),
  ],
};
