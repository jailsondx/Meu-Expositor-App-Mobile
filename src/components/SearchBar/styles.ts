import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flexDirection: 'column',
    marginTop: 16,
    marginBottom: 16,
    gap: 8,
  },

  containerInput: {
    flexDirection: 'row',
    gap: 8,
  },

  text: {
    color: 'whitesmoke',
  },

  input: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  button: {
    backgroundColor: '#2E86DE',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
