import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FlatListStyles from '../../Styles/FlatListStyles';

interface Props {
  item: any;
  onPress: (item: any) => void;
}

function CollectionFigureItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      style={FlatListStyles.cardMinor}
      activeOpacity={0.8}
      onPress={() => onPress(item)}
    >
      <View style={FlatListStyles.imageContainerMinor}>
        <Image
          source={{ uri: item.image_url }}
          style={FlatListStyles.image}
          resizeMode="cover"
        />
      </View>

      <View style={FlatListStyles.infoMinor}>
        <Text style={FlatListStyles.name}>{item.name}</Text>

        {item.line_name && (
          <Text style={FlatListStyles.line}>{item.line_name}</Text>
        )}

        {item.brand_name && (
          <Text style={FlatListStyles.line}>{item.brand_name}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default memo(CollectionFigureItem);
