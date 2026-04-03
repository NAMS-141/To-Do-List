import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const API_URL = "http://TU_API/tasks"; // ⚠️ cambia esto

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      // ⚠️ IMPORTANTE (esto no lo hace solo como axios)
      if (!response.ok) {
        throw new Error("Error al obtener tareas");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Cargando tareas...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Mis tareas
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={{
              padding: 15,
              marginBottom: 10,
              backgroundColor: "#eee",
              borderRadius: 10,
            }}
            onPress={() => router.push(`/task/${item.id}`)}
          >
            <Text style={{ fontSize: 18 }}>{item.title}</Text>

            <Text>
              Estado: {item.completed ? "✅ Completada" : "❌ Pendiente"}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={fetchTasks}
        style={{
          marginTop: 10,
          padding: 15,
          backgroundColor: "#007bff",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Recargar</Text>
      </TouchableOpacity>
    </View>
  );
}
