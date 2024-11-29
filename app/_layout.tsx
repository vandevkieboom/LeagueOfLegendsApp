import { HeaderProvider } from '@/context/HeaderContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useNavigation } from 'expo-router';
import { Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

const StacksLayout = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                headerTintColor: '#fff',
              }}
            >
              <Stack.Screen
                name="[id]"
                options={{
                  headerShown: true,
                  title: 'Champion Informations',
                  headerStyle: {
                    backgroundColor: '#000',
                  },
                  headerTitleStyle: {
                    color: '#fff',
                    fontSize: 18,
                  },
                }}
              />
            </Stack>
          </HeaderProvider>
        </SafeAreaView>
      </QueryClientProvider>
    </>
  );
};

export default StacksLayout;
