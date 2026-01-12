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
    backgroundColor: '#262d47',
    color: '#222',
    borderRadius: 100,
    padding: 10,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E8EBF0',
  },

  /* ===== FAB ===== */

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0040AA',
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
    backgroundColor: '#2B2B2B',
    borderRadius: 16,
    padding: 20,
    borderColor: '#0040AA',
    borderWidth: 2
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 12,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#E8EBF0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#11151C',
    marginBottom: 16,
  },

  cancel: {
    marginTop: 12,
    textAlign: 'center',
    color: '#9CA3AF',
  },






  viewFlatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

   flatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },

  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,           // Metade da largura/altura
    overflow: 'hidden',         // ← Essencial! Corta a imagem nos cantos
    backgroundColor: '#E5E5E5',
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

  viewDeleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  deleteButton: {
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },



iconGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  borderRadius: 16,
  marginVertical: 16,
  backgroundColor: '#20263bff'
},

iconOption: {
  margin: 8,
  padding: 6,
  borderRadius: 8,
},

iconDisabled: {
  opacity: 0.3, // 🔥 aqui acontece a "desativação"
},

iconImage: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
},


});
