import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  createTask,
  getTaskById,
  updateTask,
} from "../../services/taskService";

export default function EditTask() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      getTaskById(String(id)).then((task) => {
        setTitle(task.title);
        setDescription(task.description || "");
        setCompleted(!!task.completed);
      });
    }
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("El título es obligatorio");
      return;
    }
    if (isEditing) {
      await updateTask(String(id), { title, description, completed });
    } else {
      await createTask({ title, description, completed });
    }
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#121212" }}>
      <Text style={{ fontSize: 24, color: "white", marginBottom: 10 }}>
        {isEditing ? "Editar tarea" : "Nueva tarea"}
      </Text>
      <TextInput
        placeholder="Título"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: "#444",
          marginVertical: 10,
          padding: 10,
          color: "white",
          backgroundColor: "#222",
          borderRadius: 8,
        }}
      />
      <TextInput
        placeholder="Descripción"
        placeholderTextColor="#aaa"
        value={description}
        onChangeText={setDescription}
        style={{
          borderWidth: 1,
          borderColor: "#444",
          marginVertical: 10,
          padding: 10,
          color: "white",
          backgroundColor: "#222",
          borderRadius: 8,
        }}
      />
      <TouchableOpacity
        onPress={() => setCompleted(!completed)}
        style={{ marginVertical: 10 }}
      >
        <Text style={{ color: "white" }}>
          Estado: {completed ? "😎 Completada" : "🤮 Pendiente"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "#007bff",
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
