import { ReactNode } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import styles from './styles';

type FigureModalProps = {
  visible: boolean;
  figure: any | null;
  onClose: () => void;
  children?: ReactNode;
};

export function FigureModal({
  visible,
  figure,
  onClose,
  children,
}: FigureModalProps) {
  if (!figure) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={GlobalStyles.modalOverlay}>
        <View style={styles.modalCard}>

          <TouchableOpacity
            style={GlobalStyles.modalCloseButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={GlobalStyles.modalCloseButtonText}>×</Text>
          </TouchableOpacity>

          <View style={GlobalStyles.modalContent}>
            <View style={styles.modalDados}>
              <Image
                source={{ uri: figure.image_url }}
                style={styles.modalImage}
              />

              <Text style={styles.modalName}>{figure.name}</Text>
              {figure.line_name && (
                <Text style={styles.modalInfor}>{figure.line_name}</Text>
              )}
              <Text style={styles.modalInfor}>{figure.brand_name}</Text>
              <Text style={styles.modalInfor}>
                {(figure.price / 1000).toFixed(3)} {figure.coin}
              </Text>

              <Text style={styles.modalYear}>
                Lançamento: {figure.release_year}
              </Text>
            </View>

            <View style={styles.buttons}>
              {children}
            </View>

          </View>
        </View>
      </View>
    </Modal>
  );
}
