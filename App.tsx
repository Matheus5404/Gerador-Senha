import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

const MIN_LENGTH = 4;
const MAX_LENGTH = 32;

export default function App() {
  const [length, setLength] = useState('12');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = useMemo(() => {
    if (!password) {
      return {
        label: 'Nenhuma',
        color: '#484F58',
        percentage: 0,
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      return {
        label: 'Fraca',
        color: '#F85149',
        percentage: 33,
      };
    }

    if (score <= 4) {
      return {
        label: 'Média',
        color: '#D29922',
        percentage: 66,
      };
    }

    return {
      label: 'Forte',
      color: '#3FB950',
      percentage: 100,
    };
  }, [password]);

  function generatePassword() {
    const parsedLength = Number.parseInt(length, 10);

    if (
      Number.isNaN(parsedLength) ||
      parsedLength < MIN_LENGTH ||
      parsedLength > MAX_LENGTH
    ) {
      Alert.alert(
        'Tamanho inválido',
        `Digite um tamanho entre ${MIN_LENGTH} e ${MAX_LENGTH} caracteres.`,
      );
      return;
    }

    let newPassword = '';

    for (let i = 0; i < parsedLength; i++) {
      const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
      newPassword += CHARACTERS[randomIndex];
    }

    setPassword(newPassword);
    setShowPassword(false);
  }

  function clearPassword() {
    setPassword('');
  }

  function handleLengthChange(value: string) {
    // Permite somente números.
    const onlyNumbers = value.replace(/[^0-9]/g, '');
    setLength(onlyNumbers);
  }

  const displayedPassword = showPassword
    ? password
    : '•'.repeat(password.length);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>DevBadge</Text>
          <Text style={styles.subtitle}>Gerador de Senhas</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Tamanho da senha</Text>

          <TextInput
            value={length}
            onChangeText={handleLengthChange}
            keyboardType="number-pad"
            maxLength={2}
            placeholder="Ex.: 12"
            placeholderTextColor="#8B949E"
            style={styles.input}
          />

          <Text style={styles.helperText}>
            Escolha entre {MIN_LENGTH} e {MAX_LENGTH} caracteres.
          </Text>

          <Text style={styles.label}>Senha gerada</Text>

          <View style={styles.passwordContainer}>
            <Text
              selectable={true}
              style={[
                styles.passwordText,
                !password && styles.passwordPlaceholder,
              ]}
              numberOfLines={2}
            >
              {password ? displayedPassword : 'Sua senha aparecerá aqui'}
            </Text>

            {password ? (
              <Pressable
                onPress={() => setShowPassword((current) => !current)}
                style={({ pressed }) => [
                  styles.visibilityButton,
                  pressed && styles.visibilityButtonPressed,
                ]}
              >
                <Text style={styles.visibilityText}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </Text>
              </Pressable>
            ) : null}
          </View>

          {password ? (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthHeader}>
                <Text style={styles.strengthTitle}>Força da senha</Text>

                <Text
                  style={[
                    styles.strengthLabel,
                    { color: passwordStrength.color },
                  ]}
                >
                  {passwordStrength.label}
                </Text>
              </View>

              <View style={styles.strengthBackground}>
                <View
                  style={[
                    styles.strengthProgress,
                    {
                      width: `${passwordStrength.percentage}%`,
                      backgroundColor: passwordStrength.color,
                    },
                  ]}
                />
              </View>
            </View>
          ) : null}

          <View style={styles.buttons}>
            <Pressable
              onPress={generatePassword}
              style={({ pressed }) => [
                styles.button,
                styles.generateButton,
                pressed && styles.generateButtonPressed,
              ]}
            >
              <Text style={styles.buttonText}>Gerar senha</Text>
            </Pressable>

            <Pressable
              onPress={clearPassword}
              style={({ pressed }) => [
                styles.button,
                styles.clearButton,
                pressed && styles.clearButtonPressed,
              ]}
            >
              <Text style={styles.clearButtonText}>Limpar</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.footer}>
          Gere senhas de {MIN_LENGTH} a {MAX_LENGTH} caracteres.
        </Text>

        <StatusBar style="light" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#0D1117',
    paddingHorizontal: 20,
    paddingVertical: 50,
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },

  headerTitle: {
    color: '#58A6FF',
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#8B949E',
    fontSize: 16,
    marginTop: 6,
  },

  card: {
    width: '100%',
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#30363D',
    borderRadius: 16,
    padding: 20,
  },

  label: {
    color: '#F0F6FC',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    height: 50,
    backgroundColor: '#0D1117',
    borderWidth: 1,
    borderColor: '#30363D',
    borderRadius: 10,
    color: '#F0F6FC',
    fontSize: 18,
    paddingHorizontal: 15,
    marginBottom: 6,
  },

  helperText: {
    color: '#8B949E',
    fontSize: 12,
    marginBottom: 25,
  },

  passwordContainer: {
    minHeight: 70,
    backgroundColor: '#0D1117',
    borderWidth: 1,
    borderColor: '#3FB950',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  passwordText: {
    flex: 1,
    color: '#3FB950',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  passwordPlaceholder: {
    color: '#8B949E',
    fontWeight: 'normal',
    letterSpacing: 0,
  },

  visibilityButton: {
    backgroundColor: '#21262D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },

  visibilityButtonPressed: {
    backgroundColor: '#30363D',
  },

  visibilityText: {
    color: '#58A6FF',
    fontWeight: '600',
    fontSize: 13,
  },

  strengthContainer: {
    marginBottom: 22,
  },

  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  strengthTitle: {
    color: '#8B949E',
    fontSize: 13,
  },

  strengthLabel: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  strengthBackground: {
    height: 6,
    backgroundColor: '#30363D',
    borderRadius: 10,
    overflow: 'hidden',
  },

  strengthProgress: {
    height: '100%',
    borderRadius: 10,
  },

  buttons: {
    gap: 12,
  },

  button: {
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  generateButton: {
    backgroundColor: '#238636',
  },

  generateButtonPressed: {
    backgroundColor: '#2EA043',
  },

  clearButton: {
    backgroundColor: '#21262D',
    borderWidth: 1,
    borderColor: '#30363D',
  },

  clearButtonPressed: {
    backgroundColor: '#30363D',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  clearButtonText: {
    color: '#F0F6FC',
    fontSize: 16,
    fontWeight: '600',
  },

  footer: {
    color: '#8B949E',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});
