import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { User } from "@/generated/prisma";

import { uploadUrl } from "@/app/server";

// Exemple de styles PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  section: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    color: "#555",
  },
  value: {
    fontSize: 14,
    marginBottom: 4,
  },
});


interface userProps {
  user: User;
}
const PdfDocument = ({ user }: userProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Informations de l&lsquo;abonnement</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Nom complet</Text>
        <Text style={styles.value}>{user.fullName}</Text>

        <Text style={styles.label}>Adresse e-mail</Text>
        <Text style={styles.value}>{user.email}</Text>

        {user.phone && (
          <>
            <Text style={styles.label}>Téléphone</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </>
        )}

        {user.address && (
          <>
            <Text style={styles.label}>Adresse</Text>
            <Text style={styles.value}>{user.address}</Text>
          </>
        )}
        {user.accessKey && (
          <>
            <Text style={styles.label}>Adresse</Text>
            <Text style={styles.value}>{user.accessKey}</Text>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Type d&lsquo;abonnement</Text>
        <Text style={styles.value}>{user.abonnementName}</Text>

        <Text style={styles.label}>Expiration de l’abonnement</Text>
        <Text style={styles.value}>
          {new Date(user.dateExpiration).toLocaleDateString("fr-FR")}
        </Text>
      </View>
    </Page>
  </Document>
);

export default async function generatorPdf(user: User): Promise<string | null> {
  // ✅ Génère un Buffer et non un Stream
  const buffer = await renderToBuffer(<PdfDocument user={user} />);
  const url = await uploadUrl(user, buffer);
  return url;
}
