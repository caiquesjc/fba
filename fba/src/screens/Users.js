import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";

import api from "../services/api";

import ButtonUser from "../components/ButtonUser";
import Loading from "../components/Loading";
import { fbaColors } from "../assets/colors";
import { Icon } from "react-native-elements";
import NewUser from "./NewUser";
export default function Users({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useState(false);

  function getUsers() {
    return api.get("/user/list").then((res) => {
      if (res.data.success) {
        setData(res.data.data);
        setLoading(false);
        setRefresh(false);
        setReload(false);
      }
    });
  }

  function handleRefresh() {
    setData([]);
    setRefresh(true);
    getUsers();
  }
  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []);
  if (reload) getUsers();
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <Modal visible={visible} style={{ flex: 1 }}>
        <NewUser setRefresh={setReload} setVisible={setVisible} />
      </Modal>
      <View style={styles.content}>
        <Text style={styles.text}>Usuários</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.button}
          onPress={() => setVisible(true)}
        >
          <Icon type="material" name="add" size={30} color={fbaColors.Nero} />
        </TouchableOpacity>
      </View>
      <FlatList
        onRefresh={() => handleRefresh()}
        refreshing={refresh}
        data={data}
        extraData={data}
        renderItem={({ item }) => (
          <ButtonUser
            userInf={item}
            navigation={navigation}
            setReload={setReload}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: fbaColors.Nero,
  },
  content: {
    flexDirection: "row",
    width: "90%",
    height: "10%",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: { fontSize: 28, color: fbaColors.Withe, padding: 5 },
  button: {
    backgroundColor: fbaColors.DarkGray,
    borderRadius: 10,
    width: "40%",
    padding: 5,
  },
});
