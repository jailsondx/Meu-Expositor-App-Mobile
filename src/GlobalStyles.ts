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
    padding: 24,
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
});
