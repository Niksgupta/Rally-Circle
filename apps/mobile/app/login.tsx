import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmail } from "@pp/shared";
import { colors } from "../src/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async () => {
    setBusy(true);
    setErr(null);
    try {
      await signInWithEmail(email, password);
      router.replace("/events");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Sign in failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text style={styles.title}>Wapas aa gaye!</Text>
      <Text style={{ color: colors.ink500 }}>Log in karo aur agla game lock karo.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {err && <Text style={{ color: "#dc2626" }}>{err}</Text>}
      <Pressable disabled={busy} onPress={onSubmit} style={styles.btn}>
        <Text style={styles.btnText}>{busy ? "Signing in…" : "Sign in"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: "800", color: colors.ink900 },
  input: {
    borderWidth: 1,
    borderColor: colors.ink100,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
  },
  btn: {
    backgroundColor: colors.brand,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  btnText: { color: colors.white, fontWeight: "700" },
});
