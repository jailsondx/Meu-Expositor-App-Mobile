import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    justifyContent: 'space-between',
    padding: 24,
  },

  formHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  form: {
    justifyContent: 'center',
    height: '100%'
  },

  formInputs: {
    gap: 16
  },

  input: {
    height: 40,
    borderColor: 'gray',
    color: 'whitesmoke',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  inputLabel: {
    color: 'whitesmoke'
  },


  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#C4C4C4',
  },

  buttons: {
    marginTop: 40
  }
});
