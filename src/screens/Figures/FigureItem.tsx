import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import FlatListStyles from '../../Styles/FlatListStyles';

interface Props {
  item: any;
  onPress: (item: any) => void;
}

function FigureItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      style={FlatListStyles.cardLarge}
      activeOpacity={0.8}
      onPress={() => onPress(item)}
    >
      <View style={FlatListStyles.imageContainerLarge}>
        <Image
          source={{ uri: item.image_url }}
          style={FlatListStyles.image}
          resizeMode="cover"
        />
      </View>

      <View style={FlatListStyles.infoLarger}>
        <Text style={FlatListStyles.name}>{item.name}</Text>
        <Text style={FlatListStyles.line}>{item.line_name}</Text>
        <Text style={FlatListStyles.brand}>{item.brand_name}</Text>

        <View style={FlatListStyles.footer}>
          <Text style={FlatListStyles.year}>{item.release_year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(FigureItem);
