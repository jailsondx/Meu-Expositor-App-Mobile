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



    grokAi
      Fundo principal (background escuro): #0F1217 ou #11151C
      Fundo de cartões/elevação média: #1A1F27
      Fundo de cartões mais claros/ativo: #232A34
      Azul principal (botões, destaques, acentos): #0066FF
      Azul mais claro (hover/ativo): #1A80FF
      Azul escuro (detalhes secundários): #0040AA
      Texto principal (branco): #F8F9FA ou #E8EBF0
      Texto secundário/cinza claro: #9CA3AF
      Texto terciário/cinza mais escuro: #6B7280
      Detalhes roxos/azulados sutis (alguns ícones): #7C3AED ou #6366F1



      NOVO
      Fundo principal: #11151C
      Fundo Secundario (Modal): #20263bff
      Cor dos itens da Flat Lista: #262d47
      Texto principal (branco): #E8EBF0
      Texto secundário/cinza claro: #9CA3AF
      Texto terciário/cinza mais escuro: #6B7280
      Azul escuro (detalhes e icones): #003566
 */

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11151C',
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
    justifyContent: 'space-between',
  },

  buttonPrimary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003566',
    color: 'whitesmoke',
    height: 50,
    fontSize: 26,
    borderRadius: 6,
    marginBottom: 16,
    elevation: 4, // Android
    shadowColor: '#000', // iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  modalButtonPrimary: {
    width: '40%',
    backgroundColor: '#003566',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },

  buttonRemove: {
    width: '100%',
    backgroundColor: '#c0392b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },

  modalButtonRemove: {
    width: '40%',
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

  buttonTextSmall: {
    color: '#FFFFFF',
    fontSize: 12,
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

  modalCardMinor: {
    width: '80%',
    height: 'auto',
    backgroundColor: '#262d47',
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
    justifyContent: 'space-between',
    padding: 16,
  },

  modalButtons: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
