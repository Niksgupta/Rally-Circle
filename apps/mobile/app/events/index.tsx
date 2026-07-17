import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { listEvents, type SportEvent } from "@pp/shared";
import { colors } from "../../src/theme";
import { format } from "date-fns";

const MOCK: SportEvent[] = [
  {
    id: "mock-badminton",
    title: "Sunday Badminton Doubles",
    sport: "badminton",
    description: "",
    coverImage:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=60",
    venue: "PYC Hindu Gymkhana",
    startsAt: Date.now() + 2 * 86400000,
    endsAt: Date.now() + 2 * 86400000 + 7200000,
    capacity: 16,
    enrolledCount: 11,
    price: 250,
    status: "upcoming",
    createdAt: Date.now(),
  },
];

export default function EventsScreen() {
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listEvents("upcoming")
      .then((e) => setEvents(e.length ? e : MOCK))
      .catch(() => setEvents(MOCK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <FlatList
      data={events}
      keyExtractor={(e) => e.id}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      ListEmptyComponent={
        <Text style={{ color: colors.ink500, textAlign: "center", marginTop: 40 }}>
          {loading ? "Loading..." : "Koi event nahi mila."}
        </Text>
      }
      renderItem={({ item }) => (
        <Link href={`/events/${item.id}`} asChild>
          <Pressable style={styles.card}>
            {item.coverImage && <Image style={styles.image} source={{ uri: item.coverImage }} />}
            <View style={{ padding: 12 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>
                {format(new Date(item.startsAt), "EEE, d MMM · h:mm a")}
              </Text>
              <Text style={styles.meta}>{item.venue}</Text>
              <Text style={styles.price}>
                {item.price ? `₹${item.price}` : "Free"} · {item.enrolledCount}/{item.capacity} joined
              </Text>
            </View>
          </Pressable>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.ink100,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  image: { width: "100%", height: 160 },
  title: { fontSize: 16, fontWeight: "700", color: colors.ink900 },
  meta: { marginTop: 4, color: colors.ink500, fontSize: 13 },
  price: { marginTop: 8, color: colors.brandDark, fontWeight: "700" },
});
