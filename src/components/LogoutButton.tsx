import React from 'react';
import { Alert, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { deleteToken } from '../utils/handlingDataLogin'; // Pastikan jalur ini sesuai dengan struktur proyek Anda
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const LogoutButton: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const handleLogout = async () => {
    // Tampilkan konfirmasi sebelum logout
    Alert.alert(
      "Konfirmasi",
      "Apakah Anda yakin ingin logout?",
      [
        {
          text: "Batal",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            await deleteToken(); // Menghapus token
            onLogout(); // Memanggil fungsi onLogout untuk melakukan navigasi atau aksi lain setelah logout
          }
        }
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <SimpleLineIcons name="logout" size={24} color="white" />
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E04F4F', // Warna latar belakang merah
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
    
    
  },
  buttonText: {
    color: 'white', // Warna teks putih
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutButton;
