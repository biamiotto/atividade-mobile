import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function App() {
  const [novaTarefa, setNovaTarefa] = useState("");
  const [listaTarefas, setListaTarefas] = useState([]);
  const [isDark, setIsDark] = useState(true);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === "") return;
    const tarefaObjeto = {
      id: String(Date.now()),
      texto: novaTarefa,
    };
    setListaTarefas([...listaTarefas, tarefaObjeto]);
    setNovaTarefa("");
  };

  const removerTarefa = (idParaRemover) => {
    const listaFiltrada = listaTarefas.filter((item) => item.id !== idParaRemover);
    setListaTarefas(listaFiltrada);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.titulo, { color: theme.text }]}>Minhas Tarefas</Text>
        <TouchableOpacity 
          style={[styles.botaoTema, { backgroundColor: theme.primary }]} 
          onPress={() => setIsDark(!isDark)}
        >
          <Text style={styles.textoBotaoAdicionar}>{isDark ? "☀️" : "🌙"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.primary }]}
          placeholder="O que vamos fazer hoje?"
          placeholderTextColor="#888"
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity
          style={[styles.botaoAdicionar, { backgroundColor: theme.primary }]}
          onPress={adicionarTarefa}
        >
          <Text style={styles.textoBotaoAdicionar}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listaTarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.itemLista, { backgroundColor: theme.card }]}>
            <Text style={[styles.textoItem, { color: theme.text }]}>{item.texto}</Text>
            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => removerTarefa(item.id)}
            >
              <Text style={styles.textoBotaoRemover}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.textoVazio}>
            Nenhuma tarefa por aqui. Você está livre! 🏝️
          </Text>
        )}
      />
    </View>
  );
}

const darkTheme = {
  background: "#121212",
  text: "#FFFFFF",
  card: "#1E1E1E",
  primary: "#8A2BE2",
};

const lightTheme = {
  background: "#FFFFFF",
  text: "#121212",
  card: "#F0F0F0",
  primary: "#6A0DAD",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
  },
  botaoTema: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
  },
  botaoAdicionar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  textoBotaoAdicionar: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  itemLista: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  textoItem: {
    fontSize: 16,
    flex: 1,
  },
  botaoRemover: {
    backgroundColor: "#FF3B30",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotaoRemover: {
    color: "#FFF",
    fontWeight: "bold",
  },
  textoVazio: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 50,
  },
});