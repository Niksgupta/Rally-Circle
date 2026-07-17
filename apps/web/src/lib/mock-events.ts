import type { SportEvent } from "@pp/shared";

const day = 24 * 60 * 60 * 1000;
const now = Date.now();

export const MOCK_EVENTS: SportEvent[] = [
  {
    id: "mock-badminton-koregaon",
    title: "Sunday Badminton Doubles — All Levels",
    sport: "badminton",
    description:
      "Wooden-court doubles rotation with balanced teams. Perfect Sunday reset.\n\n" +
      "🏸 4 wooden courts booked for 2 hours, rolling doubles format\n" +
      "☕ Filter coffee + masala chai on tap through the session\n" +
      "🍪 Post-game snacks — poha, sandwiches, biscuits\n" +
      "🎽 Loaner rackets & fresh shuttles included\n" +
      "🎁 Best rally of the day wins a Recess tee",
    coverImage:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=60",
    venue: "PYC Hindu Gymkhana",
    address: "Bhandarkar Rd, Deccan Gymkhana, Pune",
    startsAt: now + 2 * day,
    endsAt: now + 2 * day + 2 * 60 * 60 * 1000,
    capacity: 16,
    enrolledCount: 11,
    price: 350,
    currency: "INR",
    skillLevel: "intermediate",
    tags: ["indoor", "doubles", "weekend"],
    perks: [
      "Filter coffee + masala chai",
      "Post-game snacks",
      "Loaner rackets & shuttles",
      "Rally-of-the-day tee giveaway",
    ],
    status: "upcoming",
    createdAt: now - 5 * day,
  },
  {
    id: "mock-football-baner",
    title: "Friday Night 6-a-side Football",
    sport: "football",
    description:
      "Turf football under floodlights. Balanced teams, rolling subs, and a proper post-match hangout.\n\n" +
      "⚽ 90 min of rolling 6-a-side, referee included\n" +
      "☕ Chai + coffee counter open through the evening\n" +
      "🍽️ Post-match vada pav + Maggi from the turf cafe\n" +
      "👟 Bibs and match balls provided\n" +
      "📸 Photos & short highlight reel shared in the group",
    coverImage:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=60",
    venue: "Kick Off Turf, Baner",
    address: "Baner Rd, Pune",
    startsAt: now + 5 * day,
    endsAt: now + 5 * day + 90 * 60 * 1000,
    capacity: 18,
    enrolledCount: 14,
    price: 400,
    currency: "INR",
    skillLevel: "beginner",
    tags: ["turf", "evening", "6-a-side"],
    perks: [
      "Chai + coffee counter",
      "Vada pav & Maggi post-match",
      "Bibs & match balls",
      "Highlight reel shared after",
    ],
    status: "upcoming",
    createdAt: now - 10 * day,
  },
  {
    id: "mock-run-vetal",
    title: "Sunrise Trail Run — Vetal Tekdi",
    sport: "running",
    description:
      "Easy 6 km loop through Vetal Tekdi as the city wakes up. Chill pace, chatty group.\n\n" +
      "🏃 Two pace groups — 6:30/km and 7:30/km, no one runs alone\n" +
      "☕ Free filter coffee & poha at a partner cafe after the run\n" +
      "💧 Hydration station at the halfway point\n" +
      "📸 Sunrise group photo — new banner for the week",
    coverImage:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=60",
    venue: "Vetal Tekdi (ARAI Hill entry)",
    address: "Pashan, Pune",
    startsAt: now + 7 * day,
    endsAt: now + 7 * day + 75 * 60 * 1000,
    capacity: 30,
    enrolledCount: 8,
    price: 0,
    currency: "INR",
    skillLevel: "beginner",
    tags: ["outdoor", "morning", "free"],
    perks: [
      "Filter coffee + poha after",
      "Hydration stop mid-run",
      "Two pace groups",
      "Sunrise group photo",
    ],
    status: "upcoming",
    createdAt: now - 3 * day,
  },
  {
    id: "mock-tt-viman",
    title: "Table Tennis Social — Round Robin",
    sport: "table-tennis",
    description:
      "Round-robin format so you get 8-10 matches against different players. Cozy indoor setup.\n\n" +
      "🏓 6 pro tables, coach-managed rotations\n" +
      "☕ Unlimited chai + cold coffee\n" +
      "🥪 Sandwich + cookie combo included\n" +
      "🎽 Bats & tournament-grade balls provided\n" +
      "🏆 Top 3 win branded Recess merch",
    coverImage:
      "https://images.unsplash.com/photo-1611251135345-18c56206b863?auto=format&fit=crop&w=1200&q=60",
    venue: "Smash Arena, Viman Nagar",
    address: "Viman Nagar, Pune",
    startsAt: now + 10 * day,
    endsAt: now + 10 * day + 2 * 60 * 60 * 1000,
    capacity: 12,
    enrolledCount: 4,
    price: 300,
    currency: "INR",
    skillLevel: "intermediate",
    tags: ["indoor", "social"],
    perks: [
      "Unlimited chai + cold coffee",
      "Sandwich + cookie combo",
      "Bats & tournament balls",
      "Merch for top 3",
    ],
    status: "upcoming",
    createdAt: now - 1 * day,
  },
];
