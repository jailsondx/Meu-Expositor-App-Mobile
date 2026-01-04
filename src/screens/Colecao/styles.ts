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
    marginTop: 40
  },


  /* ===== LISTA ===== */

  card: {
    backgroundColor: '#FFFFFF',
    color: '#222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  /* ===== FAB ===== */

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6, // Android shadow
  },

  fabText: {
    fontSize: 32,
    color: '#FFF',
    lineHeight: 36,
  },

  /* ===== MODAL ===== */

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContent: {
    width: '85%',
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 12,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFF',
    marginBottom: 16,
  },

  cancel: {
    marginTop: 12,
    textAlign: 'center',
    color: '#9CA3AF',
  },








  flatList: {
    width: '100%',
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

  deleteButton: {
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginBottom: 12,
    borderRadius: 10,
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },



});
