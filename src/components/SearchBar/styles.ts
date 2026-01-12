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

  input: {
    flex: 1,
    backgroundColor: '#E8EBF0',
    color: '#11151C',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#0040AA',
  },

  viewSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


  select: {
    color: '#E8EBF0',
    backgroundColor: '#262d47',
    width: '45%',
    borderRadius: 160
  },

  button: {
    backgroundColor: '#0040AA',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },

  buttonText: {
    color: '#E8EBF0',
    fontWeight: 'bold',
  },
});
