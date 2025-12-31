/*
    Color Pallet: https://coolors.co/palette/000814-001d3d-003566-ffc300-ffd60a
    Golden Twilight
    ~Ink Black #000814
      Alternative MatteBlack: #01161e
    ~Prussian Blue #001d3d
    ~Oxford Navy #003566
    ~School Bus Yellow #ffc300
    ~Gold #ffd60a

    Background: #000814
 */

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01161e',
    color: 'whitesmoke',
    justifyContent: 'space-between',
    paddingTop: 24,   // Padding no topo
    paddingLeft: 5,  // Padding à esquerda
    paddingRight: 5,  // Padding à esquerda
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,  // Padding à esquerda
    paddingRight: 10,  // Padding à esquerda
    borderBottomWidth: 1,        // Define a largura da borda inferior
    borderBottomColor: '#555', // Define a cor da borda inferior
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
    marginBottom: 40,
  },

  buttonPrimary: {
    backgroundColor: '#003566',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },

  buttonRemove: {
    backgroundColor: '#c0392b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },

  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#003566',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonSecondaryText: {
    color: '#C4C4C4',
    fontSize: 16,
    fontWeight: 'bold',
  },



  //MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCardAuto: {
    width: '80%',
    height: 'auto',
    backgroundColor: '#001d3d',
    borderRadius: 16,
  },


  modalCloseButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 10, // garante que fique por cima
  },

  modalCloseButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 22,
  },

  cardModalTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#003566',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,        // Define a largura da borda inferior
    borderBottomColor: '#ffc300', // Define a cor da borda inferior
  },

  modalTitle: {
    fontSize: 16,
    color: 'whitesmoke',
    fontWeight: 'bold',
  },

  modalContent: {
    padding: 16
  },

});
