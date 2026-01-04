import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#C4C4C4',
  },

  buttons: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatList: {
    width: '100%',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 70,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4, // Android
    shadowColor: '#000', // iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  imageContainer: {
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


  info: {
    flex: 1,
    padding: 5,
  },

  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },

  line: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },

  brand: {
    fontSize: 13,
    color: '#555',
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
    color: '#999',
  },



  //MODAL
  modalCard: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
  },

  modalDados: {
    height: '90%',
  },

  modalImage: {
    width: '100%',
    height: '60%',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    marginBottom: 12,
  },

  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalInfor: {
    fontSize: 16,
    color: '#666',
  },

  modalYear: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    marginBottom: 16,
  },

  modalClose: {
    textAlign: 'center',
    marginTop: 12,
    color: '#999',
  },

});
