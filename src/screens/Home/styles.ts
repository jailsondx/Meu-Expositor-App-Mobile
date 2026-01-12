import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: '30%',
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderRadius: 30,
    padding: 20,
    borderColor: '#ffc300',
    borderRightWidth: 5,
    borderBottomWidth: 5
  },

  headerUser: {
    flexDirection: 'column',

  },

  msg: {
    fontSize: 14,
    color: '#333',
  },

  userName: {
    fontWeight: 'bold',
    fontSize: 44,
    color: '#333',
    marginTop: -10
  },

  buttons: {
    marginTop: 40
  }
});
