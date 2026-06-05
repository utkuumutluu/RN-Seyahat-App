import { View, Text, Image, Pressable } from 'react-native';

type Props = {
  sehir: {
    id: string;
    sehirAdi: string;
    ulke: string;
    gorselUrl: string;
    ziyaretEdildi: boolean;
  };

  onZiyaretToggle: () => void;
  onSil: () => void;
};

export default function SehirCard({ sehir, onZiyaretToggle, onSil }: Props) {
  return (
    <Pressable
      onPress={onZiyaretToggle}
      onLongPress={onSil}
      className="mb-3 flex-row items-center rounded-2xl border border-gray-200 bg-white p-3">
      <Image source={{ uri: sehir.gorselUrl }} className="mr-4 h-20 w-20 rounded-xl" />

      <View className="flex-1">
        <Text
          className={`text-lg font-bold ${
            sehir.ziyaretEdildi ? 'text-gray-400 line-through' : 'text-gray-900'
          }`}>
          {sehir.sehirAdi}
        </Text>

        <Text className="mb-2 text-gray-500">{sehir.ulke}</Text>

        <View
          className={`self-start rounded-full px-3 py-1 ${
            sehir.ziyaretEdildi ? 'bg-green-100' : 'bg-orange-100'
          }`}>
          <Text
            className={`font-semibold ${
              sehir.ziyaretEdildi ? 'text-green-700' : 'text-orange-700'
            }`}>
            {sehir.ziyaretEdildi ? 'Ziyaret Edildi' : 'Ziyaret Edilmedi'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
