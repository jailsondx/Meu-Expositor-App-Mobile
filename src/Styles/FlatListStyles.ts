import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E8EBF0',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#9CA3AF',
  },

  viewFlatList: {
    backgroundColor: 'purple',
  },

  flatList: {
    height: '80%',
    width: '100%',
  },

  cardLarge: {
    flexDirection: 'row',
    backgroundColor: '#262d47',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4, // Android
    shadowColor: '#000', // iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardMinor: {
    flexDirection: 'row',
    backgroundColor: '#262d47',
    height: 70,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4, // Android
    shadowColor: '#000', // iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  imageContainerLarge: {
    width: 90,
    height: 120,
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainerMinor: {
    width: 90,
    height: '100%',
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagePlaceholder: {
    color: '#999',
    fontSize: 12,
  },

  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },


  infoLarger: {
    flex: 1,
    padding: 12,
  },

  infoMinor: {
    flex: 1,
    padding: 3,
  },

  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E8EBF0',
  },

  line: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },

  brand: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },

  footer: {
    //marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E86DE',
  },

  year: {
    fontSize: 12,
    color: '#6B7280',
  },



  //MODAL
  modalCard: {
    width: '90%',
    height: '75%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },

  modalImage: {
    width: '100%',
    height: '40%',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    marginBottom: 12,
  },

  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  modalLine: {
    fontSize: 16,
    color: '#666',
  },

  modalBrand: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666'
  },

  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },

  modalYear: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },

  modalClose: {
    textAlign: 'center',
    marginTop: 12,
    color: '#999',
  },
});
