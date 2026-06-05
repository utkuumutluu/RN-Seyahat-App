import { View, Text, FlatList, Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { useMemo, useState } from 'react';

import Header from '@/components/Header';
import SehirForm from '@/components/SehirForm';
import SehirCard from '@/components/SehirCard';
import BosListe from '@/components/BosListe';

import { sehirler as baslangicSehirleri } from '@/data/sehirler';

export default function SeyahatScreen() {
  const [sehirler, setSehirler] = useState(baslangicSehirleri);

  const [sehirAdi, setSehirAdi] = useState('');

  const [ulke, setUlke] = useState('');

  const [gorselUrl, setGorselUrl] = useState('');

  const [arama, setArama] = useState('');

  const ekle = () => {
    if (!sehirAdi || !ulke || !gorselUrl) return;

    const yeniSehir = {
      id: Date.now().toString(),
      sehirAdi,
      ulke,
      gorselUrl,
      ziyaretEdildi: false,
    };

    setSehirler([...sehirler, yeniSehir]);

    setSehirAdi('');
    setUlke('');
    setGorselUrl('');
  };

  const ziyaretToggle = (id: string) => {
    const guncel = sehirler.map((s) =>
      s.id === id
        ? {
            ...s,
            ziyaretEdildi: !s.ziyaretEdildi,
          }
        : s
    );

    guncel.sort((a, b) => Number(a.ziyaretEdildi) - Number(b.ziyaretEdildi));

    setSehirler(guncel);
  };

  const sil = (id: string) => {
    Alert.alert('Sil', 'Bu şehri silmek istiyor musun?', [
      {
        text: 'İptal',
        style: 'cancel',
      },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: () => {
          setSehirler(sehirler.filter((s) => s.id !== id));
        },
      },
    ]);
  };

  const filtreliSehirler = useMemo(() => {
    return sehirler.filter((s) => s.sehirAdi.toLowerCase().includes(arama.toLowerCase()));
  }, [arama, sehirler]);

  const ziyaretEdilenSayisi = sehirler.filter((s) => s.ziyaretEdildi).length;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-gray-100">
      <View className="flex-1 p-4 pt-14">
        <Header />

        <SehirForm
          sehirAdi={sehirAdi}
          setSehirAdi={setSehirAdi}
          ulke={ulke}
          setUlke={setUlke}
          gorselUrl={gorselUrl}
          setGorselUrl={setGorselUrl}
          arama={arama}
          setArama={setArama}
          onEkle={ekle}
        />

        <FlatList
          data={filtreliSehirler}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<BosListe />}
          ListHeaderComponent={
            <Text className="mb-3 text-base font-semibold text-gray-700">
              {ziyaretEdilenSayisi}/{sehirler.length} şehir ziyaret edildi
            </Text>
          }
          renderItem={({ item }) => (
            <SehirCard
              sehir={item}
              onZiyaretToggle={() => ziyaretToggle(item.id)}
              onSil={() => sil(item.id)}
            />
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
