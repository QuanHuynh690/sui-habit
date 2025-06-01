import Card from "@/components/card/Card";
import WeatherScreen from "@/components/weather/WeatherView";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { useRouter } from "expo-router";
import moment from "moment";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const currentUser = useCurrentUser();
  const router = useRouter();
  const onDateSelected = (date: any) => {
    console.log("Selected date:", date.toISOString());
    setSelectedDate(date);
  };
  const lat = 10.8022;
  const lon = 106.6565;
  // const { weather, loading } = useWeather(selectedDate, lat, lon);
  // console.log("weather", weather);

  return (
    <ScrollView>
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
          {currentUser?.currentUser?.joinedChallenges.map(
            (challenge, index) => {
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
            }
          )}
        </View>

        {/* <WalletConnect /> */}
        <View style={styles.weatherView}>
          <WeatherScreen selectedDate={selectedDate} />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  weatherView: {
    flex: 1,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
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
