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

  flatList: {
    width: '100%',
  },
  
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
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
    height: 120,
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
    padding: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  line: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },

  brand: {
    fontSize: 13,
    color: '#888',
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
  height: '70%',
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
