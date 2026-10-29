import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Linking } from 'react-native';
import { Button, Callout, Card, Field, Screen } from '../components/ui';
import { colors, spacing } from '../lib/theme';
import { useApp } from '../lib/store';

export default function AluguelComunidade() {
  const { anuncios, usuario, cadastrarAnuncio } = useApp();
  const [item, setItem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [precoLabel, setPrecoLabel] = useState('');
  const [contato, setContato] = useState(usuario.telefone);

  function handleCadastrar() {
    if (!item.trim() || !precoLabel.trim() || !contato.trim()) {
      Alert.alert('Preencha o equipamento, o preço e um contato antes de cadastrar.');
      return;
    }
    cadastrarAnuncio({ item, descricao, precoLabel, contato });
    setItem('');
    setDescricao('');
    setPrecoLabel('');
    Alert.alert('Equipamento cadastrado', 'Agora outros jogadores e organizadores podem ver seu anúncio.');
  }

  function handleContato(anuncianteContato: string) {
    const telefone = anuncianteContato.replace(/\D/g, '');
    Linking.openURL(`https://wa.me/55${telefone}?text=Oi! Vi seu anúncio de equipamento no Arena Airsoft.`);
  }

  return (
    <Screen>
      <Text style={styles.subtitle}>
        Jogadores e organizadores podem cadastrar equipamento próprio aqui pra outras pessoas
        alugarem — fora do equipamento oferecido por um organizador numa partida específica.
      </Text>

      <Callout>
        <Text style={styles.calloutText}>
          O app só aproxima quem tem equipamento de quem precisa. O pagamento é combinado
          diretamente entre o locador (quem está alugando o equipamento) e o locatário (quem está
          pegando o equipamento alugado).
        </Text>
      </Callout>

      <View style={{ gap: spacing.sm }}>
        <Text style={styles.sectionLabel}>Equipamentos disponíveis</Text>
        {anuncios.length === 0 && (
          <Text style={styles.emptyText}>Nenhum equipamento cadastrado ainda.</Text>
        )}
        {anuncios.map((anuncio) => (
          <Card key={anuncio.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm }}>
              <Text style={styles.itemNome}>{anuncio.item}</Text>
              <Text style={styles.itemPreco}>{anuncio.precoLabel}</Text>
            </View>
            {!!anuncio.descricao && <Text style={styles.itemDescricao}>{anuncio.descricao}</Text>}
            <Text style={styles.anunciante}>
              Anunciado por {anuncio.anuncianteNome} ·{' '}
              {anuncio.anuncianteTipo === 'organizador' ? 'Organizador' : 'Jogador'}
            </Text>
            <Button title="Entrar em contato" variant="outline" onPress={() => handleContato(anuncio.contato)} />
          </Card>
        ))}
      </View>

      <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
        <Text style={styles.sectionLabel}>Cadastrar meu equipamento</Text>
        <Field label="Equipamento" placeholder="Ex.: Réplica AEG, colete, óculos..." value={item} onChangeText={setItem} />
        <Field label="Descrição (opcional)" placeholder="Estado, acessórios, retirada..." value={descricao} onChangeText={setDescricao} />
        <Field label="Preço sugerido" placeholder="Ex.: R$ 40/dia" value={precoLabel} onChangeText={setPrecoLabel} />
        <Field label="Contato (WhatsApp)" value={contato} onChangeText={setContato} keyboardType="phone-pad" />
        <Button title="Cadastrar equipamento" onPress={handleCadastrar} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subtitle: { fontSize: 14, color: colors.textMuted },
  calloutText: { fontSize: 13, color: colors.label, lineHeight: 18 },
  sectionLabel: { fontSize: 18, fontWeight: '500', color: colors.text },
  emptyText: { fontSize: 13, color: colors.textFaint },
  itemNome: { fontSize: 15, fontWeight: '500', color: colors.text, flex: 1 },
  itemPreco: { fontSize: 14, color: colors.textMuted },
  itemDescricao: { fontSize: 13, color: colors.textMuted },
  anunciante: { fontSize: 12, color: colors.textFaint },
});
