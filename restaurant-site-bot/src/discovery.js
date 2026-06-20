import { Client } from '@googlemaps/google-maps-services-js';
import { config } from './config.js';

const client = new Client({});

/**
 * Find restaurants in an area that have NO website or a weak web presence.
 *
 * Compliance note: we only read publicly listed BUSINESS contact details
 * (the business phone / website / public business email) from the Places API.
 * We do not scrape or harvest personal contact information about individuals.
 */
export async function findLeads(query, { limit = 20 } = {}) {
  const search = await client.textSearch({
    params: { query, type: 'restaurant', key: config.googleMapsApiKey },
  });

  const candidates = (search.data.results || []).slice(0, 60);
  const leads = [];

  for (const c of candidates) {
    if (leads.length >= limit) break;

    const details = await client.placeDetails({
      params: {
        place_id: c.place_id,
        key: config.googleMapsApiKey,
        fields: [
          'name',
          'formatted_address',
          'formatted_phone_number',
          'international_phone_number',
          'website',
          'rating',
          'price_level',
          'opening_hours',
          'types',
          'business_status',
        ],
      },
    });

    const d = details.data.result || {};
    if (d.business_status && d.business_status !== 'OPERATIONAL') continue;

    const website = (d.website || '').trim();
    // Target: no website at all, or only a social/aggregator page (a weak presence).
    const weakHosts = ['facebook.', 'instagram.', 'linktr.ee', 'yelp.', 'tripadvisor.', 'doordash.', 'ubereats.'];
    const noSite = website === '';
    const weakSite = website !== '' && weakHosts.some((h) => website.includes(h));
    if (!noSite && !weakSite) continue;

    leads.push({
      placeId: c.place_id,
      name: d.name,
      cuisine: guessCuisine(d.types),
      address: d.formatted_address,
      phone: d.formatted_phone_number || d.international_phone_number || '',
      website,
      rating: d.rating,
      priceLevel: d.price_level,
      hours: (d.opening_hours?.weekday_text || []).join('; '),
      webPresence: noSite ? 'none' : 'weak',
    });
  }

  return leads;
}

function guessCuisine(types = []) {
  const map = {
    italian_restaurant: 'Italian',
    pizza_restaurant: 'Pizzeria',
    mexican_restaurant: 'Mexican',
    chinese_restaurant: 'Chinese',
    japanese_restaurant: 'Japanese',
    sushi_restaurant: 'Sushi',
    indian_restaurant: 'Indian',
    thai_restaurant: 'Thai',
    french_restaurant: 'French',
    seafood_restaurant: 'Seafood',
    steak_house: 'Steakhouse',
    cafe: 'Cafe',
    bakery: 'Bakery',
    bar: 'Bar & Kitchen',
  };
  for (const t of types) if (map[t]) return map[t];
  return 'Restaurant';
}
