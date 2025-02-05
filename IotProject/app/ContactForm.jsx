import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, TextInput } from 'react-native';
import { ButtonUI } from "@/components/ui/Buttons";

export function ContactForm() {
  // Get screen dimensions
  const windowWidth = Dimensions.get('window').width;
  const isDesktop = windowWidth > 768;

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    message: ''
  });

  const handleSubmit = () => {   
    // Handle form sthis is a const function runs the code inside in javascript
    console.log(formData);
  };

  return (
    <ScrollView contentContainerStyle={[
      styles.container,
      !isDesktop && styles.mobileContainer
    ]}>
      <Text style={[styles.sectionTitle, styles.pageTitle]}>Contact Us</Text>

      <View style={[styles.contentContainer, isDesktop && styles.desktopContent]}>
        <ButtonUI
          text="Frequently Asked Questions"
          type='alternate'
          extrastyles={styles.faqButton}
          onPress={() => {}}
        />

        <View style={styles.fieldsWrapper}>
          <View style={styles.fieldContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.SubText}>Name</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
              placeholder="Enter your name"
            />
          </View>
          
          <View style={styles.fieldContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.SubText}>Company Name</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.companyName}
              onChangeText={(text) => setFormData({...formData, companyName: text})}
              placeholder="Enter your company name"
            />
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.SubText}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.SubText}>Message</Text>
            </View>
            <TextInput
              style={[styles.input, styles.messageInput]}
              value={formData.message}
              onChangeText={(text) => setFormData({...formData, message: text})}
              placeholder="Enter your message"
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>

        <ButtonUI 
          text="Submit" 
          type=''
          extrastyles={styles.submitButton}
          onPress={handleSubmit} //on press is a function that runs the code inside in javascript
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    minHeight: '100%'
  },

  mobileContainer: {
    paddingTop: 30,
  },

  contentContainer: {
    width: '100%',
    maxWidth: 600,
    flex: 1,
  },

  desktopContent: {
    maxWidth: 800,
    paddingHorizontal: 40,
  },

  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    marginBottom: 20,
    fontFamily: "'Inter', sans-serif",
    color: '#000000',
  },

  pageTitle: {
    textAlign: 'center',
    width: '100%',
    marginBottom: 40,
  },

  fieldsWrapper: {
    width: '100%',
    gap: 24,
  },

  fieldContainer: {
    width: '100%',
  },

  labelContainer: {
    marginBottom: 8,
  },

  SubText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666666',
  },

  input: {
    borderRadius: 8,
    borderColor: "#CCCCCC",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
    fontSize: 16,
  },

  messageInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },

  faqButton: {
    marginBottom: 30,
    width: '100%',
  },

  submitButton: {
    marginTop: 40,
    marginBottom: 20,
    width: '100%',
  }
});