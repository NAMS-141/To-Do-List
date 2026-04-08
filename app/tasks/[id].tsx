import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import {
  deleteTask,
  getTaskById,
  updateTask,
} from "../../services/taskService";

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    getTaskById(String(id)).then(setTask);
  }, []);

  const toggleCompleted = async () => {
    await updateTask(String(id), { ...task, completed: !task.completed });
    setTask({ ...task, completed: !task.completed });
  };

  const handleDelete = async () => {
    await deleteTask(String(id));
    router.back();
  };

  if (!task) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121212",
        }}
      >
        <ActivityIndicator color="white" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#121212" }}>
      <Text style={{ fontSize: 24, color: "white", marginBottom: 10 }}>
        {task.title}
      </Text>
      <Text style={{ color: "#ccc", marginBottom: 15 }}>
        {task.description}
      </Text>
      <Text style={{ color: "white", marginBottom: 15 }}>
        Estado: {task.completed ? "😎 Completada" : "🤮 Pendiente"}
      </Text>
      <TouchableOpacity
        onPress={toggleCompleted}
        style={{
          backgroundColor: "#333",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          🔄 Cambiar estado
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: "/tasks/edit", params: { id: String(id) } })
        }
        style={{
          backgroundColor: "#007bff",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>✏️ Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDelete}
        style={{ backgroundColor: "#dc3545", padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>🗑 Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}
