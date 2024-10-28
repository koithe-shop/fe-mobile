import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { AsyncStorageProvider } from "./context/AsyncStorageContext"; // Cập nhật đường dẫn đúng
import AppStack from "./navigator/AppStack";
import { StripeProvider } from "@stripe/stripe-react-native";

const STRIPE_PUBLIC_KEY =
  "pk_test_51QDr1gIqcInfzhBvRNOZ4NgluW12dVC55unQrCycjGg1Rsv2FjvYWQJUEsqJrdOCiTPupeVnCbzMKG2BkPlbiwb500Ygm0Vfsv";

export default function App() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
      <>
        <StatusBar animated={true} />
        <AsyncStorageProvider>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </AsyncStorageProvider>
      </>
    </StripeProvider>
  );
}
