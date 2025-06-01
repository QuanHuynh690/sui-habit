import React, { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
// Đảm bảo import package này trước mọi thứ để áp dụng các polyfill
import "@walletconnect/react-native-compat";

import { WalletKit } from "@reown/walletkit";
import { Core } from "@walletconnect/core";
// Thay bằng Project ID của bạn lấy từ Reown Cloud
const PROJECT_ID = "YOUR_PROJECT_ID_HERE";

// Đây là ví dụ component chính của ứng dụng
const WalletConnect = () => {
  const [walletKit, setWalletKit] = useState(null);

  // Khởi tạo WalletKit khi component mount
  useEffect(() => {
    async function initWalletKit() {
      try {
        const core = new Core({
          projectId: PROJECT_ID,
        });
        // Khởi tạo WalletKit với core và cấu hình metadata cho ví của bạn
        const walletKitInstance = await WalletKit.init({
          core,
          metadata: {
            name: "Demo React Native Wallet",
            description: "Demo wallet built using Reown WalletKit",
            url: "https://yourwebsite.com", // thay bằng url của bạn
            icons: ["https://yourwalleticon.com/icon.png"],
            redirect: {
              // Định nghĩa scheme để chuyển về app khi cần
              native: "yourwalletscheme://",
            },
          },
        });
        setWalletKit(walletKitInstance);
      } catch (error) {
        console.error("Error initializing WalletKit:", error);
        Alert.alert("Error", "Failed to initialize WalletKit");
      }
    }
    initWalletKit();
  }, []);

  // Các sự kiện như session proposal có thể được lắng nghe sau khi WalletKit đã sẵn sàng
  useEffect(() => {
    if (walletKit) {
      const onSessionProposal = async (proposal) => {
        console.log("Received session proposal:", proposal);
        // Ở đây, bạn có thể sử dụng các util như buildApprovedNamespaces từ @walletconnect/utils
        // để dễ dàng xử lý và approve session. Ví dụ:
        // const approvedNamespaces = buildApprovedNamespaces({ proposal, supportedNamespaces: {/* ... */} });
        // const session = await walletKit.approveSession({ id: proposal.id, namespaces: approvedNamespaces });

        // Hiện thông báo để xác nhận đã nhận được session proposal
        Alert.alert("Session Proposal", "You got a session proposal!");
      };

      // Lắng nghe sự kiện session_proposal
      walletKit.on("session_proposal", onSessionProposal);

      // Cleanup khi component unmount hoặc walletKit thay đổi
      return () => {
        walletKit.off("session_proposal", onSessionProposal);
      };
    }
  }, [walletKit]);

  // Hàm gọi pair() để khởi tạo kết nối với dApp qua walletconnect URI
  const connectWallet = async () => {
    if (!walletKit) {
      Alert.alert("Error", "WalletKit is still initializing");
      return;
    }
    try {
      // Ở bước này, bạn cần có WalletConnect URI được cung cấp bởi dApp mà bạn muốn kết nối
      // Đây chỉ là placeholder; thay đổi wcUri thành URI thực từ dApp
      const wcUri =
        "wc:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=your_key";
      await walletKit.pair({ uri: wcUri });
      Alert.alert(
        "Success",
        "Pairing successful. Waiting for session proposal..."
      );
    } catch (error) {
      console.error("Error during pairing:", error);
      Alert.alert("Error", "Failed to pair with wallet");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Text style={{ marginBottom: 20, fontSize: 18, fontWeight: "bold" }}>
        React Native Wallet using WalletKit
      </Text>
      <Button title="Connect Wallet" onPress={connectWallet} />
    </View>
  );
};

export default WalletConnect;
