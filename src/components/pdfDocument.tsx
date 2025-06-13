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

// Styles PDF améliorés avec design moderne
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 0,
  },

  // Header avec couleur de marque
  header: {
    backgroundColor: "#f88f17",
    padding: 32,
    marginBottom: 32,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    opacity: 0.9,
  },

  // Container principal
  container: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },

  // Section avec titre
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    marginTop: 24,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#f88f17",
    borderBottomStyle: "solid",
  },

  // Ligne d'information
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between',
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 4,
  },

  // Colonne pour le label (30% de largeur)
  labelColumn: {
    width: "35%",
    paddingRight: 16,
  },

  // Colonne pour la valeur (70% de largeur)
  valueColumn: {
    width: "65%",
  },

  label: {
    fontSize: 11,
    color: "#666666",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  value: {
    fontSize: 13,
    color: "#333333",
    fontWeight: "normal",
  },

  // Styles spéciaux pour certaines valeurs
  valueHighlight: {
    fontSize: 13,
    color: "#f88f17",
    fontWeight: "bold",
  },

  valueImportant: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "bold",
    backgroundColor: "#fff3e0",
    padding: 8,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#f88f17",
    borderLeftStyle: "solid",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 32,
    left: 32,
    right: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    borderTopStyle: "solid",
    textAlign: "center",
  },

  footerText: {
    fontSize: 10,
    color: "#888888",
  },

  // Badge pour le statut
  statusBadge: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  statusText: {
    fontSize: 11,
    color: "#ffffff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  // Section spéciale pour l'abonnement
  subscriptionCard: {
    backgroundColor: "#f88f17",
    padding: 20,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },

  subscriptionTitle: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },

  subscriptionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subscriptionType: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "bold",
  },

  subscriptionExpiry: {
    fontSize: 12,
    color: "#ffffff",
    opacity: 0.9,
  },
});

interface userProps {
  user: User;
}

const PdfDocument = ({ user }: userProps) => {
  // Calculer le statut de l'abonnement
  const today = new Date();
  const expiryDate = new Date(user.dateExpiration);
  const isExpired = expiryDate < today;
  const daysRemaining = Math.ceil(
    (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Restau<Text style={{ color: "#ffffff" }}>Manager</Text>
          </Text>
          <Text style={styles.headerSubtitle}>
            Certificat d&apos;abonnement - Généré le{" "}
            {new Date().toLocaleDateString("fr-FR")}
          </Text>
        </View>

        <View style={styles.container}>
          {/* Section Informations Personnelles */}
          <Text style={styles.sectionTitle}>📋 INFORMATIONS PERSONNELLES</Text>

          <View style={styles.infoRow}>
            <View style={styles.labelColumn}>
              <Text style={styles.label}>Nom complet</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.value}>{user.fullName}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.labelColumn}>
              <Text style={styles.label}>Adresse e-mail</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.value}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.labelColumn}>
              <Text style={styles.label}>Téléphone</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.value}>{user.phone}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.labelColumn}>
              <Text style={styles.label}>Adresse</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.value}>{user.address}</Text>
            </View>
          </View>

          {/* Section Accès */}
          <Text style={styles.sectionTitle}>🔑 INFORMATIONS D&apos;ACCÈS</Text>

          <View style={styles.infoRow}>
            <View style={styles.labelColumn}>
              <Text style={styles.label}>Clé d&apos;identification</Text>
            </View>
            <View style={styles.valueColumn}>
              <Text style={styles.valueImportant}>{user.accessKey.toLocaleUpperCase()}</Text>
            </View>
          </View>

          {/* Section Abonnement - Card spéciale */}
          <Text style={styles.sectionTitle}>
            💳 DÉTAILS DE L&apos;ABONNEMENT
          </Text>

          <View style={styles.subscriptionCard}>
            <Text style={styles.subscriptionTitle}>
              Plan {user.abonnementName}
            </Text>
            <View style={styles.subscriptionInfo}>
              <View>
                <Text style={styles.subscriptionType}>
                  Type: {user.abonnementName}
                </Text>
              </View>
              <View>
                <Text style={styles.subscriptionExpiry}>
                  Expire le: {expiryDate.toLocaleDateString("fr-FR")}
                </Text>
              </View>
            </View>
          </View>

          {/* Statut de l'abonnement */}
          <View style={styles.infoRow}>
            <View style={styles.labelColumn}>
              <Text style={styles.label}>Statut</Text>
            </View>
            <View style={styles.valueColumn}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: isExpired ? "#f44336" : "#4caf50" },
                ]}
              >
                <Text style={styles.statusText}>
                  {isExpired ? "EXPIRÉ" : "ACTIF"}
                </Text>
              </View>
            </View>
          </View>

          {!isExpired && (
            <View style={styles.infoRow}>
              <View style={styles.labelColumn}>
                <Text style={styles.label}>Jours restants</Text>
              </View>
              <View style={styles.valueColumn}>
                <Text
                  style={[
                    styles.value,
                    { color: daysRemaining <= 7 ? "#f44336" : "#4caf50" },
                  ]}
                >
                  {daysRemaining} jour{daysRemaining > 1 ? "s" : ""}
                  {daysRemaining <= 7 && " ⚠️"}
                </Text>
              </View>
            </View>
          )}

          {/* Section Important */}
          <Text style={styles.sectionTitle}>⚠️ INFORMATIONS IMPORTANTES</Text>

          <View style={[styles.infoRow, { backgroundColor: "#fff3e0" }]}>
            <Text style={[styles.value, { fontSize: 11, lineHeight: 1.5 }]}>
              • Conservez précieusement votre clé d&apos;identification{"\n"}•
              Contactez le support en cas de problème d&apos;accès{"\n"}•
              Renouvelez votre abonnement avant expiration{"\n"}• Ce document
              certifie votre abonnement RestauManager
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            RestauManager - Système de gestion de restaurant
          </Text>
          <Text style={styles.footerText}>
            Ne pas reproduire sans autorisation
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default async function generatorPdf(user: User): Promise<string | null> {
  try {
    // ✅ Génère un Buffer et non un Stream
    const buffer = await renderToBuffer(<PdfDocument user={user} />);
    const url = await uploadUrl(user, buffer);
    return url;
  } catch (error) {
    console.error("Erreur génération PDF:", error);
    return null;
  }
}
