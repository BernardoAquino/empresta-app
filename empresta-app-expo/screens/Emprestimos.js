/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  Avatar,
  Button,
  Divider,
  Headline,
  List,
  Paragraph,
  Text,
} from 'react-native-paper'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import Colors from '../Colors'
import Header from '../components/Header'
import React from 'react'

const Emprestimos = (props) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header onPress={() => props.navigation.openDrawer()} label='Empréstimos' />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={{ backgroundColor: Colors.gray, paddingVertical: 30, paddingHorizontal: 20, width: '100%', alignItems: 'center' }}>
          <Headline style={{ color: Colors.dark, fontWeight: '700', paddingBottom: 10, fontSize: 16 }}>{props.usuario.Nome}</Headline>
          <Headline style={{ color: Colors.blue, fontWeight: '700', paddingBottom: 10 }}>Empréstimo</Headline>
          <Divider style={{ height: 1, width: '60%' }} />
          <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
            <Text style={{ fontSize: 20 }}>Valor liberado</Text>
            <Text style={{ fontSize: 36, marginVertical: 10 }}>R$ 6.139,28</Text>
          </View>
        </View>
        <View style={{ backgroundColor: Colors.white, width: '100%', paddingVertical: 20, alignItems: 'center' }}>
          <Button
            mode='contained'
            labelStyle={{ color: Colors.white }}
            style={{ padding: 10, width: '80%' }}
            onPress={props.notificar}>REQUISITAR CRÉDITO</Button>
        </View>
        <View style={{ backgroundColor: Colors.gray, paddingTop: 30, width: '100%', alignItems: 'center' }}>
          <Headline style={{ color: Colors.blue, fontWeight: '700', paddingBottom: 10 }}>Últimas propostas</Headline>
          <Divider style={{ height: 1, width: '60%', marginBottom: 10 }} />
          <View style={{ width: '100%', alignItems: 'center' }}>
            <List.AccordionGroup>
              <View style={{ width: '100%' }}>
                {props.propostas.length === 0 && <Headline style={{ textAlign: 'center', paddingVertical: 30, color: Colors.dark }}>Não há nenhuma proposta para ser mostrada</Headline>}
                {props.propostas.map((v, k) => <AccordionItem item={v} id={k + 1} key={k + 1} />)}
              </View>
            </List.AccordionGroup>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

const AccordionItem = ({ item, id }) => {
  let {
    DataVenda: data,
    ValorLiberado: valor,
    FaseProposta: fase_proposta,
    Convenio: convenio,
    ValorParcela: parcela,
    ProtoculoBanco: protocolo,
    QuantidadeParcela: quantidade,
    Instituicao: instituicao,
    IdProposta: identificacao,
    ResponsavelCancelamento: responsavel,
    DataCancelamento: dataCancelamento,
    MotivoCancelamento: motivo,
  } = item
  const currencyFormat = num => 'R$ ' + num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  const formataData = d => `${d}`.replace(/(\d{4})-(\d{2})-(\d{2})(.*)/, '$3/$2/$1')
  const fase = f => {
    switch (f) {
      case 'Proposta Aprovada':
        return <Paragraph style={{ fontWeight: '700', color: 'green', fontSize: 26, paddingVertical: 10 }}>Proposta Aprovada</Paragraph>
      case 'Proposta em processamento':
        return <Paragraph style={{ fontWeight: '700', color: 'orange', fontSize: 26, paddingVertical: 10 }}>Proposta em processamento</Paragraph>
      case 'Proposta Cancelada':
        return <Paragraph style={{ fontWeight: '700', color: 'red', fontSize: 26, paddingVertical: 10 }}>Proposta Cancelada</Paragraph>
      default:
        return <Paragraph style={{ fontWeight: '700', color: 'black', fontSize: 26, paddingVertical: 10 }}>?</Paragraph>
    }
  }
  const icone = f => {
    switch (f) {
      case 'Proposta Aprovada':
        return <Avatar.Icon icon='check' style={{ backgroundColor: Colors.transparent, borderWidth: 2, borderColor: 'green' }} color='green' size={40} />
      case 'Proposta em processamento':
        return <Avatar.Icon icon='clock' style={{ backgroundColor: Colors.transparent, borderWidth: 2, borderColor: 'orange' }} color='orange' size={40} />
      case 'Proposta Cancelada':
        return <Avatar.Icon icon='close' style={{ backgroundColor: Colors.transparent, borderWidth: 2, borderColor: 'red' }} color='red' size={40} />
      default:
        return <Avatar.Icon style={{ backgroundColor: 'white' }} size={30} />
    }
  }

  valor = currencyFormat(valor ?? 0)
  parcela = currencyFormat(parcela ?? 0)

  return (
    <List.Accordion
      id={id}
      style={{ borderColor: Colors.white, borderTopWidth: 3, paddingVertical: 20 }}
      left={() =>
        <View style={{ paddingLeft: 15, flexDirection: 'row', justifyContent: 'space-between', flexGrow: 8 }}>
          <View>
            <Headline style={{ color: Colors.blue, fontWeight: '700', fontSize: 20 }}>{formataData(data)} - {identificacao}</Headline>
            <Headline style={{ color: Colors.dark, fontWeight: '700' }}>{valor}</Headline>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {icone(fase_proposta)}
          </View>
        </View>
      }>
      <View style={{ paddingVertical: 20, paddingHorizontal: 0, marginLeft: -40, marginTop: -30 }}>
        <Text style={styles.label3}>{fase(fase_proposta)}</Text>
        {fase_proposta === 'Proposta Cancelada' &&
          <View style={{ width: '100%' }}>
            <Text style={styles.label2}>Responsável pelo cancelamento:</Text>
            <Text style={styles.label}>{responsavel}</Text>
            <Text style={styles.label2}>Data do cancelamento:</Text>
            <Text style={styles.label}>{formataData(dataCancelamento)}</Text>
            <Text style={styles.label2}>Motivo do cancelamento:</Text>
            <Text style={styles.label}>{motivo}</Text>
          </View>}
        <Text style={styles.label2}>Convênio:</Text>
        <Text style={styles.label}>{convenio}</Text>
        <Text style={styles.label2}>Instituição:</Text>
        <Text style={styles.label}>{instituicao}</Text>
        <Text style={styles.label2}>Valor da parcela:</Text>
        <Text style={styles.label}>{parcela}</Text>
        <Text style={styles.label2}>Quantidade de parcelas:</Text>
        <Text style={styles.label}>{quantidade}</Text>
        <Text style={styles.label2}>Protocolo:</Text>
        <Text style={styles.label}>{protocolo}</Text>
        <Text style={styles.label2}>Identificação:</Text>
        <Text style={styles.label}>{identificacao}</Text>
      </View>
    </List.Accordion>
  )
}

export default Emprestimos

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.gray,
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 22,
    paddingTop: 6,
    paddingBottom: 14,
  },
  label2: {
    fontSize: 16,
    paddingVertical: 0,
    fontWeight: '700',
  },
  label3: {
    fontSize: 16,
    paddingVertical: 24,
    fontWeight: '700',
  },
})