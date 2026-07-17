export type SkillLevel = "beginner" | "intermediate" | "advanced" | "pro";

export type Sport =
  | "badminton"
  | "football"
  | "cricket"
  | "tennis"
  | "table-tennis"
  | "volleyball"
  | "running"
  | "yoga"
  | "other";

export type EventStatus = "upcoming" | "live" | "completed" | "cancelled";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  phone?: string;
  city?: string;
  skillLevel?: SkillLevel;
  favoriteSports?: Sport[];
  bio?: string;
  role?: "member" | "organizer" | "admin";
  createdAt?: number;
}

export interface SportEvent {
  id: string;
  title: string;
  sport: Sport;
  description: string;
  coverImage?: string;
  venue: string;
  address?: string;
  startsAt: number; // epoch ms
  endsAt: number;
  capacity: number;
  enrolledCount: number;
  price: number; // 0 = free
  currency?: string; // default INR
  skillLevel?: SkillLevel;
  organizer?: {
    uid: string;
    name: string;
  };
  tags?: string[];
  /** Perks/what's included in the price, shown on event card + detail. */
  perks?: string[];
  status: EventStatus;
  createdAt: number;
}

export interface RSVP {
  id: string; // `${eventId}_${uid}`
  eventId: string;
  uid: string;
  displayName: string;
  photoURL?: string;
  status: "going" | "waitlist" | "cancelled";
  paymentStatus?: "unpaid" | "paid" | "refunded";
  createdAt: number;
}

export interface FeedPost {
  id: string;
  authorUid: string;
  authorName: string;
  authorPhoto?: string;
  caption: string;
  imageUrl?: string;
  eventId?: string;
  likes: number;
  createdAt: number;
}
