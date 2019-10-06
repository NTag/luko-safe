import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Title from '../components/Title';
import Colors from '../constants/Colors';
import moment from 'moment';
import ImageBlock from '../components/ImageBlock';

const infoStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  text: {
    fontFamily: 'Avenir',
    color: Colors.dark,
    fontSize: 16,
    fontWeight: '500',
  },
  label: {
    color: Colors.label,
  },
});

const InfoRow = ({ label, value } : { label: string, value?: string }) => {
  return (
    <View style={infoStyle.container}>
      <Text style={[infoStyle.text, infoStyle.label]}>{label}</Text>
      {value ? (<Text style={infoStyle.text}>{value}</Text>) : null}
    </View>
  );
};

const infosStyle = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  containerWithBorder: {
    borderBottomColor: Colors.light,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: 'Avenir',
    color: Colors.dark,
    fontWeight: '500',
    fontSize: 20,
  },
});

const InfosBlock = ({ title, borderBottom = true, children }) => {
  return (
    <View style={[infosStyle.container, borderBottom && infosStyle.containerWithBorder]}>
      <Text style={infosStyle.title}>{title}</Text>
      {children}
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Avenir',
    color: Colors.dark,
  },
  image: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  infos: {
    padding: 20,
  },
  category: {
    fontFamily: 'Avenir',
    color: 'rgba(2, 2, 2, 0.5)',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  documents: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  document: {
    marginTop: 20,
    marginRight: 20,
  },
});

const ItemScreen = ({ navigation }) => {
  const item = navigation.getParam('item');

  const purchaseDate = moment(item.purchaseDate).format('DD/MM/YYYY');
  const endWarrantyDate = moment(item.endWarrantyDate).format('DD/MM/YYYY');

  return (
    <ScrollView bounces={false}>
      <Image source={{ uri: 'data:image/jpeg;base64,' + item.image }} style={styles.image} />
      <View style={styles.closeButton}>
        <Button icon="close-circle" onPress={() => navigation.goBack()} size={28} color="dark" style={{ opacity: 0.2 }} />
      </View>
      <View style={styles.infos}>
        <Text style={styles.category}>{item.category.label}</Text>
        <Title size="h1">{item.name}</Title>
        <InfosBlock title="Information">
          <InfoRow label="Category" value={item.category.label} />
          <InfoRow label="Purchase date" value={purchaseDate} />
          <InfoRow label="End of warranty" value={endWarrantyDate} />
          {item.description ? (
            <>
              <InfoRow label="Description" />
              <Text style={styles.text}>{item.description}</Text>
            </>
          ) : null}
        </InfosBlock>
        <InfosBlock title="Price">
          <InfoRow label="Estimation" value={`${Math.round(item.estimatedValue[0])} € — ${Math.round(item.estimatedValue[1])} €`} />
          <InfoRow label="Purchase price" value={`${item.purchaseValue} €`} />
        </InfosBlock>
        <InfosBlock title="Documents" borderBottom={false}>
          <View style={styles.documents}>
            <ImageBlock uri={'data:image/jpeg;base64,' + item.receipt} style={styles.document} />
            {item.photos.map((photo, i) => (
              <ImageBlock key={i} uri={'data:image/jpeg;base64,' + photo} style={styles.document} />
            ))}
          </View>
        </InfosBlock>
      </View>
    </ScrollView>
  );
};

ItemScreen.navigationOptions = {
  header: null,
};

export default ItemScreen;
