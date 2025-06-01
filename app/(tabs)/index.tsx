import Card from "@/components/card/Card";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { useWeather } from "@/hooks/useWeather";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentUser = useCurrentUser();
  const router = useRouter();
  const onDateSelected = (date: any) => {
    console.log("Selected date:", date.toISOString());
    setSelectedDate(date);
    // Tại đây bạn có thể gọi API để lấy dữ liệu thời tiết cho ngày được chọn
  };
  const lat = 10.8022;
  const lon = 106.6565;
  const { weather, loading } = useWeather(selectedDate, lat, lon);
  console.log("weather", weather);

  return (
    <View style={{ flex: 1 }}>
      <CalendarStrip
        style={{
          height: 100,
          paddingTop: 30,
          paddingBottom: 10,
          marginHorizontal: -20,
        }}
        selectedDate={selectedDate}
        onDateSelected={onDateSelected}
        scrollable
        daySelectionAnimation={{
          type: "background",
          duration: 200,
          highlightColor: "#4ca2ff",
        }}
        dateNumberStyle={{ color: "black", fontSize: 20 }}
        dateNameStyle={{ color: "#CDCDD0", fontSize: 10, fontWeight: "bold" }}
        highlightDateNumberStyle={{ color: "#4ca2ff", fontSize: 20 }}
        highlightDateNameStyle={{
          color: "#4ca2ff",
          fontSize: 10,
          fontWeight: "bold",
        }}
        highlightDateContainerStyle={{ borderColor: "#4ca2ff" }}
        iconLeft={null}
        iconRight={null}
        dayContainerStyle={{
          borderRadius: 16,
          height: 64,
          backgroundColor: "#fff",
          borderColor: "#EAECF0",
          borderWidth: 2,
        }}
        dayComponentHeight={66}
        calendarHeaderStyle={{ display: "none" }}
      />
      <View style={styles.challengeList}>
        <View style={styles.sectionTitleCont}>
          <Text style={styles.sectionTitle}>Challenges</Text>
          <TouchableOpacity onPress={() => router.push("/challenge")}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        {currentUser?.currentUser?.joinedChallenges.map((challenge, index) => {
          return (
            <View key={index}>
              <Card
                title={challenge.name}
                target={challenge.target}
                progress={challenge.progress}
                type={challenge.type}
              />
            </View>
          );
        })}
      </View>

      {/* <WalletConnect /> */}

      {loading && <Text>Loading weather...</Text>}

      {weather && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
            }}
            style={{ width: 32, height: 32 }}
          />
          <Text style={{ marginLeft: 8 }}>
            {weather.temp}°C – {weather.description}
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  challengeList: {
    padding: 32,
  },
  sectionTitleCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  viewAll: {
    color: "#4ca2ff",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "bold",
  },
});
