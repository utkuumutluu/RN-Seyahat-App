import { View, TextInput, Pressable, Text } from 'react-native';

type Props = {
  sehirAdi: string;
  setSehirAdi: (value: string) => void;

  ulke: string;
  setUlke: (value: string) => void;

  gorselUrl: string;
  setGorselUrl: (value: string) => void;

  arama: string;
  setArama: (value: string) => void;

  onEkle: () => void;
};

export default function SehirForm({
  sehirAdi,
  setSehirAdi,
  ulke,
  setUlke,
  gorselUrl,
  setGorselUrl,
  arama,
  setArama,
  onEkle,
}: Props) {
  return (
    <View className="mb-5">
      <TextInput
        placeholder="Şehir Adı"
        value={sehirAdi}
        onChangeText={setSehirAdi}
        className="mb-3 rounded-xl border border-gray-300 bg-white p-3"
      />

      <TextInput
        placeholder="Ülke"
        value={ulke}
        onChangeText={setUlke}
        className="mb-3 rounded-xl border border-gray-300 bg-white p-3"
      />

      <TextInput
        placeholder="Görsel URL"
        value={gorselUrl}
        onChangeText={setGorselUrl}
        className="mb-3 rounded-xl border border-gray-300 bg-white p-3"
      />

      <TextInput
        placeholder="Şehir Ara"
        value={arama}
        onChangeText={setArama}
        className="mb-3 rounded-xl border border-gray-300 bg-white p-3"
      />

      <Pressable
        onPress={onEkle}
        className="items-center rounded-xl bg-blue-500 py-3 active:bg-blue-700">
        <Text className="text-base font-bold text-white">+ Ekle</Text>
      </Pressable>
    </View>
  );
}
