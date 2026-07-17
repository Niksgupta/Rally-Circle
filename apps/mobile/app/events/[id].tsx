import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getEvent, type SportEvent } from "@pp/shared";
import { colors } from "../../src/theme";
import { format } from "date-fns";

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<SportEvent | null>(null);

  useEffect(() => {
    if (!id) return;
    getEvent(id).then(setEvent).catch(() => setEvent(null));
  }, [id]);

  if (!event) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading…</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {event.coverImage && <Image style={styles.image} source={{ uri: event.coverImage }} />}
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>
          {format(new Date(event.startsAt), "EEE, d MMM · h:mm a")}
        </Text>
        <Text style={styles.meta}>{event.venue}</Text>
        <Text style={styles.body}>{event.description}</Text>
        <Text style={styles.price}>
          {event.price ? `₹${event.price}` : "Free"} · {event.capacity - event.enrolledCount} spots left
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 240 },
  title: { fontSize: 24, fontWeight: "800", color: colors.ink900 },
  meta: { marginTop: 6, color: colors.ink500 },
  body: { marginTop: 16, color: colors.ink700, lineHeight: 22 },
  price: { marginTop: 16, color: colors.brandDark, fontWeight: "700", fontSize: 16 },
});
