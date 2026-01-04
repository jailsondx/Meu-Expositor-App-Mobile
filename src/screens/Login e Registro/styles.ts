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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  formInputs: {
    alignItems: 'center',
    width: '100%',
    gap: 16
  },

  input: {
    height: 40,
    width: '80%',
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: 40,
  }
});
