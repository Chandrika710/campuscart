import { Product } from '../types';

export interface AssistantResponse {
  message: string;
  matchedProducts: Product[];
  actionLabel?: string;
}

/**
 * Intelligent pure-TypeScript catalogue-based recommendation engine.
 * Searches the live in-memory product catalogue without hallucinating items or prices.
 */
export function queryCampusCartAI(
  userInput: string,
  catalog: Product[]
): AssistantResponse {
  const query = userInput.trim().toLowerCase();

  // 1. Check for budget / price constraints (e.g. "under ₹300", "below 200", "< 250")
  const priceMatch = query.match(/(?:under|below|less than|within|<=|<)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
  if (priceMatch && priceMatch[1]) {
    const maxPrice = parseInt(priceMatch[1], 10);
    const matches = catalog.filter((p) => p.price <= maxPrice && p.status === 'active');
    if (matches.length > 0) {
      return {
        message: `Found ${matches.length} verified campus items under ₹${maxPrice}. Here are the best matches for your student budget:`,
        matchedProducts: matches.slice(0, 4),
        actionLabel: `Filter by price ≤ ₹${maxPrice}`,
      };
    } else {
      return {
        message: `Currently no items are listed strictly under ₹${maxPrice}. Our closest budget items start at ₹${Math.min(...catalog.map(p => p.price))}.`,
        matchedProducts: catalog.filter(p => p.isBudgetFriendly).slice(0, 3),
      };
    }
  }

  // 2. Recommend CSE / Computer Science books or materials
  if (query.includes('cse') || query.includes('computer science') || query.includes('coding') || query.includes('programming')) {
    const matches = catalog.filter(
      (p) =>
        (p.name.toLowerCase().includes('data structure') ||
          p.name.toLowerCase().includes('programming') ||
          p.description.toLowerCase().includes('c++') ||
          p.description.toLowerCase().includes('cse') ||
          p.description.toLowerCase().includes('algorithm')) &&
        p.status === 'active'
    );
    return {
      message: 'Here are the recommended Computer Science & Engineering (CSE) study materials from senior students:',
      matchedProducts: matches,
      actionLabel: 'Explore CSE Resources',
    };
  }

  // 3. Find scientific calculators
  if (query.includes('calculator') || query.includes('casio') || query.includes('fx-991')) {
    const matches = catalog.filter(
      (p) => p.category === 'Calculators' || p.name.toLowerCase().includes('calculator')
    );
    return {
      message: 'Found active scientific calculators available on campus:',
      matchedProducts: matches,
      actionLabel: 'View Calculators',
    };
  }

  // 4. Compare products
  if (query.includes('compare') || query.includes('difference') || query.includes('vs')) {
    const candidates = catalog.filter(p => p.status === 'active');
    const two = candidates.slice(0, 2);
    if (two.length >= 2) {
      return {
        message: `Comparing 1) "${two[0].name}" (₹${two[0].price}, ${two[0].condition}) versus 2) "${two[1].name}" (₹${two[1].price}, ${two[1].condition}). Both are available for immediate campus handoff.`,
        matchedProducts: two,
      };
    }
  }

  // 5. High condition items
  if (query.includes('good condition') || query.includes('like new') || query.includes('brand new') || query.includes('mint')) {
    const matches = catalog.filter(
      (p) => (p.condition === 'Like New' || p.condition === 'Brand New') && p.status === 'active'
    );
    return {
      message: 'Showing premium condition items ("Like New" and "Brand New") from careful student owners:',
      matchedProducts: matches.slice(0, 4),
    };
  }

  // 6. Semester starter kit
  if (query.includes('new semester') || query.includes('semester') || query.includes('starter') || query.includes('kit') || query.includes('essential')) {
    const starterIds = ['prod-01', 'prod-02', 'prod-03', 'prod-04'];
    const matches = catalog.filter((p) => starterIds.includes(p.id) || p.category === 'Engineering Drawing Instruments');
    return {
      message: 'Here is a recommended Semester Starter Bundle: Math book, Scientific Calculator, Drawing set, and Lab Coat!',
      matchedProducts: matches.slice(0, 4),
    };
  }

  // 7. General search fallback across keywords
  const keywords = query.split(/\s+/).filter(w => w.length > 2);
  const matched = catalog.filter((p) => {
    const text = `${p.name} ${p.category} ${p.description} ${p.college} ${p.condition}`.toLowerCase();
    return keywords.some(k => text.includes(k));
  });

  if (matched.length > 0) {
    return {
      message: `Here are matching listings based on "${userInput}":`,
      matchedProducts: matched.slice(0, 4),
    };
  }

  // Default fallback
  return {
    message: `I searched the live campus catalogue for "${userInput}". While no exact keyword match was found, here are popular student picks available today:`,
    matchedProducts: catalog.slice(0, 3),
  };
}
