import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getTasks } from "../../services/taskService";

export default function HomeScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getTasks()
        .then(setTasks)
        .finally(() => setLoading(false));
    }, []),
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Mis tareas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/tasks/[id]",
                params: { id: String(item.id) },
              })
            }
            style={{
              padding: 15,
              backgroundColor: "#eee",
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <Text>{item.title}</Text>
            <Text>{item.completed ? "✅ Completada" : "❌ Pendiente"}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => router.push("/tasks/edit")}
        style={{
          marginTop: 10,
          padding: 15,
          backgroundColor: "green",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          + Nueva tarea
        </Text>
      </TouchableOpacity>
    </View>
  );
}
