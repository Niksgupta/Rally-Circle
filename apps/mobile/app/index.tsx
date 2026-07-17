import { ScrollView, StyleSheet, Text, View, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { colors } from "../src/theme";

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.badge}>Pune ka apna sports community</Text>
        <Text style={styles.title}>
          Standup se Standoff.{"\n"}
          <Text style={{ color: colors.brand }}>Standoff se Smashdown.</Text>
        </Text>
        <Text style={styles.subtitle}>
          Weekend badminton, football, cricket, running — bas ek weekend do, baaki hum sambhal lenge.
        </Text>

        <View style={styles.ctaRow}>
          <Link href="/events" asChild>
            <Pressable style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Slot book karo</Text>
            </Pressable>
          </Link>
          <Link href="/login" asChild>
            <Pressable style={styles.btnOutline}>
              <Text style={styles.btnOutlineText}>Log in</Text>
            </Pressable>
          </Link>
        </View>

        <Image
          style={styles.hero_img}
          source={{
            uri: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=60",
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kaam se ek chhoti si azaadi.</Text>
        {SWAPS.map((s) => (
          <View key={s.before} style={styles.card}>
            <Text style={styles.swapRow}>
              <Text style={styles.strike}>{s.before}</Text>
              <Text style={styles.arrow}> → </Text>
              <Text style={styles.after}>{s.after}</Text>
            </Text>
            <Text style={styles.cardNote}>{s.note}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { paddingBottom: 40 }]}>
        <Link href="/events" asChild>
          <Pressable style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>Iss weekend ke events dekho</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const SWAPS = [
  { before: "Monday standup", after: "Sunday smashdown", note: "Manager: 'Any blockers?' Aap: 'Sirf net.'" },
  { before: "Sprint planning", after: "Actual sprinting", note: "Retrospective bhi hoga — chai ke saath." },
  { before: "P0 bug in prod", after: "P0 smash on court", note: "Hotfix karo, phir shot maaro." },
  { before: "OOO on email", after: "OOO on turf", note: "Auto-reply: 'Match mein hoon, ping mat karo.'" },
];

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white },
  hero: { padding: 20, paddingTop: 24 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.brandSoft,
    color: colors.brandDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 12,
  },
  title: { fontSize: 32, fontWeight: "800", color: colors.ink900, lineHeight: 36 },
  subtitle: { marginTop: 12, fontSize: 15, color: colors.ink500, lineHeight: 22 },
  ctaRow: { marginTop: 20, flexDirection: "row", gap: 10 },
  btnPrimary: {
    backgroundColor: colors.brand,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnPrimaryText: { color: colors.white, fontWeight: "700" },
  btnOutline: {
    borderWidth: 1,
    borderColor: colors.ink100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnOutlineText: { color: colors.ink900, fontWeight: "600" },
  hero_img: { marginTop: 24, width: "100%", height: 220, borderRadius: 20 },
  section: { padding: 20, gap: 12 },
  sectionTitle: { fontSize: 22, fontWeight: "700", color: colors.ink900, marginBottom: 8 },
  card: { padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.ink100 },
  swapRow: { fontSize: 14 },
  strike: { color: colors.ink500, textDecorationLine: "line-through" },
  arrow: { color: colors.ink300 },
  after: { color: colors.brandDark, fontWeight: "700" },
  cardNote: { marginTop: 6, color: colors.ink700 },
});
