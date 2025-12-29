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
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
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

});
