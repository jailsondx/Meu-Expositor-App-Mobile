import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#E8EBF0',
    height: '30%',
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderRadius: 30,
    padding: 20,
  },

  headerUser: {
    flexDirection: 'column',

  },

  msg: {
    fontSize: 14,
    color: '#E8EBF0',
  },

  userName: {
    fontWeight: 'bold',
    fontSize: 44,
    color: '#E8EBF0',
    marginTop: -10
  },

menuContainer: {
  position: 'relative',
},

menu: {
  position: 'absolute',
  justifyContent: 'center',
  top: 30,
  right: 20,
  width: 80,
  height: 40,
  backgroundColor: '#003566',
  borderRadius: 6,
  paddingVertical: 8,
  paddingHorizontal: 12,
  elevation: 5, // Android
  shadowColor: '#000', // iOS
  shadowOpacity: 0.2,
  shadowRadius: 4,
},

menuItem: {
  fontSize: 14,
  color: '#E8EBF0',
  textAlign: 'center',
},

});
